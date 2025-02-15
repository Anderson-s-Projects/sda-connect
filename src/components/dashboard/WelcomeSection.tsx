
import { Card } from "@/components/ui/card";

interface UserProfile {
  username: string;
  church_affiliation: string;
  ministry_interests: string[];
}

interface WelcomeSectionProps {
  profile: UserProfile | null;
}

export const WelcomeSection = ({ profile }: WelcomeSectionProps) => {
  return (
    <Card className="p-6 bg-gradient-to-r from-sda-purple/20 to-sda-lavender/20">
      <h1 className="text-2xl font-bold mb-2">
        Welcome, {profile?.username || "Friend"}!
      </h1>
      {profile?.church_affiliation && (
        <p className="text-muted-foreground">
          Member of {profile.church_affiliation}
        </p>
      )}
    </Card>
  );
};
