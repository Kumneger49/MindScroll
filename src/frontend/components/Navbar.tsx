import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface NavbarProps {
  title?: string;
  showUserControls?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  title = "Mindscroll", 
  showUserControls = false 
}) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    try {
      // Clear all user data
      localStorage.removeItem('user');
      localStorage.removeItem('userFoodData');
      localStorage.removeItem('userExerciseData');
      localStorage.removeItem('userLifestyleData');
      
      // Clear user state
      setUser(null);
      
      // Close mobile menu
      setMobileMenuOpen(false);
      
      // Navigate to home page
      router.push('/').then(() => {
        // Force a page reload to ensure clean state
        window.location.reload();
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: just reload the page
      window.location.href = '/';
    }
  };

  const handleProfileEdit = () => {
    setMobileMenuOpen(false);
    router.push('/profile');
  };

  const handleHomeClick = () => {
    setMobileMenuOpen(false);
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <button
              onClick={handleHomeClick}
              className="flex items-center space-x-2 sm:space-x-3 hover:scale-105 transform duration-200 transition-all"
            >
              <img 
                src="/data/Logo.jpg" 
                alt="Mindscroll Logo" 
                className="h-8 sm:h-10 w-auto"
              />
              <span className="text-lg sm:text-2xl font-bold text-gradient hover:text-blue-600 transition-colors cursor-pointer">
                {title}
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {showUserControls && user && (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{user.avatar || '💪'}</span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {user.nickname || user.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user.nickname ? user.name : 'Health Warrior'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleProfileEdit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                >
                  Logout
                </button>
              </>
            )}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">AI Active</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          {showUserControls && user && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open menu</span>
              {!mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          )}

          {/* Mobile AI Active Indicator (when no user controls) */}
          {(!showUserControls || !user) && (
            <div className="md:hidden flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-600">AI</span>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && showUserControls && user && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {/* User Info */}
            <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
              <span className="text-3xl">{user.avatar || '💪'}</span>
              <div>
                <div className="text-base font-medium text-gray-900">
                  {user.nickname || user.name}
                </div>
                <div className="text-sm text-gray-500">
                  {user.nickname ? user.name : 'Health Warrior'}
                </div>
              </div>
            </div>

            {/* AI Status */}
            <div className="flex items-center space-x-2 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">AI Active</span>
            </div>

            {/* Actions */}
            <button
              onClick={handleProfileEdit}
              className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors text-base font-medium text-center"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors text-base font-medium text-center"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
