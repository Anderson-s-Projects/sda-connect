
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const MINISTRY_OPTIONS = [
  "Youth Ministry",
  "Worship Team",
  "Education",
  "Community Service",
  "Prayer Ministry",
];

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [churchAffiliation, setChurchAffiliation] = useState("");
  const [ministryInterests, setMinistryInterests] = useState<string[]>([]);
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
        setUsername(data.username || "");
        setChurchAffiliation(data.church_affiliation || "");
        setMinistryInterests(data.ministry_interests || []);
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error("No user logged in");

      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          church_affiliation: churchAffiliation,
          ministry_interests: ministryInterests,
        })
        .eq("id", session.user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      navigate("/main");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const toggleMinistry = (ministry: string) => {
    setMinistryInterests((current) =>
      current.includes(ministry)
        ? current.filter((m) => m !== ministry)
        : [...current, ministry]
    );
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <Card className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="church" className="text-sm font-medium">
              Church Affiliation
            </label>
            <Input
              id="church"
              value={churchAffiliation}
              onChange={(e) => setChurchAffiliation(e.target.value)}
              placeholder="Enter your church affiliation"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Ministry Interests</label>
            <div className="flex flex-wrap gap-2">
              {MINISTRY_OPTIONS.map((ministry) => (
                <Button
                  key={ministry}
                  type="button"
                  variant={ministryInterests.includes(ministry) ? "default" : "outline"}
                  onClick={() => toggleMinistry(ministry)}
                >
                  {ministry}
                </Button>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
