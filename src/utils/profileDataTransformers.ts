
import { ProfileData } from "@/types/profile";

export const transformProfessionalAccomplishments = (accomplishmentsData: any[]) => {
  return Array.isArray(accomplishmentsData) 
    ? accomplishmentsData.map(acc => {
        if (typeof acc === 'object' && acc !== null) {
          const accomp = acc as Record<string, unknown>;
          return {
            title: String(accomp.title || ''),
            description: String(accomp.description || ''),
            date: String(accomp.date || '')
          };
        }
        return {
          title: '',
          description: '',
          date: ''
        };
      })
    : [];
};

export const transformElementPrivacy = (privacyData: any, defaultPrivacy: ProfileData['element_privacy']) => {
  return typeof privacyData === 'object' && privacyData !== null
    ? {
        email: (privacyData as Record<string, string>).email as 'private' | 'public' || 'private',
        bio: (privacyData as Record<string, string>).bio as 'private' | 'public' || 'public',
        skills: (privacyData as Record<string, string>).skills as 'private' | 'public' || 'public',
        interests: (privacyData as Record<string, string>).interests as 'private' | 'public' || 'public',
        accomplishments: (privacyData as Record<string, string>).accomplishments as 'private' | 'public' || 'public'
      }
    : defaultPrivacy;
};

export const transformArrayField = (field: any): string[] => {
  return Array.isArray(field) ? field : [];
};
