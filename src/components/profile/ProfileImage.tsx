
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

interface ProfileImageProps {
  imageUrl: string | null;
  username: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileImage = ({ imageUrl, username, onImageChange }: ProfileImageProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Avatar className="w-32 h-32">
          {imageUrl ? (
            <AvatarImage src={imageUrl} alt={username} />
          ) : (
            <AvatarFallback>
              {username?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          )}
        </Avatar>
      </div>
      <div className="flex justify-center">
        <label className="cursor-pointer">
          <Button variant="outline" className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Change Profile Image
          </Button>
          <Input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};
