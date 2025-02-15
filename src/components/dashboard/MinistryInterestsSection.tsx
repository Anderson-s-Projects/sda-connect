
import { Card } from "@/components/ui/card";

interface MinistryInterestsSectionProps {
  interests: string[];
}

export const MinistryInterestsSection = ({ interests }: MinistryInterestsSectionProps) => {
  if (!interests?.length) return null;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Your Ministry Interests</h2>
      <div className="flex flex-wrap gap-2">
        {interests.map((ministry) => (
          <div
            key={ministry}
            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
          >
            {ministry}
          </div>
        ))}
      </div>
    </Card>
  );
};
