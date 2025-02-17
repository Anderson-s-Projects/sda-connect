
import { Card } from "@/components/ui/card";
import { PostWithProfile } from "@/types/database";
import { PostAttachment } from "./PostAttachment";
import { PostActions } from "./PostActions";

interface PostCardProps {
  post: PostWithProfile;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <img
          src={post.profiles?.avatar_url || "/placeholder.svg"}
          alt={post.profiles?.username}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">
                {post.profiles?.username || "Anonymous"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          {post.title && (
            <h4 className="text-lg font-semibold mt-2">{post.title}</h4>
          )}
          
          <p className="mt-2">{post.content}</p>

          <PostAttachment post={post} />
          <PostActions />
        </div>
      </div>
    </Card>
  );
};
