import React, { useState } from 'react';
import { Plus, PencilLine, X } from 'lucide-react';
import axios from 'axios';

const AddProductModal = ({ onSave, onCancel }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    discountedPrice: '',
    originalPrice: '',
    category: '',
    stock: '',
    color: [],
    images: [], // This will store image URLs
    packaging: {
      width: '',
      height: '',
      length: '',
      weight: '',
      packages: 1,
    },
    details: '',
  });


  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const predefinedColors = [
    'Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Cyan',
    'Maroon', 'Olive', 'Navy', 'Teal', 'Orange', 'Pink'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handlePackagingChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      packaging: { ...prev.packaging, [name]: value }
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);
      
      try {
        const response = await axios.post('https://ecommerce-website22.onrender.com/product/upload', formData);
        if (response.data.success) {
          setNewProduct(prev => ({
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

  const handleColorSelect = (color) => {
    setNewProduct(prev => ({
      ...prev,
      color: prev.color.includes(color) 
        ? prev.color.filter(c => c !== color)
        : [...prev.color, color]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const productData = {
        ...newProduct,
        discountedPrice: parseFloat(newProduct.discountedPrice),
        originalPrice: parseFloat(newProduct.originalPrice),
        stock: parseInt(newProduct.stock),
        packaging: {
          ...newProduct.packaging,
          packages: parseInt(newProduct.packaging.packages),
        },
        // images are already in the correct format (array of URLs)
      };
      const response = await axios.post('https://ecommerce-website22.onrender.com/product/create', productData);
      if (response.data.success) {
        onSave(response.data.product);
      } else {
        throw new Error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      setError('Failed to create product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const removeImage = (indexToRemove) => {
    setNewProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  return (
     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-8 bg-white w-full max-w-4xl rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image upload section */}
          <div className="mb-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                multiple
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <Plus size={48} className="text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</span>
                </div>
              </label>
            </div>
            {newProduct.images.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {newProduct.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img src={img} alt={`Uploaded ${index + 1}`} className="w-24 h-24 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product name */}
          <div className="flex items-center justify-between">
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              placeholder="ADD PRODUCT NAME"
              className="text-3xl font-bold w-full focus:outline-none"
            />
            <button type="button" className="text-blue-500">
              <PencilLine size={20} />
            </button>
          </div>

          {/* Description */}
          <textarea
            placeholder="Add description"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows={3}
          />

          {/* Prices */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Plus size={20} />
                <span className="font-semibold">Add Discounted Price</span>
              </div>
              <input
                type="number"
                name="discountedPrice"
                value={newProduct.discountedPrice}
                onChange={handleChange}
                placeholder="Enter discounted price"
                className="mt-2 w-full p-2 border rounded-md"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Plus size={20} />
                <span>Add Original Price</span>
              </div>
              <input
                type="number"
                name="originalPrice"
                value={newProduct.originalPrice}
                onChange={handleChange}
                placeholder="Enter original price"
                className="mt-2 w-full p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <h3 className="font-semibold mb-2">Category</h3>
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              placeholder="Add category"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Stock */}
          <div>
            <h3 className="font-semibold mb-2">Stock</h3>
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleChange}
              placeholder="Add stock quantity"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Colors */}
          <div>
            <div 
              onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <span>Add colors</span>
              <Plus size={16} />
            </div>
            {isColorPickerOpen && (
              <div className="mt-2 flex flex-wrap gap-2">
                {predefinedColors.map(color => (
                  <div
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    className={`px-3 py-1 rounded-full cursor-pointer ${
                      newProduct.color.includes(color) ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {color}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Packaging */}
          <div>
            <h3 className="font-semibold mb-2">Packaging</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="width"
                value={newProduct.packaging.width}
                onChange={handlePackagingChange}
                placeholder="Width (e.g., 20&quot;)"
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                name="height"
                value={newProduct.packaging.height}
                onChange={handlePackagingChange}
                placeholder="Height (e.g., 1 1/2&quot;)"
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                name="length"
                value={newProduct.packaging.length}
                onChange={handlePackagingChange}
                placeholder="Length (e.g., 21 h&quot;)"
                className="p-2 border rounded-md"
              />
              <input
                type="text"
                name="weight"
                value={newProduct.packaging.weight}
                onChange={handlePackagingChange}
                placeholder="Weight (e.g., 7 lb 8 oz)"
                className="p-2 border rounded-md"
              />
              <input
                type="number"
                name="packages"
                value={newProduct.packaging.packages}
                onChange={handlePackagingChange}
                placeholder="Number of packages"
                className="p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Details */}
          <div>
            <h3 className="font-semibold mb-2">Details</h3>
            <textarea
              name="details"
              value={newProduct.details}
              onChange={handleChange}
              placeholder="Add product details"
              className="w-full p-2 border rounded-md"
              rows={3}
            />
          </div>

          {/* Submit and Cancel buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;