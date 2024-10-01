import React from 'react';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/favicon.ico" alt="Voicenotes" className="w-8 h-8 mr-2" />
          <h1 className="text-xl font-bold">Voicenotes</h1>
        </div>
        <div className="relative flex-grow max-w-md mx-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
          Upgrade
        </button>
      </div>
    </header>
  );
};

export default Header;