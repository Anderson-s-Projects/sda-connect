
export interface PostMetadata {
  attachments?: {
    type: string;
    url: string;
    name: string;
  }[];
}

export interface Post {
  id: string;
  content: string;
  title?: string;
  created_at: string;
  updated_at: string;
  type: string;
  user_id: string | null;
  is_sabbath_appropriate: boolean | null;
  metadata: PostMetadata | null;
  draft: boolean;
}

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  professional_accomplishments: {
    title: string;
    description: string;
    date: string;
  }[];
}
