import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    // Get favorites from localStorage
    const loadFavorites = () => {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavoriteProducts(parsedFavorites);
      }
    };

    loadFavorites();

    // Add event listener for storage changes
    window.addEventListener('storage', loadFavorites);

    return () => {
      window.removeEventListener('storage', loadFavorites);
    };
  }, []);

  if (favoriteProducts.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-6">Favorites</h1>
        <div className="text-center py-8 text-gray-500">
          No favorite products yet. Add some products to your favorites!
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteProducts.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow">
            <img src={product.imageUrl} alt={product.title} className="w-full h-64 object-cover mb-4" />
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
                <p className="text-lg font-bold mb-2">${product.price.toFixed(2)}</p>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-${i < product.rating ? 'yellow' : 'gray'}-400`}>★</span>
                  ))}
                  <span className="ml-2 text-gray-500">({product.reviews})</span>
                </div>
              </div>
              <button className="p-2 text-red-500">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;