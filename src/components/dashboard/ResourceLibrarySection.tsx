
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
  if (!resources.length) return null;

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Resource Library</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resources.map((resource) => (
          <Card key={resource.id} className="p-4">
            <h3 className="font-semibold">{resource.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {resource.description}
            </p>
            <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              {resource.category}
            </span>
          </Card>
        ))}
      </div>
    </section>
  );
};
