
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface ResourceLibrarySectionProps {
  resources: Resource[];
}

export const ResourceLibrarySection = ({ resources }: ResourceLibrarySectionProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Resource Library</h2>
        <Button 
          variant="outline" 
          onClick={() => navigate("/resources")}
          className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <Card 
            key={resource.id}
            className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => navigate(`/resources/${resource.id}`)}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {resource.category}
                </span>
              </div>
              <h3 className="font-semibold">{resource.title}</h3>
              <p className="text-sm text-muted-foreground">
                {resource.description.substring(0, 100)}...
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};
