import React from 'react';
import { Twitter, Mail, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About CricketPro</h3>
            <p className="text-sm text-gray-400">
              Advanced cricket analytics platform providing comprehensive match statistics 
              and player performance insights for professional cricket analysis.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
            <a href="https://www.instagram.com/___manjeet1729___/" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://x.com/mukul93028" className="hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Mail size={20} />
              </a>
              <a href="https://www.linkedin.com/in/manjeetrai/" className="hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>© 2025 CricketPro Analytics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}