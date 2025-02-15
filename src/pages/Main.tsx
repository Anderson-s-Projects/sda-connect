import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdventistNav from "@/components/AdventistNav";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { PrayerRequestsSection } from "@/components/dashboard/PrayerRequestsSection";
import { CommunityNewsSection } from "@/components/dashboard/CommunityNewsSection";
import { ResourceLibrarySection } from "@/components/dashboard/ResourceLibrarySection";
import { QuickLinksSection } from "@/components/dashboard/QuickLinksSection";
import { MinistryInterestsSection } from "@/components/dashboard/MinistryInterestsSection";

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
      <AdventistNav />
      <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-gray-100 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <WelcomeSection profile={profile} />

          <QuickLinksSection />

          {profile?.ministry_interests && (
            <MinistryInterestsSection interests={profile.ministry_interests} />
          )}

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
