
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ProfileImage } from "@/components/profile/ProfileImage";
import { BasicInfo } from "@/components/profile/BasicInfo";
import { MinistryInterests } from "@/components/profile/MinistryInterests";
import { PrayerRequests } from "@/components/profile/PrayerRequests";
import { CoverPhoto } from "@/components/profile/CoverPhoto";
import { ProfileCompletion } from "@/components/profile/ProfileCompletion";
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
    handleCoverPhotoUpload,
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
    <div className="min-h-screen bg-gray-50">
      <AdventistNav />
      <div className="max-w-4xl mx-auto pb-12">
        <Card className="mt-6">
          <CoverPhoto
            coverPhotoUrl={profileData.cover_photo_url}
            onPhotoChange={handleCoverPhotoUpload}
          />
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-8">
              <div className="flex gap-6 items-start">
                <ProfileImage
                  imageUrl={profileData.avatar_url}
                  username={profileData.username}
                  onImageChange={handleImageUpload}
                />
                <div>
                  <h1 className="text-2xl font-bold">{profileData.username || "New User"}</h1>
                  <p className="text-muted-foreground">{profileData.church_affiliation}</p>
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>

            <ProfileCompletion percentage={profileData.profile_completion_percentage} />

            <form onSubmit={handleSave} className="space-y-8 mt-8">
              <BasicInfo
                username={profileData.username}
                churchAffiliation={profileData.church_affiliation}
                about={profileData.about}
                bio={profileData.bio || ""}
                skills={profileData.skills || []}
                interests={profileData.interests || []}
                onUsernameChange={(value) => setProfileData(prev => ({ ...prev, username: value }))}
                onChurchChange={(value) => setProfileData(prev => ({ ...prev, church_affiliation: value }))}
                onAboutChange={(value) => setProfileData(prev => ({ ...prev, about: value }))}
                onBioChange={(value) => setProfileData(prev => ({ ...prev, bio: value }))}
                onAddSkill={(skill) => setProfileData(prev => ({
                  ...prev,
                  skills: [...(prev.skills || []), skill]
                }))}
                onRemoveSkill={(skill) => setProfileData(prev => ({
                  ...prev,
                  skills: (prev.skills || []).filter(s => s !== skill)
                }))}
                onAddInterest={(interest) => setProfileData(prev => ({
                  ...prev,
                  interests: [...(prev.interests || []), interest]
                }))}
                onRemoveInterest={(interest) => setProfileData(prev => ({
                  ...prev,
                  interests: (prev.interests || []).filter(i => i !== interest)
                }))}
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
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
