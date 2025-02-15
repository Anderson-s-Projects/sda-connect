
export interface ProfileData {
  username: string;
  church_affiliation: string;
  ministry_interests: string[];
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
  cover_photo_url: string | null;
  bio: string | null;
  professional_accomplishments: Array<{
    title: string;
    description: string;
    date: string;
  }>;
  skills: string[];
  interests: string[];
  profile_completion_percentage: number;
  element_privacy: {
    email: 'private' | 'public';
    bio: 'private' | 'public';
    skills: 'private' | 'public';
    interests: 'private' | 'public';
    accomplishments: 'private' | 'public';
  };
}
