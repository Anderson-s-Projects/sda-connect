
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Settings } from "lucide-react";

interface UserProfile {
  username: string;
  church_affiliation: string;
}

interface WelcomeSectionProps {
  profile: UserProfile | null;
}

export const WelcomeSection = ({ profile }: WelcomeSectionProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome, {profile?.username || "Friend"}</h1>
            <p className="text-muted-foreground">
              {profile?.church_affiliation || "Your Church"}
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={() => navigate("/profile")}>
          <Settings className="h-4 w-4 mr-2" />
          Profile Settings
        </Button>
      </div>
    </Card>
  );
};
