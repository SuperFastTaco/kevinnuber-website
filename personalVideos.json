import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Process', path: '/process' },
    { name: 'Insights', path: '/blog' },
    { name: 'Personal', path: '/personal' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-serif text-2xl font-bold text-brand-blue tracking-tight">Kevin Nuber</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'border-brand-accent text-brand-blue'
                    : 'border-transparent text-gray-500 hover:text-brand-blue hover:border-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://calendly.com/kevin-nuber"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-8 inline-flex items-center justify-center px-6 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
            >
              Book an Appointment
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-blue"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-blue-50 border-brand-accent text-brand-blue'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://calendly.com/kevin-nuber"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center mt-4 mx-3 px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-blue hover:bg-opacity-90"
            >
              Book an Appointment
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
