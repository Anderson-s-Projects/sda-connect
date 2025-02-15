
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Users, Plus } from "lucide-react";
import AdventistNav from "@/components/AdventistNav";

interface Group {
  id: string;
  name: string;
  description: string;
  members_count: number; // Changed from member_count to members_count to match DB schema
  created_at: string;
  updated_at: string;
  created_by: string | null;
  image_url: string | null;
  type: string;
}

const Groups = () => {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<Group[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    loadGroups();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const loadGroups = async () => {
    try {
      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGroups(data || []);
    } catch (err) {
      toast({
        title: "Error loading groups",
        description: err instanceof Error ? err.message : "Failed to load groups",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { error } = await supabase
        .from("group_members")
        .insert([
          { group_id: groupId, user_id: session.user.id }
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "You have joined the group successfully!",
      });

      await loadGroups();
    } catch (err) {
      toast({
        title: "Error joining group",
        description: err instanceof Error ? err.message : "Failed to join group",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div>
        <AdventistNav />
        <div className="text-center p-4">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <AdventistNav />
      
      <div className="max-w-7xl mx-auto px-4 pt-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Groups</h1>
            <p className="text-muted-foreground">
              Join and participate in various ministry and interest groups
            </p>
          </div>
          <Button
            onClick={() => navigate("/groups/create")}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Group
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <Card key={group.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleJoinGroup(group.id)}
                >
                  Join
                </Button>
              </div>
              <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
              <p className="text-muted-foreground mb-4">{group.description}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-2" />
                {group.members_count} members
              </div>
            </Card>
          ))}
        </div>

        {groups.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No Groups Found</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to create a group and start building your community!
            </p>
            <Button
              onClick={() => navigate("/groups/create")}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Group
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
