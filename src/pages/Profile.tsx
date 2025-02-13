import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Users, Share2, Prayer, Book, Music, Video, Upload } from "lucide-react";

interface ProfileData {
  username: string;
  church_affiliation: string;
  ministry_interests: string[];
  bio: string;
  prayer_requests: string[];
  community_involvement: string[];
  shared_resources: {
    title: string;
    description: string;
    category: string;
  }[];
  social_connections: string[];
  profile_image: string | null;
}

const MINISTRY_OPTIONS = [
  "Youth Ministry",
  "Worship Team",
  "Education",
  "Community Service",
  "Prayer Ministry",
];

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData>({
    username: "",
    church_affiliation: "",
    ministry_interests: [],
    bio: "",
    prayer_requests: [],
    community_involvement: [],
    shared_resources: [],
    social_connections: [],
    profile_image: null
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
        setProfileData({
          username: data.username || "",
          church_affiliation: data.church_affiliation || "",
          ministry_interests: data.ministry_interests || [],
          bio: data.bio || "",
          prayer_requests: data.prayer_requests || [],
          community_involvement: data.community_involvement || [],
          shared_resources: data.shared_resources || [],
          social_connections: data.social_connections || [],
          profile_image: data.profile_image
        });
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select a valid image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      setProfileData(prev => ({
        ...prev,
        profile_image: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error("No user logged in");

      const { error } = await supabase
        .from("profiles")
        .update(profileData)
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
    setProfileData(prev => ({
      ...prev,
      ministry_interests: prev.ministry_interests.includes(ministry)
        ? prev.ministry_interests.filter(m => m !== ministry)
        : [...prev.ministry_interests, ministry]
    }));
  };

  const addPrayerRequest = (request: string) => {
    setProfileData(prev => ({
      ...prev,
      prayer_requests: [...prev.prayer_requests, request]
    }));
  };

  const addCommunityInvolvement = (involvement: string) => {
    setProfileData(prev => ({
      ...prev,
      community_involvement: [...prev.community_involvement, involvement]
    }));
  };

  const addSharedResource = (resource: { title: string; description: string; category: string }) => {
    setProfileData(prev => ({
      ...prev,
      shared_resources: [...prev.shared_resources, resource]
    }));
  };

  const addSocialConnection = (username: string) => {
    setProfileData(prev => ({
      ...prev,
      social_connections: [...prev.social_connections, username]
    }));
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

        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Image Section */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <Avatar className="w-32 h-32">
                {profileData.profile_image ? (
                  <AvatarImage src={profileData.profile_image} alt={profileData.username} />
                ) : (
                  <AvatarFallback>
                    {profileData.username?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            <div className="flex justify-center">
              <label className="cursor-pointer">
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Change Profile Image
                </Button>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                value={profileData.username}
                onChange={(e) => setProfileData(prev => ({
                  ...prev,
                  username: e.target.value
                }))}
                placeholder="Enter your username"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="church" className="text-sm font-medium">
                Church Affiliation
              </label>
              <Input
                id="church"
                value={profileData.church_affiliation}
                onChange={(e) => setProfileData(prev => ({
                  ...prev,
                  church_affiliation: e.target.value
                }))}
                placeholder="Enter your church affiliation"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Personal Bio</label>
              <Textarea
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({
                  ...prev,
                  bio: e.target.value
                }))}
                placeholder="Tell us about yourself..."
                className="min-h-[100px]"
              />
            </div>
          </div>

          {/* Ministry Interests */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Ministry Interests</label>
            <div className="flex flex-wrap gap-2">
              {MINISTRY_OPTIONS.map((ministry) => (
                <Button
                  key={ministry}
                  type="button"
                  variant={profileData.ministry_interests.includes(ministry) ? "default" : "outline"}
                  onClick={() => toggleMinistry(ministry)}
                >
                  {ministry}
                </Button>
              ))}
            </div>
          </div>

          {/* Prayer Requests */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Prayer Requests</label>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => addPrayerRequest(`Prayer request ${profileData.prayer_requests.length + 1}`)}
              >
                <Prayer className="mr-2 h-4 w-4" />
                Add Request
              </Button>
            </div>
            <div className="space-y-2">
              {profileData.prayer_requests.map((request, index) => (
                <Card key={index} className="p-4">
                  <p className="text-sm">{request}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Community Involvement */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Community Involvement</label>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => addCommunityInvolvement(`Involvement ${profileData.community_involvement.length + 1}`)}
              >
                <Users className="mr-2 h-4 w-4" />
                Add Involvement
              </Button>
            </div>
            <div className="space-y-2">
              {profileData.community_involvement.map((involvement, index) => (
                <Card key={index} className="p-4">
                  <p className="text-sm">{involvement}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Shared Resources */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Shared Resources</label>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => addSharedResource({
                  title: `Resource ${profileData.shared_resources.length + 1}`,
                  description: `Description for resource ${profileData.shared_resources.length + 1}`,
                  category: "General"
                })}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Add Resource
              </Button>
            </div>
            <div className="space-y-2">
              {profileData.shared_resources.map((resource, index) => (
                <Card key={index} className="p-4">
                  <h4 className="font-semibold">{resource.title}</h4>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Category: {resource.category}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Social Connections */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Social Connections</label>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => addSocialConnection(`user${profileData.social_connections.length + 1}`)}
              >
                <Users className="mr-2 h-4 w-4" />
                Add Connection
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profileData.social_connections.map((connection, index) => (
                <Card key={index} className="p-2">
                  <p className="text-sm">{connection}</p>
                </Card>
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
