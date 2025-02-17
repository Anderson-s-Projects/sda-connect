import { Plus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
interface CreatePostButtonProps {
  isSabbathMode: boolean;
}
export const CreatePostButton = ({
  isSabbathMode
}: CreatePostButtonProps) => {
  return <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          
        </TooltipTrigger>
        <TooltipContent>
          <p>Create New Post</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>;
};