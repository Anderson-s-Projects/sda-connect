
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share } from "lucide-react";

export const PostActions = () => {
  return (
    <div className="flex gap-4 mt-4">
      <Button variant="ghost" size="sm" className="gap-2">
        <Heart className="h-4 w-4" />
        Like
      </Button>
      <Button variant="ghost" size="sm" className="gap-2">
        <MessageSquare className="h-4 w-4" />
        Comment
      </Button>
      <Button variant="ghost" size="sm" className="gap-2">
        <Share className="h-4 w-4" />
        Share
      </Button>
    </div>
  );
};
