
import { supabase } from "@/integrations/supabase/client";
import { Toast } from "@/components/ui/use-toast";

interface ImageUploadParams {
  file: File;
  userId: string;
  storageBucket: 'avatars' | 'covers';
  toast: (props: { title: string; description: string; variant?: "destructive" }) => void;
}

export const uploadProfileImage = async ({ file, userId, storageBucket, toast }: ImageUploadParams) => {
  if (!file.type.startsWith('image/')) {
    toast({
      title: "Error",
      description: "Please select a valid image file",
      variant: "destructive",
    });
    return null;
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Math.random()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from(storageBucket)
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(storageBucket)
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error: any) {
    toast({
      title: "Error uploading image",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};
