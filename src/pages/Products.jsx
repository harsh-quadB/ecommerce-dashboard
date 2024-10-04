import React, { useState, useEffect } from 'react';
import { ArrowBigLeft, ArrowBigRight, Plus } from 'lucide-react';
import EditProductModal from '../components/EditProductModal';
import AddProductModal from '../components/AddProductModal';

const Products = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentEditProduct, setCurrentEditProduct] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

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

  const [productItems, setProductItems] = useState([
    {
      id: 1,
      imageUrl: "/path/to/table-image.jpg",
      title: "Table",
      price: 120.00,
      rating: 4,
      reviews: 131
    },
    {
      id: 2,
      imageUrl: "/path/to/table-image.jpg",
      title: "Table",
      price: 120.00,
      rating: 4,
      reviews: 131
    },
    {
      id: 3,
      imageUrl: "/path/to/table-image.jpg",
      title: "Table",
      price: 120.00,
      rating: 4,
      reviews: 131
    }
  ]);

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

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

  const handleToggleFavorite = (product) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === product.id);
      if (isAlreadyFavorite) {
        return prev.filter(fav => fav.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleSaveEdit = (editedProduct) => {
    setProductItems(prev => 
      prev.map(item => 
        item.id === editedProduct.id ? editedProduct : item
      )
    );
    setShowEditModal(false);
  };

  const handleAddProduct = (newProduct) => {
    setProductItems(prev => [...prev, { ...newProduct, id: prev.length + 1 }]);
    setShowAddModal(false);
  };

  const ProductCard = ({ product }) => {
    const isFavorite = favorites.some(fav => fav.id === product.id);

    return (
      <div className="bg-white rounded-lg overflow-hidden shadow">
        <div className="relative">
          <img src={product.imageUrl} alt={product.title} className="w-full h-64 object-cover" />
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
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-xl font-bold mt-1">${product.price.toFixed(2)}</p>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-gray-600">({product.reviews})</span>
          </div>
          <button 
            onClick={() => handleEditProduct(product)}
            className="mt-4 px-4 py-2 bg-gray-100 text-gray-800 text-sm rounded-md hover:bg-gray-200 transition duration-300 flex items-center justify-center"
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
          <button 
            onClick={() => setShowFavorites(true)}
            className={`px-4 py-2 rounded-md ${showFavorites ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Favorites
          </button>
        </div>
      </div>
      
      {/* Slider - only show on All Products */}
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {showFavorites
          ? favorites.map(product => <ProductCard key={product.id} product={product} />)
          : productItems.map(product => <ProductCard key={product.id} product={product} />)
        }
      </div>

      {/* Add New Product Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 bg-white text-gray-800 font-semibold py-3 px-6 border border-gray-400 rounded-full shadow-lg flex items-center hover:bg-gray-100 transition-colors duration-300"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add New Product
      </button>

      {/* Edit Modal */}
      {showEditModal && (
        <EditProductModal
          product={currentEditProduct}
          onSave={handleSaveEdit}
          onCancel={() => setShowEditModal(false)}
        />
      )}

      {/* Add Modal */}
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