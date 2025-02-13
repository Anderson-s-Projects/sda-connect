
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Book } from "lucide-react";

interface PrayerRequest {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

interface PrayerRequestsSectionProps {
  prayerRequests: PrayerRequest[];
}

export const PrayerRequestsSection = ({ prayerRequests }: PrayerRequestsSectionProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Prayer Requests</h2>
        <Button 
          variant="outline" 
          onClick={() => navigate("/prayer-requests")}
          className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {prayerRequests.map((request) => (
          <div 
            key={request.id}
            className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
            onClick={() => navigate(`/prayer-requests/${request.id}`)}
          >
            <div className="flex items-start space-x-4">
              <Book className="h-6 w-6 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold">{request.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {request.description.substring(0, 100)}...
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
