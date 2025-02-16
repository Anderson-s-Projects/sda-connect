
import { Moon, Sun } from 'lucide-react';
import { NavItem } from './NavItem';
import { NavItemProps } from '@/types/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  isSabbathMode: boolean;
  navItems: NavItemProps[];
  onToggleSabbathMode: () => void;
}

export const MobileMenu = ({ isOpen, isSabbathMode, navItems, onToggleSabbathMode }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-14 bg-white z-50 pt-4">
      <div className="flex flex-col space-y-2 p-4">
        {navItems.map((item, index) => (
          <NavItem key={index} {...item} isSabbathMode={isSabbathMode} />
        ))}
        <button
          onClick={onToggleSabbathMode}
          className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-all duration-300
            ${isSabbathMode ? 'bg-slate-200 text-slate-700' : 'bg-blue-50 text-blue-600'}
          `}
        >
          {isSabbathMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          <span>Toggle Sabbath Mode</span>
        </button>
      </div>
    </div>
  );
};
