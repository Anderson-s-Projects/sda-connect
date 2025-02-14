
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProfileImage } from "@/components/profile/ProfileImage";
import { BasicInfo } from "@/components/profile/BasicInfo";
import { MinistryInterests } from "@/components/profile/MinistryInterests";
import { PrayerRequests } from "@/components/profile/PrayerRequests";

interface ProfileData {
  username: string;
  church_affiliation: string;
  ministry_interests: string[];
  bio: string;
  about: string;
  avatar_url: string;
  prayer_requests: string[];
  full_name: string;
  id: string;
  location: string;
  privacy_settings: any;
  created_at: string;
  updated_at: string;
  favorite_bible_verse: string;
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
    about: "",
    avatar_url: "",
    prayer_requests: [],
    full_name: "",
    id: "",
    location: "",
    privacy_settings: {},
    created_at: "",
    updated_at: "",
    favorite_bible_verse: "",
  });
  
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
      return;
    }
  };

  const loadProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfileData(data);
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

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/auth");
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${session.user.id}-${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      setProfileData(prev => ({
        ...prev,
        avatar_url: publicUrl
      }));

    } catch (error: any) {
      toast({
        title: "Error uploading image",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/auth");
        return;
      }

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
          <ProfileImage
            imageUrl={profileData.avatar_url}
            username={profileData.username}
            onImageChange={handleImageUpload}
          />

          <BasicInfo
            username={profileData.username}
            churchAffiliation={profileData.church_affiliation}
            bio={profileData.bio || profileData.about}
            onUsernameChange={(value) => setProfileData(prev => ({ ...prev, username: value }))}
            onChurchChange={(value) => setProfileData(prev => ({ ...prev, church_affiliation: value }))}
            onBioChange={(value) => setProfileData(prev => ({ ...prev, bio: value, about: value }))}
          />

          <MinistryInterests
            interests={profileData.ministry_interests}
            options={MINISTRY_OPTIONS}
            onToggle={(ministry) => {
              setProfileData(prev => ({
                ...prev,
                ministry_interests: prev.ministry_interests.includes(ministry)
                  ? prev.ministry_interests.filter(m => m !== ministry)
                  : [...prev.ministry_interests, ministry]
              }));
            }}
          />

          <PrayerRequests
            requests={profileData.prayer_requests || []}
            onAddRequest={() => {
              setProfileData(prev => ({
                ...prev,
                prayer_requests: [...(prev.prayer_requests || []), `Prayer request ${(prev.prayer_requests || []).length + 1}`]
              }));
            }}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
