
import { ProfileData } from "@/types/profile";

export const initialProfileData: ProfileData = {
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
