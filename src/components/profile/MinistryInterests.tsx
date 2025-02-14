
import { Button } from "@/components/ui/button";

interface MinistryInterestsProps {
  interests: string[];
  options: string[];
  onToggle: (ministry: string) => void;
}

export const MinistryInterests = ({ interests, options, onToggle }: MinistryInterestsProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Ministry Interests</label>
      <div className="flex flex-wrap gap-2">
        {options.map((ministry) => (
          <Button
            key={ministry}
            type="button"
            variant={interests.includes(ministry) ? "default" : "outline"}
            onClick={() => onToggle(ministry)}
          >
            {ministry}
          </Button>
        ))}
      </div>
    </div>
  );
};
