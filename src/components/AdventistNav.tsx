
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home, Compass, Users, Calendar, Heart,
  Bell, User, Sun, Moon, Menu, X, Plus
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  primary: boolean;
  to: string;
}

const navItems: NavItemProps[] = [
  { icon: Home, label: 'Home', to: '/', primary: true },
  { icon: Compass, label: 'Explore', to: '/main', primary: true },
  { icon: Users, label: 'Groups', to: '/groups', primary: true },
  { icon: Calendar, label: 'Events', to: '/events', primary: true },
  { icon: Heart, label: 'Prayer', to: '/prayer', primary: true },
  { icon: Bell, label: 'Notifications', to: '/notifications', primary: false },
  { icon: User, label: 'Profile', to: '/profile', primary: false },
];

const NavItem = ({ icon: Icon, label, primary, to }: NavItemProps) => {
  const isMobile = useIsMobile();
  const [isSabbathMode] = useState(false); // This should be moved to a context if needed across components

  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-all duration-300
        ${isSabbathMode ? 'hover:bg-slate-200' : 'hover:bg-blue-50'}
        ${isMobile ? 'text-xs' : 'text-sm'}
        ${primary || !isMobile ? '' : 'hidden md:flex'}
      `}
    >
      <Icon className={`h-6 w-6 mb-1 ${isSabbathMode ? 'text-slate-700' : 'text-blue-600'}`} />
      <span className={isSabbathMode ? 'text-slate-700' : 'text-blue-600'}>{label}</span>
    </Link>
  );
};

const AdventistNav = () => {
  const [isSabbathMode, setSabbathMode] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className={`w-full fixed top-0 z-50 ${isSabbathMode ? 'bg-slate-50' : 'bg-white'} shadow-md transition-colors duration-300`}>
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto">
        <nav className="relative px-4 py-2">
          {/* Main Navigation Container */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className={`text-xl font-bold ${isSabbathMode ? 'text-slate-700' : 'text-blue-600'}`}>
                SDA Connect
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <NavItem key={index} {...item} />
              ))}
            </div>

            {/* Sabbath Mode Toggle */}
            <button
              onClick={() => setSabbathMode(!isSabbathMode)}
              className={`p-2 rounded-lg transition-all duration-300
                ${isSabbathMode ? 'bg-slate-200 text-slate-700' : 'bg-blue-50 text-blue-600'}
              `}
            >
              {isSabbathMode ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={isSabbathMode ? 'text-slate-700' : 'text-blue-600'} />
              ) : (
                <Menu className={isSabbathMode ? 'text-slate-700' : 'text-blue-600'} />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobile && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center p-2">
              {navItems.filter(item => item.primary).map((item, index) => (
                <NavItem key={index} {...item} />
              ))}
            </div>
          )}

          {/* Create Post FAB */}
          <button
            className={`fixed bottom-20 right-6 md:bottom-6 p-4 rounded-full shadow-lg transition-all duration-300
              ${isSabbathMode ? 'bg-slate-700 text-white' : 'bg-blue-600 text-white'}
              hover:shadow-xl hover:scale-105
            `}
          >
            <Plus className="h-6 w-6" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AdventistNav;
