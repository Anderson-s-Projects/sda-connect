
import { Plus } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CreatePostButtonProps {
  isSabbathMode: boolean;
}

export const CreatePostButton = ({ isSabbathMode }: CreatePostButtonProps) => {
  return (
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
  );
};
