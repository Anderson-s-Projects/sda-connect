
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface PrayerRequestsProps {
  requests: string[];
  onAddRequest: () => void;
}

export const PrayerRequests = ({ requests, onAddRequest }: PrayerRequestsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Prayer Requests</label>
        <Button type="button" variant="outline" onClick={onAddRequest}>
          <Heart className="mr-2 h-4 w-4" />
          Add Request
        </Button>
      </div>
      <div className="space-y-2">
        {requests.map((request, index) => (
          <Card key={index} className="p-4">
            <p className="text-sm">{request}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
