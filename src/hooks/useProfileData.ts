
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProfileData } from "@/types/profile";
import { initialProfileData } from "@/constants/profileConstants";
import { 
  transformProfessionalAccomplishments, 
  transformElementPrivacy,
  transformArrayField 
} from "@/utils/profileDataTransformers";
import { uploadProfileImage } from "@/utils/profileImageHandlers";

export const useProfileData = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const navigate = useNavigate();
  const { toast } = useToast();

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
        const accomplishments = transformProfessionalAccomplishments(
          Array.isArray(data.professional_accomplishments) 
            ? data.professional_accomplishments 
            : []
        );
        
        const elementPrivacy = transformElementPrivacy(data.element_privacy, initialProfileData.element_privacy);

        setProfileData({
          ...initialProfileData,
          ...data,
          professional_accomplishments: accomplishments,
          prayer_requests: transformArrayField(data.prayer_requests),
          ministry_interests: transformArrayField(data.ministry_interests),
          skills: transformArrayField(data.skills),
          interests: transformArrayField(data.interests),
          element_privacy: elementPrivacy
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

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      navigate("/auth");
      return;
    }

    const publicUrl = await uploadProfileImage({
      file,
      userId: session.user.id,
      storageBucket: 'avatars',
      toast
    });

    if (publicUrl) {
      setProfileData(prev => ({
        ...prev,
        avatar_url: publicUrl
      }));
    }
  };

  const handleCoverPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      navigate("/auth");
      return;
    }

    const publicUrl = await uploadProfileImage({
      file,
      userId: session.user.id,
      storageBucket: 'covers',
      toast
    });

    if (publicUrl) {
      setProfileData(prev => ({
        ...prev,
        cover_photo_url: publicUrl
      }));
    }
  };

  const saveProfile = async () => {
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
      
      await loadProfile();
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

  return {
    loading,
    profileData,
    setProfileData,
    checkUser,
    loadProfile,
    handleImageUpload,
    handleCoverPhotoUpload,
    saveProfile
  };
};
