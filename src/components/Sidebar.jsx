import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Heart, Inbox, ListOrdered, Box, Settings, LogOut } from 'lucide-react';

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

function NavItem({ icon: Icon, label, path }) {
  return (
    <NavLink
      to={path}
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
  return (
    <aside className="w-64 border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold">3legant.</h1>
      </div>
      
      <nav className="flex-1 px-2 py-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </div>
      </nav>
      
      <div className="border-t border-gray-200 px-2 py-4">
        {bottomNavItems.map((item) => (
          <NavItem key={item.path} {...item} />
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;