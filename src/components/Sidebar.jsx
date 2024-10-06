import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Heart, Inbox, ListOrdered, Box, Settings, LogOut, Menu, X } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Package, label: 'Products', path: '/products' },
  { icon: Heart, label: 'Favorites', path: '/favorites' },
  { icon: Inbox, label: 'Inbox', path: '/inbox' },
  { icon: ListOrdered, label: 'Order Lists', path: '/order-lists' },
  { icon: Box, label: 'Product Stock', path: '/product-stock' },
];

const bottomNavItems = [
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: LogOut, label: 'Logout', path: '/logout' },
];

function NavItem({ icon: Icon, label, path, onClick }) {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
          isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </NavLink>
  );
}

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-white"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-30
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
        w-64 bg-white border-r border-gray-200 flex flex-col
      `}>
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">3legant.</h1>
        </div>
        
        <nav className="flex-1 px-2 py-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.path} {...item} onClick={closeSidebar} />
            ))}
          </div>
        </nav>
        
        <div className="border-t border-gray-200 px-2 py-4">
          {bottomNavItems.map((item) => (
            <NavItem key={item.path} {...item} onClick={closeSidebar} />
          ))}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;