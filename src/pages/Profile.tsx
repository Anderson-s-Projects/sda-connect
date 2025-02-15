import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ProfileImage } from "@/components/profile/ProfileImage";
import { BasicInfo } from "@/components/profile/BasicInfo";
import { MinistryInterests } from "@/components/profile/MinistryInterests";
import { PrayerRequests } from "@/components/profile/PrayerRequests";
import { useProfileData } from "@/hooks/useProfileData";
import AdventistNav from "@/components/AdventistNav";

const MINISTRY_OPTIONS = [
  "Youth Ministry",
  "Worship Team",
  "Education",
  "Community Service",
  "Prayer Ministry",
];

const Profile = () => {
  const {
    loading,
    profileData,
    setProfileData,
    checkUser,
    loadProfile,
    handleImageUpload,
    saveProfile
  } = useProfileData();
  
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
    loadProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveProfile();
  };

  if (loading) {
    return (
      <div>
        <AdventistNav />
        <div className="text-center p-4">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <AdventistNav />
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
            about={profileData.about}
            onUsernameChange={(value) => setProfileData(prev => ({ ...prev, username: value }))}
            onChurchChange={(value) => setProfileData(prev => ({ ...prev, church_affiliation: value }))}
            onAboutChange={(value) => setProfileData(prev => ({ ...prev, about: value }))}
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
            requests={profileData.prayer_requests}
            onAddRequest={() => {
              setProfileData(prev => ({
                ...prev,
                prayer_requests: [...prev.prayer_requests, `Prayer request ${prev.prayer_requests.length + 1}`]
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
