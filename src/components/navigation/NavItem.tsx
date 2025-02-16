
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavItemProps } from '@/types/navigation';

interface NavItemComponentProps extends NavItemProps {
  isSabbathMode: boolean;
}

export const NavItem = ({ icon: Icon, label, to, description, isSabbathMode }: NavItemComponentProps) => {
  const isMobile = useIsMobile();

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
