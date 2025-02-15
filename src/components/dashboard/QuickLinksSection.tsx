
import { Card } from "@/components/ui/card";
import { Book, Users, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const QuickLinksSection = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card 
        className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => navigate("/groups")}
      >
        <div className="space-y-4">
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <Users className="h-5 w-5 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold">Community Groups</h2>
          <p className="text-muted-foreground">Connect with fellow believers in groups</p>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="space-y-4">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Book className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold">Bible Study</h2>
          <p className="text-muted-foreground">Access daily devotionals and study materials</p>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="space-y-4">
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold">Events</h2>
          <p className="text-muted-foreground">View upcoming church events</p>
        </div>
      </Card>
    </div>
  );
};
