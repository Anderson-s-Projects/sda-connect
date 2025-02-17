import AdventistNav from "@/components/AdventistNav";
import { SocialFeed } from "@/components/social/SocialFeed";
import { Sidebar } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookmarkPlus, TrendingUp, Calendar, Filter, User } from "lucide-react";
import { useState } from "react";
const Feed = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const trendingTopics = ["Prayer", "Bible Study", "Community", "Faith", "Hope"];
  const suggestedUsers = [{
    id: 1,
    name: "Sarah Johnson",
    role: "Prayer Leader"
  }, {
    id: 2,
    name: "David Chen",
    role: "Bible Study Host"
  }, {
    id: 3,
    name: "Maria Garcia",
    role: "Community Organizer"
  }];
  const upcomingEvents = [{
    id: 1,
    title: "Morning Prayer",
    date: "Tomorrow, 8:00 AM"
  }, {
    id: 2,
    title: "Bible Study",
    date: "Wednesday, 7:00 PM"
  }, {
    id: 3,
    title: "Community Service",
    date: "Saturday, 10:00 AM"
  }];
  return <div className="min-h-screen bg-gray-50">
      <AdventistNav />
      <div className="container mx-auto pt-20">
        <div className="flex gap-6">
          {/* Main Feed */}
          <div className="flex-1 py-0 px-0 mx-0 my-0 rounded-none">
            <SocialFeed />
          </div>

          {/* Sidebar */}
          <div className="py-[2px] my-0 mx-0 px-[3px] rounded-none">
            {/* Search */}
            <Card className="p-4 px-0 py-0">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search posts..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
            </Card>

            {/* Quick Filters */}
            <Card className="p-4 px-0 py-[9px]">
              <h3 className="font-semibold mb-3 flex items-center gap-2 px-0 py-0">
                <Filter className="h-4 w-4" />
                Quick Filters
              </h3>
              <div className="space-y-2 py-0">
                <Button variant="outline" size="sm" className="w-full justify-start px-[4px] py-[4px] mx-[4px] my-[4px]">
                  Text Posts
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start px-[4px] mx-[4px] my-[4px] py-[4px]">
                  Images
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start px-[4px] mx-[4px] my-[4px] py-[4px]">
                  Videos
                </Button>
              </div>
            </Card>

            {/* Trending Topics */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Trending Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map(topic => <Button key={topic} variant="secondary" size="sm">
                    #{topic}
                  </Button>)}
              </div>
            </Card>

            {/* Suggested Users */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                Suggested Connections
              </h3>
              <div className="space-y-3">
                {suggestedUsers.map(user => <div key={user.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.role}</p>
                    </div>
                    <Button size="sm" variant="outline">Connect</Button>
                  </div>)}
              </div>
            </Card>

            {/* Upcoming Events */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map(event => <div key={event.id} className="space-y-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>)}
              </div>
              <Button variant="link" size="sm" className="mt-2 w-full">
                View All Events
              </Button>
            </Card>

            {/* Daily Verse */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Daily Verse</h3>
              <blockquote className="text-sm italic">
                "For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."
              </blockquote>
              <p className="text-xs text-muted-foreground mt-2">- Jeremiah 29:11</p>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default Feed;