
import { Card } from "@/components/ui/card";

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
  if (!communityNews.length) return null;

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Community News</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {communityNews.map((news) => (
          <Card key={news.id} className="p-4">
            <h3 className="font-semibold">{news.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {news.content}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              By {news.author}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};
