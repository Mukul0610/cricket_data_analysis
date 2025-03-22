import React from 'react';
import { Ticket as Cricket } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-3">
          
            <Cricket size={32} className="text-white" />
            <div>
              <h1 className="text-xl font-bold">Cricbrains</h1>
              <p className="text-xs text-blue-200">Advanced Match Statistics</p>
            </div>
          </div>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-200 transition-colors">Home</Link>
            <Link href="/" className="hover:text-blue-200 transition-colors">Blogs</Link>
            {/* <Link href="/" className="hover:text-blue-200 transition-colors">Ground</Link> */}
            {/* <a href="#" className="hover:text-blue-200 transition-colors">Bowlers</a>
            <a href="#analysis" className="hover:text-blue-200 transition-colors">Match Analysis</a> */}
          </div>
        </div>
      </div>
    </nav>
  );
}