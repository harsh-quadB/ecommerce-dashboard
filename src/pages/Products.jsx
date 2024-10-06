import React, { useState, useEffect } from 'react';
import { ArrowBigLeft, ArrowBigRight, Plus } from 'lucide-react';
import EditProductModal from '../components/EditProductModal';
import AddProductModal from '../components/AddProductModal';
import axios from 'axios';

const Products = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentEditProduct, setCurrentEditProduct] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [productItems, setProductItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const slides = [
    {
      id: 1,
      title: "Enjoy free home delivery in this summer",
      description: "Designer Dresses - Pick from trendy Designer Dress.",
      date: "September 12-22",
      buttonText: "Get Started"
    },
    {
      id: 2,
      title: "Special Autumn Collection",
      description: "Exclusive designs for the season",
      date: "October 1-15",
      buttonText: "Shop Now"
    }
  ];

  useEffect(() => {
    fetchProducts();
    fetchFavorites();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://ecommerce-website22.onrender.com/product/get');
      if (response.data.success && Array.isArray(response.data.products)) {
        // Ensure all products have required properties
        const sanitizedProducts = response.data.products.map(product => ({
          ...product,
          images: Array.isArray(product.images) ? product.images : [],
          reviews: Array.isArray(product.reviews) ? product.reviews : [],
          discountedPrice: product.discountedPrice || 0,
          originalPrice: product.originalPrice || 0,
          rating: product.rating || 0,
          name: product.name || 'Unnamed Product',
          category: product.category || 'Uncategorized'
        }));
        setProductItems(sanitizedProducts);
      } else {
        throw new Error('Unexpected API response format');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };


  const fetchFavorites = async () => {
    try {
      const response = await axios.get('https://ecommerce-website22.onrender.com/product/getWishlist');
      let favoritesData = [];
      if (Array.isArray(response.data)) {
        favoritesData = response.data;
      } else if (typeof response.data === 'object' && Array.isArray(response.data.wishlist)) {
        favoritesData = response.data.wishlist;
      }
      // Sanitize favorites data
      const sanitizedFavorites = favoritesData.map(product => ({
        ...product,
        images: Array.isArray(product.images) ? product.images : [],
        reviews: Array.isArray(product.reviews) ? product.reviews : [],
        discountedPrice: product.discountedPrice || 0,
        originalPrice: product.originalPrice || 0,
        rating: product.rating || 0,
        name: product.name || 'Unnamed Product',
        category: product.category || 'Uncategorized'
      }));
      setFavorites(sanitizedFavorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const handleToggleFavorite = async (product) => {
    try {
      const response = await axios.post('https://ecommerce-website22.onrender.com/product/addToWishlist', {
        productId: product._id
      });
      
      if (response.data.success) {
        setFavorites(prev => {
          const isAlreadyFavorite = prev.some(fav => fav._id === product._id);
          if (isAlreadyFavorite) {
            return prev.filter(fav => fav._id !== product._id);
          } else {
            return [...prev, product];
          }
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleSaveEdit = async (editedProduct) => {
    try {
      const response = await axios.put(`https://ecommerce-website22.onrender.com/product/update/${editedProduct._id}`, editedProduct);
      if (response.data.success) {
        setProductItems(prev => prev.map(item => item._id === editedProduct._id ? editedProduct : item));
        setShowEditModal(false);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axios.post('https://ecommerce-website22.onrender.com/product/create', newProduct);
      if (response.data.success) {
        setProductItems(prev => [...prev, response.data.product]);
        setShowAddModal(false);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      const response = await axios.delete(`https://ecommerce-website22.onrender.com/product/delete/${productId}`);
      if (response.data.success) {
        setProductItems(prev => prev.filter(item => item._id !== productId));
        setFavorites(prev => prev.filter(item => item._id !== productId));
        setShowEditModal(false);
      }
    } catch (error) {
      console.error('Error removing product:', error);
      // You might want to show an error message to the user here
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleEditProduct = (product) => {
    setCurrentEditProduct(product);
    setShowEditModal(true);
  };

  const ProductCard = ({ product }) => {
    if (!product) return null;

    const isFavorite = favorites.some(fav => fav._id === product._id);
    const reviews = product.reviews || [];
    const images = product.images || [];
    const discountedPrice = product.discountedPrice || 0;
    const originalPrice = product.originalPrice;
    const rating = product.rating || 0;

    return (
      <div className="bg-white rounded-lg overflow-hidden shadow">
        <div className="relative">
          <img 
            src={images[0] || "/api/placeholder/400/320"} 
            alt={product.name || 'Product Image'} 
            className="w-full h-64 object-cover" 
          />
          <button
            onClick={() => handleToggleFavorite(product)}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow"
          >
            <svg className={`w-6 h-6 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name || 'Unnamed Product'}</h3>
          <div className="flex items-center mt-1">
            <p className="text-xl font-bold">${discountedPrice.toFixed(2)}</p>
            {originalPrice > 0 && (
              <p className="ml-2 text-gray-500 line-through">${originalPrice.toFixed(2)}</p>
            )}
          </div>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-gray-600">({reviews.length})</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">{product.category || 'Uncategorized'}</p>
          <button 
            onClick={() => handleEditProduct(product)}
            className="mt-4 px-4 py-2 bg-gray-100 text-gray-800 text-sm rounded-md hover:bg-gray-200 transition duration-300 flex items-center justify-center w-full"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Product
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <div className="p-8">Loading products...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-8 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => setShowFavorites(false)}
            className={`px-4 py-2 rounded-md ${!showFavorites ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            All Products
          </button>
          {/* <button 
            onClick={() => setShowFavorites(true)}
            className={`px-4 py-2 rounded-md ${showFavorites ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Favorites
          </button> */}
        </div>
      </div>
      
      {!showFavorites && (
        <div className="relative w-full mb-12 bg-[#15171A] rounded-lg overflow-hidden">
          <div className="flex transition-transform duration-500" 
               style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide) => (
              <div key={slide.id} className="min-w-full flex-shrink-0 p-8 text-white">
                <div className="flex flex-col h-64">
                  <p className="text-sm mb-2">{slide.date}</p>
                  <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                  <p className="mb-6">{slide.description}</p>
                  <button className="px-6 py-2 bg-orange-500 rounded-md w-fit">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700/50 p-2 rounded-full">
            <ArrowBigLeft className="text-white" />
          </button>
          <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700/50 p-2 rounded-full">
            <ArrowBigRight className="text-white" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {showFavorites
          ? favorites.map(product => <ProductCard key={product._id} product={product} />)
          : productItems.map(product => <ProductCard key={product._id} product={product} />)
        }
      </div>

      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 bg-white text-gray-800 font-semibold py-3 px-6 border border-gray-400 rounded-full shadow-lg flex items-center hover:bg-gray-100 transition-colors duration-300"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add New Product
      </button>

      {showEditModal && (
        <EditProductModal
          product={currentEditProduct}
          onSave={handleSaveEdit}
          onCancel={() => setShowEditModal(false)}
          onRemoveProduct={handleRemoveProduct}
        />
      )}

      {showAddModal && (
        <AddProductModal
          onSave={handleAddProduct}
          onCancel={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

export default Products;