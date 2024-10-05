import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

const EditProductModal = ({ product, onSave, onCancel, onRemoveProduct }) => {
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    originalPrice: product.originalPrice,
    discountedPrice: product.discountedPrice,
    color: product.color,
    images: product.images,
    reviews: product.reviews,
    packaging: product.packaging,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      
      try {
        const response = await axios.post('https://ecommerce-website22.onrender.com/product/upload', formData);
        if (response.data.success) {
          setEditedProduct(prev => ({
            ...prev,
            images: [...prev.images, response.data.imageUrl]
          }));
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setError('Failed to upload image. Please try again.');
      }
    }
  };

  const removeImage = (index) => {
    setEditedProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleColorChange = (e) => {
    const colors = e.target.value.split(',').map(color => color.trim());
    setEditedProduct(prev => ({ ...prev, color: colors }));
  };

  const handlePackagingChange = (e) => {
    const packages = parseInt(e.target.value, 10);
    setEditedProduct(prev => ({ ...prev, packaging: { packages } }));
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(`https://ecommerce-website22.onrender.com/products/${product._id}`, editedProduct);
      if (response.data.success) {
        onSave(response.data.product);
      } else {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveProduct = async () => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      try {
        const response = await axios.delete(`https://ecommerce-website22.onrender.com/products/${product._id}`);
        if (response.data.success) {
          onRemoveProduct(product._id);
        } else {
          throw new Error('Failed to remove product');
        }
      } catch (error) {
        console.error('Error removing product:', error);
        setError('Failed to remove product. Please try again.');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-6xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              {editedProduct.images.map((img, index) => (
                <div key={index} className="relative aspect-square">
                  <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <div className="border-2 border-dashed border-gray-300 rounded-lg aspect-square flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full">
                    <span className="text-2xl">+</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                className="w-full border rounded-md px-3 py-2"
                value={editedProduct.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Original Price</label>
              <input
                type="number"
                name="originalPrice"
                className="w-full border rounded-md px-3 py-2"
                value={editedProduct.originalPrice}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Discounted Price</label>
              <input
                type="number"
                name="discountedPrice"
                className="w-full border rounded-md px-3 py-2"
                value={editedProduct.discountedPrice}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Colors (comma-separated)</label>
              <input
                type="text"
                name="color"
                className="w-full border rounded-md px-3 py-2"
                value={editedProduct.color.join(', ')}
                onChange={handleColorChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Packaging (number of packages)</label>
              <input
                type="number"
                name="packaging"
                className="w-full border rounded-md px-3 py-2"
                value={editedProduct.packaging.packages}
                onChange={handlePackagingChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Reviews</label>
              <p className="text-gray-600">{editedProduct.reviews.length} reviews</p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-between items-center">
          <button
            className="text-red-500 hover:text-red-600"
            onClick={handleRemoveProduct}
          >
            Remove this product
          </button>
          <div className="space-x-4">
            <button
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              onClick={handleSaveChanges}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;