
import { Progress } from "@/components/ui/progress";

interface ProfileCompletionProps {
  percentage: number;
}

export const ProfileCompletion = ({ percentage }: ProfileCompletionProps) => {
  return (
    <div className="space-y-2 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Profile Completion</h3>
        <span className="text-sm text-muted-foreground">{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-2" />
      {percentage < 100 && (
        <p className="text-xs text-muted-foreground">
          Complete your profile to connect with more members
        </p>
      )}
    </div>
  );
};
