
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Users, Plus } from "lucide-react";

interface Group {
  id: string;
  name: string;
  description: string;
  members_count: number;
  type: string;
  image_url?: string;
  created_at: string;
}

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    type: "general"
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGroups(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading groups",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("groups")
        .insert([
          {
            ...newGroup,
            created_by: session.user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Also add creator as a member
      await supabase
        .from("group_members")
        .insert([
          {
            group_id: data.id,
            user_id: session.user.id,
            role: "admin",
          },
        ]);

      toast({
        title: "Success",
        description: "Group created successfully",
      });

      loadGroups();
      setNewGroup({ name: "", description: "", type: "general" });
    } catch (error: any) {
      toast({
        title: "Error creating group",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleGroupClick = (groupId: string) => {
    navigate(`/groups/${groupId}`);
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Community Groups</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  placeholder="Enter group name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  placeholder="Describe your group"
                />
              </div>
              <Button onClick={createGroup} className="w-full">
                Create Group
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <Card
            key={group.id}
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleGroupClick(group.id)}
          >
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{group.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{group.description}</p>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {group.members_count || 0} members
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Groups;
