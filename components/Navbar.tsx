import React from 'react';
import { Ticket as Cricket } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Cricket size={32} className="text-white" />
            <div>
              <h1 className="text-xl font-bold">CricketPro Analytics</h1>
              <p className="text-xs text-blue-200">Advanced Match Statistics</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#batsmen" className="hover:text-blue-200 transition-colors">Batsmen</a>
            <a href="#bowlers" className="hover:text-blue-200 transition-colors">Bowlers</a>
            <a href="#analysis" className="hover:text-blue-200 transition-colors">Match Analysis</a>
          </div>
        </div>
      </div>
    </nav>
  );
}