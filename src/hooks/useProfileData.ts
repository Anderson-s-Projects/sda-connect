
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProfileData } from "@/types/profile";

const initialProfileData: ProfileData = {
  username: "",
  church_affiliation: "",
  ministry_interests: [],
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
  cover_photo_url: null,
  bio: null,
  professional_accomplishments: [],
  skills: [],
  interests: [],
  profile_completion_percentage: 0,
  element_privacy: {
    email: "private",
    bio: "public",
    skills: "public",
    interests: "public",
    accomplishments: "public"
  }
};

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
        const accomplishments = Array.isArray(data.professional_accomplishments) 
          ? data.professional_accomplishments.map(acc => {
              if (typeof acc === 'object' && acc !== null) {
                return {
                  title: String(acc.title || ''),
                  description: String(acc.description || ''),
                  date: String(acc.date || '')
                };
              }
              return {
                title: '',
                description: '',
                date: ''
              };
            })
          : [];

        setProfileData({
          ...initialProfileData,
          ...data,
          professional_accomplishments: accomplishments,
          prayer_requests: Array.isArray(data.prayer_requests) ? data.prayer_requests : [],
          ministry_interests: Array.isArray(data.ministry_interests) ? data.ministry_interests : [],
          skills: Array.isArray(data.skills) ? data.skills : [],
          interests: Array.isArray(data.interests) ? data.interests : [],
          element_privacy: {
            email: data.element_privacy?.email || "private",
            bio: data.element_privacy?.bio || "public",
            skills: data.element_privacy?.skills || "public",
            interests: data.element_privacy?.interests || "public",
            accomplishments: data.element_privacy?.accomplishments || "public"
          }
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

  const handleCoverPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        .from('covers')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('covers')
        .getPublicUrl(fileName);

      setProfileData(prev => ({
        ...prev,
        cover_photo_url: publicUrl
      }));
    } catch (error: any) {
      toast({
        title: "Error uploading cover photo",
        description: error.message,
        variant: "destructive",
      });
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
