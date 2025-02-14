import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Book, Users, Calendar, Plus } from "lucide-react";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { PrayerRequestsSection } from "@/components/dashboard/PrayerRequestsSection";
import { CommunityNewsSection } from "@/components/dashboard/CommunityNewsSection";
import { ResourceLibrarySection } from "@/components/dashboard/ResourceLibrarySection";

interface UserProfile {
  username: string;
  church_affiliation: string;
  ministry_interests: string[];
}

interface PrayerRequest {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

interface NewsPost {
  id: string;
  title: string;
  content: string;
  author: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
}

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [featuredContent, setFeaturedContent] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
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
        await loadPrayerRequests();
        await loadCommunityNews();
        await loadResources();
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const loadProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("username, church_affiliation, ministry_interests")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;
      setProfile(data || null);
    } catch (err) {
      toast({
        title: "Error loading profile",
        description: err instanceof Error ? err.message : "Failed to load profile",
        variant: "destructive",
      });
    }
  };

  const loadFeaturedContent = async () => {
    try {
      // Placeholder for fetching featured content
      setFeaturedContent([
        { id: 1, title: "Sermon of the Week", type: "video" },
        { id: 2, title: "New Book Release", type: "book" },
      ]);
    } catch (err) {
      toast({
        title: "Error loading featured content",
        description: err instanceof Error ? err.message : "Failed to load featured content",
        variant: "destructive",
      });
    }
  };

  const loadRecentActivities = async () => {
    try {
      // Placeholder for fetching recent activities
      setRecentActivities([
        { id: 1, title: "John Doe joined the prayer group" },
        { id: 2, title: "New event: Community Outreach" },
      ]);
    } catch (err) {
      toast({
        title: "Error loading recent activities",
        description: err instanceof Error ? err.message : "Failed to load recent activities",
        variant: "destructive",
      });
    }
  };

  const loadPrayerRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("prayer_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      setPrayerRequests(data || []);
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
      setCommunityNews(data || []);
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
      setResources(data || []);
    } catch (err) {
      toast({
        title: "Error loading resources",
        description: err instanceof Error ? err.message : "Failed to load resources",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <>
      {/* Fixed Navigation Bar */}
      <nav className="bg-white shadow py-4 fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a href="/" className="text-2xl font-bold text-primary">Adventist Connect</a>
            <a href="/feed" className="hover:text-primary">Feed</a>
            <a href="/explore" className="hover:text-primary">Explore</a>
            <a href="/groups" className="hover:text-primary">Groups</a>
            <a href="/events" className="hover:text-primary">Events</a>
            <a href="/prayer" className="hover:text-primary">Prayer</a>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
              onClick={() => navigate("/create")}
            >
              Post
            </button>
            {/* Additional quick action buttons could be added here (e.g., Sabbath mode toggle, profile) */}
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-gray-100 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <WelcomeSection profile={profile} />

          {/* Featured Content Section */}
          {featuredContent.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4">Featured Content</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredContent.map((content) => (
                  <Card key={content.id} className="p-4 hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold">{content.title}</h3>
                    <p className="text-sm text-muted-foreground">{content.type}</p>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Recent Activities Section */}
          {recentActivities.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
              <ul>
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="py-2 border-b">{activity.title}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Quick Links / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card 
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate("/groups")}
            >
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold">Community Groups</h2>
                <p className="text-muted-foreground">Connect with fellow believers in groups</p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Book className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold">Bible Study</h2>
                <p className="text-muted-foreground">Access daily devotionals and study materials</p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold">Events</h2>
                <p className="text-muted-foreground">View upcoming church events</p>
              </div>
            </Card>
          </div>

          {/* Ministry Interests (if available) */}
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

          {/* Additional Sections */}
          <PrayerRequestsSection prayerRequests={prayerRequests} />
          <CommunityNewsSection communityNews={communityNews} />
          <ResourceLibrarySection resources={resources} />
        </div>
      </div>

      {/* Floating "Post" Button */}
      <div className="fixed bottom-6 right-6">
        <button 
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition"
          onClick={() => navigate("/create")}
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </>
  );
};

export default Main;
