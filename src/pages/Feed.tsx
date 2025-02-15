
import AdventistNav from "@/components/AdventistNav";
import { SocialFeed } from "@/components/social/SocialFeed";

const Feed = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdventistNav />
      <div className="container mx-auto pt-20">
        <SocialFeed />
      </div>
    </div>
  );
};

export default Feed;
