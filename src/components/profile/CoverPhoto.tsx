
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface CoverPhotoProps {
  coverPhotoUrl: string | null;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CoverPhoto = ({ coverPhotoUrl, onPhotoChange }: CoverPhotoProps) => {
  return (
    <div className="relative w-full h-48 md:h-64 bg-gray-100 rounded-t-lg overflow-hidden">
      {coverPhotoUrl ? (
        <img
          src={coverPhotoUrl}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-sda-purple/20 to-sda-lavender/20" />
      )}
      <label className="absolute bottom-4 right-4 cursor-pointer">
        <Button variant="secondary" className="gap-2">
          <Camera className="h-4 w-4" />
          Change Cover
        </Button>
        <Input
          type="file"
          accept="image/*"
          onChange={onPhotoChange}
          className="hidden"
        />
      </label>
    </div>
  );
};
