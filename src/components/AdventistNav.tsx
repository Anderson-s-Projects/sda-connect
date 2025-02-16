
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home, Compass, Users, Calendar, Heart,
  Bell, User, Sun, Moon, Menu, X, Plus
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  primary: boolean;
  to: string;
  description: string;
}

const navItems: NavItemProps[] = [
  { 
    icon: Home, 
    label: 'Home', 
    to: '/', 
    primary: true,
    description: 'Your main feed with latest posts, updates, and personalized content from your community'
  },
  { 
    icon: Compass, 
    label: 'Explore', 
    to: '/main', 
    primary: true,
    description: 'Discover new content, trending topics, and spiritual resources'
  },
  { 
    icon: Users, 
    label: 'Groups', 
    to: '/groups', 
    primary: true,
    description: 'Join interest-based congregations, local church groups, and study forums'
  },
  { 
    icon: Calendar, 
    label: 'Events', 
    to: '/events', 
    primary: true,
    description: 'Access your calendar for church services, gatherings, and spiritual events'
  },
  { 
    icon: Heart, 
    label: 'Prayer', 
    to: '/prayer', 
    primary: true,
    description: 'Share prayer requests, receive spiritual support, and connect with prayer partners'
  },
  { 
    icon: Bell, 
    label: 'Notifications', 
    to: '/notifications', 
    primary: false,
    description: 'Stay updated on messages, events, and community activities'
  },
  { 
    icon: User, 
    label: 'Profile', 
    to: '/profile', 
    primary: false,
    description: 'Manage your account, privacy settings, and spiritual journey'
  },
];

const NavItem = ({ icon: Icon, label, primary, to, description }: NavItemProps) => {
  const isMobile = useIsMobile();
  const [isSabbathMode] = useState(false); // This should be moved to a context if needed across components

  const content = (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
        ${isSabbathMode ? 'hover:bg-slate-200' : 'hover:bg-blue-50'}
        ${isMobile ? 'text-base w-full' : 'text-sm'}
      `}
    >
      <Icon className={`h-5 w-5 ${isSabbathMode ? 'text-slate-700' : 'text-blue-600'}`} />
      <span className={isSabbathMode ? 'text-slate-700' : 'text-blue-600'}>{label}</span>
    </Link>
  );

  return isMobile ? (
    content
  ) : (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4">
          <p className="text-sm">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
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

            {/* Sabbath Mode Toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setSabbathMode(!isSabbathMode)}
                    className={`hidden md:block p-2 rounded-lg transition-all duration-300
                      ${isSabbathMode ? 'bg-slate-200 text-slate-700' : 'bg-blue-50 text-blue-600'}
                    `}
                  >
                    {isSabbathMode ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle Sabbath Mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Mobile Menu */}
          {isMobile && isMobileMenuOpen && (
            <div className="fixed inset-0 top-14 bg-white z-50 pt-4">
              <div className="flex flex-col space-y-2 p-4">
                {navItems.map((item, index) => (
                  <NavItem key={index} {...item} />
                ))}
                <button
                  onClick={() => setSabbathMode(!isSabbathMode)}
                  className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-all duration-300
                    ${isSabbathMode ? 'bg-slate-200 text-slate-700' : 'bg-blue-50 text-blue-600'}
                  `}
                >
                  {isSabbathMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  <span>Toggle Sabbath Mode</span>
                </button>
              </div>
            </div>
          )}

          {/* Create Post FAB */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={`fixed bottom-20 right-6 md:bottom-6 p-4 rounded-full shadow-lg transition-all duration-300
                    ${isSabbathMode ? 'bg-slate-700 text-white' : 'bg-blue-600 text-white'}
                    hover:shadow-xl hover:scale-105
                  `}
                >
                  <Plus className="h-6 w-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create New Post</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </div>
    </div>
  );
};

export default AdventistNav;
