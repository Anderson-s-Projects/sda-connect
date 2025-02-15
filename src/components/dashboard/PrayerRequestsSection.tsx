
import { Card } from "@/components/ui/card";

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
  if (!prayerRequests.length) return null;

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Prayer Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prayerRequests.map((request) => (
          <Card key={request.id} className="p-4">
            <h3 className="font-semibold">{request.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {request.description}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(request.created_at).toLocaleDateString()}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};
