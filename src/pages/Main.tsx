
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Book, Users, Calendar, Settings } from "lucide-react";

interface UserProfile {
  username: string;
  church_affiliation: string;
  ministry_interests: string[];
}

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    loadProfile();
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
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfile(data as UserProfile);
      }
    } catch (error: any) {
      toast({
        title: "Error loading profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
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

    {/* Quick Actions */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <Card 
        className="p-6 group hover:shadow-xl transition-all duration-300 cursor-pointer"
        onClick={() => navigate("/bible-study")}
      >
        <div className="space-y-5">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Book className="h-6 w-6 text-blue-600" />
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
  </div>
</div>

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
