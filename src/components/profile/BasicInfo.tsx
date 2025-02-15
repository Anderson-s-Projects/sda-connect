
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface BasicInfoProps {
  username: string;
  churchAffiliation: string;
  about: string;
  bio: string;
  skills: string[];
  interests: string[];
  onUsernameChange: (value: string) => void;
  onChurchChange: (value: string) => void;
  onAboutChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
  onAddInterest: (interest: string) => void;
  onRemoveInterest: (interest: string) => void;
}

export const BasicInfo = ({
  username,
  churchAffiliation,
  about,
  bio,
  skills,
  interests,
  onUsernameChange,
  onChurchChange,
  onAboutChange,
  onBioChange,
  onAddSkill,
  onRemoveSkill,
  onAddInterest,
  onRemoveInterest,
}: BasicInfoProps) => {
  const handleSkillSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('skill') as HTMLInputElement;
    if (input.value.trim()) {
      onAddSkill(input.value.trim());
      input.value = '';
    }
  };

  const handleInterestSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('interest') as HTMLInputElement;
    if (input.value.trim()) {
      onAddInterest(input.value.trim());
      input.value = '';
    }
  };

  return (
    <div className="space-y-6">
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
        <label htmlFor="bio" className="text-sm font-medium">
          Bio
        </label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => onBioChange(e.target.value)}
          placeholder="Write a short bio about yourself..."
          className="min-h-[100px]"
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground">
          {bio.length}/500 characters
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">About Me</label>
        <Textarea
          value={about}
          onChange={(e) => onAboutChange(e.target.value)}
          placeholder="Tell us about yourself..."
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Skills</label>
        <form onSubmit={handleSkillSubmit} className="flex gap-2">
          <Input
            name="skill"
            placeholder="Add a skill..."
          />
          <Button type="submit">Add</Button>
        </form>
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {skill}
              <button
                onClick={() => onRemoveSkill(skill)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Interests</label>
        <form onSubmit={handleInterestSubmit} className="flex gap-2">
          <Input
            name="interest"
            placeholder="Add an interest..."
          />
          <Button type="submit">Add</Button>
        </form>
        <div className="flex flex-wrap gap-2 mt-2">
          {interests.map((interest) => (
            <Badge
              key={interest}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {interest}
              <button
                onClick={() => onRemoveInterest(interest)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
