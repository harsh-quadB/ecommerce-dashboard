import React, { useState } from 'react';
import { Edit, Trash2, X, Menu } from 'lucide-react';

const initialProductData = [
  {
    id: 1,
    image: "/api/placeholder/80/80",
    name: "Apple Watch Series 4",
    category: "Digital Product",
    price: "690.00",
    piece: "63",
    colors: ["black", "gray", "pink"],
  },
  {
    id: 2,
    image: "/api/placeholder/80/80",
    name: "Microsoft Headsquare",
    category: "Digital Product",
    price: "190.00",
    piece: "13",
    colors: ["black", "pink", "navy", "yellow"],
  },
  {
    id: 3,
    image: "/api/placeholder/80/80",
    name: "Women's Dress",
    category: "Fashion",
    price: "640.00",
    piece: "635",
    colors: ["maroon", "gray", "navy", "black"],
  },
  {
    id: 4,
    image: "/api/placeholder/80/80",
    name: "Samsung A50",
    category: "Mobile",
    price: "400.00",
    piece: "67",
    colors: ["black", "navy", "pink"],
  },
  {
    id: 5,
    image: "/api/placeholder/80/80",
    name: "Camera",
    category: "Electronic",
    price: "420.00",
    piece: "52",
    colors: ["black", "navy", "pink"],
  },
];

const ProductStock = () => {
  const [products, setProducts] = useState(initialProductData);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleEdit = (product) => {
    setEditingProduct({ ...product });
    setIsEditModalOpen(true);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteConfirm = () => {
    setProducts(products.filter(p => p.id !== productToDelete.id));
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex items-center space-x-4">
        <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg" />
        <div className="flex-1">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.category}</p>
          <p className="text-sm font-medium">${product.price}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Piece: {product.piece}</p>
          <div className="flex space-x-1 mt-1">
            {product.colors.map((color, colorIndex) => (
              <div
                key={colorIndex}
                className={`w-4 h-4 rounded-full bg-${color === 'navy' ? 'blue-900' : color}-500`}
              ></div>
            ))}
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEdit(product)}>
            <Edit size={18} />
          </button>
          <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(product)}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex justify-between items-center w-full md:w-auto mb-4 md:mb-0">
          <h2 className="text-xl md:text-2xl font-semibold">Product Stock</h2>
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
        <div className={`relative w-full md:w-auto ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
          <input
            type="text"
            placeholder="Search product name"
            className="w-full md:w-auto pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="w-5 h-5 text-gray-500 absolute left-2 top-1/2 transform -translate-y-1/2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="pb-3">Image</th>
              <th className="pb-3">Product Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Price</th>
              <th className="pb-3">Piece</th>
              <th className="pb-3">Available Color</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-4">
                  <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg" />
                </td>
                <td className="py-4">{product.name}</td>
                <td className="py-4">{product.category}</td>
                <td className="py-4">${product.price}</td>
                <td className="py-4">{product.piece}</td>
                <td className="py-4">
                  <div className="flex space-x-1">
                    {product.colors.map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className={`w-4 h-4 rounded-full bg-${color === 'navy' ? 'blue-900' : color}-500`}
                      ></div>
                    ))}
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEdit(product)}>
                      <Edit size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(product)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <span>Showing 1-09 of 78</span>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded-md">&lt;</button>
          <button className="px-3 py-1 border rounded-md">&gt;</button>
        </div>
      </div>

      {/* Responsive Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Product</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={editingProduct?.name || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    value={editingProduct?.category || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    value={editingProduct?.price || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="piece" className="block text-sm font-medium text-gray-700">
                    Piece
                  </label>
                  <input
                    type="text"
                    id="piece"
                    value={editingProduct?.piece || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, piece: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Responsive Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete {productToDelete?.name}?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductStock;