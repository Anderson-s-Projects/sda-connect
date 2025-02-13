
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Book } from "lucide-react";

interface NewsPost {
  id: string;
  title: string;
  content: string;
  author: string;
}

interface CommunityNewsSectionProps {
  communityNews: NewsPost[];
}

export const CommunityNewsSection = ({ communityNews }: CommunityNewsSectionProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Community News</h2>
        <Button 
          variant="outline" 
          onClick={() => navigate("/news")}
          className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {communityNews.map((post) => (
          <Card 
            key={post.id}
            className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => navigate(`/news/${post.id}`)}
          >
            <div className="space-y-3">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Book className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">
                By {post.author} • {post.content.substring(0, 100)}...
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};
