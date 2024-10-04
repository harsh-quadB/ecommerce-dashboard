import React, { useState } from 'react';

const EditProductModal = ({ product, onSave, onCancel }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    // Implement image upload logic here
  };

  const removeImage = (index) => {
    // Implement image removal logic here
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 max-h-90vh overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {editedProduct.images && editedProduct.images.map((img, index) => (
                <div key={index} className="relative">
                  <img src={img} alt={`Product ${index + 1}`} className="w-full h-32 object-cover rounded" />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    ×
                  </button>
                </div>
              ))}
              <div className="border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </label>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                className="w-full border rounded-md px-3 py-2"
                value={editedProduct.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                className="w-full border rounded-md px-3 py-2"
                value={editedProduct.description}
                onChange={handleInputChange}
                rows="3"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                name="price"
                className="w-full border rounded-md px-3 py-2"
                value={editedProduct.price}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Measurements</label>
              <input
                type="text"
                name="measurements"
                className="w-full border rounded-md px-3 py-2"
                value={editedProduct.measurements}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Choose Color</label>
              <select
                name="color"
                className="w-full border rounded-md px-3 py-2"
                value={editedProduct.color}
                onChange={handleInputChange}
              >
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Red">Red</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">SKU</label>
              <input
                type="text"
                name="sku"
                className="w-full border rounded-md px-3 py-2"
                value={editedProduct.sku}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                className="w-full border rounded-md px-3 py-2"
                value={editedProduct.category}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={() => {/* Implement remove product logic */}}
          >
            Remove this product
          </button>
          <div>
            <button
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 mr-2"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              onClick={() => onSave(editedProduct)}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;