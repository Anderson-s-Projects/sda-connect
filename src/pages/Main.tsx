import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { CalendarIcon, Users, Video, Music, Prayer, Bible, Share2, Settings, UserPlus, HeartHandshake } from "lucide-react";

interface UserProfile {
  username: string;
  church_affiliation: string;
  ministry_interests: string[];
  bio?: string;
  spiritual_goals?: string[];
  favorite_scriptures?: string[];
  community_involvement?: string[];
  preferred_worship_style?: string;
  prayer_requests?: string[];
  testimony?: string;
  engagement_level?: number;
}

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [featuredContent, setFeaturedContent] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      try {
        await checkUser();
        await loadProfile();
        await loadFeaturedContent();
        await loadRecentActivities();
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  // Existing functions remain unchanged...

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <Card className="p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <Avatar className="h-16 w-16">
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-primary">
                  Welcome, {profile?.username || "Friend"}
                </h1>
                <div className="flex items-center space-x-2">
                  <ChurchIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {profile?.church_affiliation || "Your Church"}
                  </span>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate("/profile")}
              className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              <Settings className="h-4 w-4 mr-2 text-primary" />
              Profile Settings
            </Button>
          </div>

          {/* Spiritual Journey Section */}
          <Card className="mt-6">
            <div className="space-y-6 p-4">
              {profile?.testimony && (
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Bible className="h-5 w-5 text-primary" />
                    My Testimony
                  </h3>
                  <p className="text-muted-foreground">{profile.testimony}</p>
                </div>
              )}
              
              {profile?.spiritual_goals && (
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Prayer className="h-5 w-5 text-primary" />
                    Spiritual Goals
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.spiritual_goals.map((goal, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-sm rounded-full"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {profile?.favorite_scriptures && (
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Book className="h-5 w-5 text-primary" />
                    Favorite Scriptures
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.favorite_scriptures.map((scripture, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-sm rounded-full"
                      >
                        {scripture}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Ministry Impact Section */}
          <Card className="mt-6">
            <div className="space-y-6 p-4">
              <Tabs defaultValue="involvement" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="involvement">Community Work</TabsTrigger>
                  <TabsTrigger value="requests">Prayer Requests</TabsTrigger>
                </TabsList>

                <TabsContent value="involvement">
                  {profile?.community_involvement && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <HeartHandshake className="h-5 w-5 text-primary" />
                        My Ministry Impact
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profile.community_involvement.map((activity, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-sm rounded-full"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Engagement Level:</span>
                    <Slider
                      defaultValue={[profile?.engagement_level || 5]}
                      max={10}
                      step={1}
                      className="w-[100px]"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="requests">
                  {profile?.prayer_requests && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Prayer className="h-5 w-5 text-primary" />
                        Prayer Requests
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profile.prayer_requests.map((request, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-sm rounded-full"
                          >
                            {request}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </Card>

          {/* Worship Preferences Section */}
          <Card className="mt-6">
            <div className="space-y-6 p-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Music className="h-5 w-5 text-primary" />
                Worship Preferences
              </h3>
              
              <Select
                value={profile?.preferred_worship_style || ""}
                onValueChange={(value) => {
                  setProfile(prev => prev ? {...prev, preferred_worship_style: value} : null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select worship style preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="traditional">Traditional</SelectItem>
                  <SelectItem value="contemporary">Contemporary</SelectItem>
                  <SelectItem value="charismatic">Charismatic</SelectItem>
                  <SelectItem value="liturgical">Liturgical</SelectItem>
                </SelectContent>
              </Select>

              {profile?.bio && (
                <div>
                  <h4 className="font-medium mt-2">Personal Bio</h4>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => {
                      setProfile(prev => prev ? {...prev, bio: e.target.value} : null);
                    }}
                    className="min-h-[100px]"
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Ministry Interests Section */}
          {profile?.ministry_interests && profile.ministry_interests.length > 0 && (
            <Card className="mt-6">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Ministry Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.ministry_interests.map((ministry, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-primary/10 rounded-full"
                    >
                      {ministry}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </Card>

        {/* Quick Actions Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Existing quick actions cards... */}
        </div>

        {/* Recent Activities Section */}
        <Card className="p-6">
          {/* Existing recent activities display... */}
        </Card>
      </div>
    </div>
  );
};

export default Main;
