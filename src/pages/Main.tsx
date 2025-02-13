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

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [featuredContent, setFeaturedContent] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const initialize = async () => {
      try {
        await checkUser();
        await loadProfile();
        await loadFeaturedContent();
        await loadRecentActivities();
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  const loadFeaturedContent = async () => {
    try {
      const { data, error } = await supabase
        .from("featured_content")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setFeaturedContent(data);
    } catch (err) {
      toast({
        title: "Error loading featured content",
        description: err instanceof Error ? err.message : "Failed to load content",
        variant: "destructive",
      });
    }
  };

  const loadRecentActivities = async () => {
    try {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      setRecentActivities(data);
    } catch (err) {
      toast({
        title: "Error loading activities",
        description: err instanceof Error ? err.message : "Failed to load activities",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <Card className="p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-5">
                <div className="h-14 w-14 rounded-full bg-primary/10 animate-pulse">
                  <User className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-primary">Loading...</h1>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <Card className="p-6 shadow-lg">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-destructive mb-2">
                An error occurred
              </h2>
              <p className="text-muted-foreground">{error}</p>
              <Button 
                onClick={() => window.location.reload()}
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <Card className="p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                <User className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">
                  Welcome, {profile?.username || "Friend"}
                </h1>
                <p className="text-muted-foreground">
                  {profile?.church_affiliation || "Your Church"}
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate("/profile")}
              className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              <Settings className="h-4 w-4 mr-2 text-primary" />
              Profile Settings
            </Button>
          </div>
        </Card>

        {/* Featured Content */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Featured Content</h2>
            <Button 
              variant="outline" 
              onClick={() => navigate("/content")}
              className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredContent.map((item) => (
              <Card 
                key={item.id}
                className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/content/${item.id}`)}
              >
                <div className="space-y-3">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description.substring(0, 100)}...
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Card 
            className="p-6 group hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/bible-study")}
          >
            <div className="space-y-5">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Bible className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-primary">
                Bible Study
              </h2>
              <p className="text-muted-foreground group-hover:text-primary transition-colors">
                Access daily devotionals and study materials
              </p>
            </div>
          </Card>

          <Card 
            className="p-6 group hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/community")}
          >
            <div className="space-y-5">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-primary">
                Community
              </h2>
              <p className="text-muted-foreground group-hover:text-primary transition-colors">
                Connect with fellow believers
              </p>
            </div>
          </Card>

          <Card 
            className="p-6 group hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/events")}
          >
            <div className="space-y-5">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-primary">
                Events
              </h2>
              <p className="text-muted-foreground group-hover:text-primary transition-colors">
                View upcoming church events
              </p>
            </div>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Activities</h2>
            <Button 
              variant="outline" 
              onClick={() => navigate("/activities")}
              className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div 
                key={activity.id}
                className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                onClick={() => navigate(`/activities/${activity.id}`)}
              >
                <div className="flex items-start space-x-4">
                  <Prayer className="h-6 w-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-semibold">{activity.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {activity.description.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Ministry Interests */}
        {profile?.ministry_interests && profile.ministry_interests.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Ministry Interests</h2>
            <div className="flex flex-wrap gap-2">
              {profile.ministry_interests.map((ministry) => (
                <div
                  key={ministry}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {ministry}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Main;
