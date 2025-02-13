import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Book, Users, Calendar, Settings, 
         Video, Music, Prayer, Bible, Share2 } from "lucide-react";

interface UserProfile {
  username: string;
  church_affiliation: string;
  ministry_interests: string[];
}

// New interfaces for additional content types
interface PrayerRequest {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

interface NewsPost {
  id: number;
  title: string;
  content: string;
  author: string;
}

interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
}

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [featuredContent, setFeaturedContent] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [communityNews, setCommunityNews] = useState<NewsPost[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const initialize = async () => {
      try {
        await checkUser();
        await loadProfile();
        await loadFeaturedContent();
        await loadRecentActivities();
        await loadPrayerRequests();     // New
        await loadCommunityNews();      // New
        await loadResources();          // New
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  // Existing load functions remain unchanged...

  // New data loading functions
  const loadPrayerRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("prayer_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      setPrayerRequests(data);
    } catch (err) {
      toast({
        title: "Error loading prayer requests",
        description: err instanceof Error ? err.message : "Failed to load prayer requests",
        variant: "destructive",
      });
    }
  };

  const loadCommunityNews = async () => {
    try {
      const { data, error } = await supabase
        .from("community_news")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setCommunityNews(data);
    } catch (err) {
      toast({
        title: "Error loading community news",
        description: err instanceof Error ? err.message : "Failed to load news",
        variant: "destructive",
      });
    }
  };

  const loadResources = async () => {
    try {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) throw error;
      setResources(data);
    } catch (err) {
      toast({
        title: "Error loading resources",
        description: err instanceof Error ? err.message : "Failed to load resources",
        variant: "destructive",
      });
    }
  };

  // Loading state remains unchanged...

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Existing sections remain unchanged... */}

        {/* Prayer Requests Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Prayer Requests</h2>
            <Button 
              variant="outline" 
              onClick={() => navigate("/prayer-requests")}
              className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {prayerRequests.map((request) => (
              <div 
                key={request.id}
                className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                onClick={() => navigate(`/prayer-requests/${request.id}`)}
              >
                <div className="flex items-start space-x-4">
                  <Prayer className="h-6 w-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold">{request.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {request.description.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Community News Section */}
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

        {/* Resource Library Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Resource Library</h2>
            <Button 
              variant="outline" 
              onClick={() => navigate("/resources")}
              className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource) => (
              <Card 
                key={resource.id}
                className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/resources/${resource.id}`)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {resource.category}
                    </span>
                  </div>
                  <h3 className="font-semibold">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {resource.description.substring(0, 100)}...
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Ministry Interests Section remains unchanged... */}
      </div>
    </div>
  );
};

export default Main;
