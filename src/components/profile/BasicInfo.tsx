
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface BasicInfoProps {
  username: string;
  churchAffiliation: string;
  bio: string;
  onUsernameChange: (value: string) => void;
  onChurchChange: (value: string) => void;
  onBioChange: (value: string) => void;
}

export const BasicInfo = ({
  username,
  churchAffiliation,
  bio,
  onUsernameChange,
  onChurchChange,
  onBioChange,
}: BasicInfoProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <Input
          id="username"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          placeholder="Enter your username"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="church" className="text-sm font-medium">
          Church Affiliation
        </label>
        <Input
          id="church"
          value={churchAffiliation}
          onChange={(e) => onChurchChange(e.target.value)}
          placeholder="Enter your church affiliation"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Personal Bio</label>
        <Textarea
          value={bio}
          onChange={(e) => onBioChange(e.target.value)}
          placeholder="Tell us about yourself..."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};
