import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Favorites from './pages/Favorites';
import Inbox from './pages/Inbox';
import OrderLists from './pages/OrderLists';
import ProductStock from './pages/ProductStock';
// import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/product-stock" element={<ProductStock />} />
            <Route path="/order-lists" element={<OrderLists />} />
            
            {/* <Route path="/settings" element={<Settings />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;