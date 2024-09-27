import React from 'react';
import { Search, Menu } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="p-2 text-gray-900 mr-4">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">Voice Notes App</h1>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search notes..."
              className="bg-gray-100 text-gray-800 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;