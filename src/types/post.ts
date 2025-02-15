
export interface Post {
  id: string;
  title?: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  type: string;
  scheduled_for?: string;
  draft: boolean;
  audience: {
    type: 'public' | 'private' | 'connections';
    specific_users?: string[];
  };
  metadata: {
    poll?: {
      question: string;
      options: string[];
      end_date?: string;
    };
    event?: {
      start_date: string;
      end_date: string;
      location?: string;
    };
  };
}

export interface PostAttachment {
  id: string;
  post_id: string;
  file_type: string;
  url: string;
  thumbnail_url?: string;
  metadata: Record<string, any>;
  created_at: string;
}

export interface Poll {
  id: string;
  post_id: string;
  question: string;
  options: string[];
  end_date?: string;
  created_at: string;
  closed: boolean;
}

export interface PostDraft {
  id: string;
  content: string;
  title?: string;
  post_type: string;
  metadata: Record<string, any>;
  audience: {
    type: 'public' | 'private' | 'connections';
    specific_users?: string[];
  };
  created_at: string;
  updated_at: string;
}
