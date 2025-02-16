
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavItem } from './navigation/NavItem';
import { MobileMenu } from './navigation/MobileMenu';
import { CreatePostButton } from './navigation/CreatePostButton';
import { navItems } from '@/constants/navigationItems';

const AdventistNav = () => {
  const [isSabbathMode, setSabbathMode] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className={`w-full fixed top-0 z-50 ${isSabbathMode ? 'bg-slate-50' : 'bg-white'} shadow-md transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <nav className="relative px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className={`text-xl font-bold ${isSabbathMode ? 'text-slate-700' : 'text-blue-600'}`}>
                SDA Connect
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <NavItem key={index} {...item} isSabbathMode={isSabbathMode} />
              ))}
            </div>

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

          <MobileMenu 
            isOpen={isMobile && isMobileMenuOpen}
            isSabbathMode={isSabbathMode}
            navItems={navItems}
            onToggleSabbathMode={() => setSabbathMode(!isSabbathMode)}
          />

          <CreatePostButton isSabbathMode={isSabbathMode} />
        </nav>
      </div>
    </div>
  );
};

export default AdventistNav;
