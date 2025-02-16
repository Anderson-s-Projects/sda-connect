
import { useEffect, useState, useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreatePost } from "./CreatePost";
import { Button } from "@/components/ui/button";
import { Image, Video, FileText, Heart, MessageSquare, Share } from "lucide-react";

const POSTS_PER_PAGE = 10;

export const SocialFeed = () => {
  const { toast } = useToast();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [sortOrder, setSortOrder] = useState<"latest" | "popular">("latest");

  const fetchPosts = async ({ pageParam = 0 }) => {
    const from = pageParam * POSTS_PER_PAGE;
    const to = from + POSTS_PER_PAGE - 1;

    const query = supabase
      .from("posts")
      .select(`
        *,
        profiles (username, avatar_url)
      `)
      .eq("draft", false)
      .range(from, to);

    if (sortOrder === "latest") {
      query.order("created_at", { ascending: false });
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ["posts", sortOrder],
    queryFn: fetchPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < POSTS_PER_PAGE) return undefined;
      return pages.length;
    },
  });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    const option = { threshold: 0.1 };
    const observer = new IntersectionObserver(handleObserver, option);

    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  const renderAttachment = (post: any) => {
    const attachments = post.metadata?.attachments || [];
    return attachments.map((attachment: any, index: number) => {
      if (attachment.type.startsWith("image/")) {
        return (
          <div key={index} className="mt-4">
            <img
              src={attachment.url}
              alt="Post attachment"
              className="rounded-lg max-h-96 w-full object-cover"
            />
          </div>
        );
      }

      if (attachment.type.startsWith("video/")) {
        return (
          <div key={index} className="mt-4">
            <video
              src={attachment.url}
              controls
              className="rounded-lg w-full"
            />
          </div>
        );
      }

      return (
        <a
          key={index}
          href={attachment.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center gap-2 p-4 bg-muted rounded-lg hover:bg-muted/80"
        >
          <FileText className="h-6 w-6" />
          <span>View attachment</span>
        </a>
      );
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6">
      <CreatePost onPostCreated={() => refetch()} />

      <div className="flex justify-end gap-2 mb-4">
        <Button
          variant={sortOrder === "latest" ? "default" : "outline"}
          onClick={() => setSortOrder("latest")}
        >
          Latest
        </Button>
        <Button
          variant={sortOrder === "popular" ? "default" : "outline"}
          onClick={() => setSortOrder("popular")}
        >
          Popular
        </Button>
      </div>

      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex} className="space-y-4">
          {page.map((post: any) => (
            <Card key={post.id} className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={post.profiles?.avatar_url || "/placeholder.svg"}
                  alt={post.profiles?.username}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">
                        {post.profiles?.username || "Anonymous"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {post.title && (
                    <h4 className="text-lg font-semibold mt-2">{post.title}</h4>
                  )}
                  
                  <p className="mt-2">{post.content}</p>

                  {renderAttachment(post)}

                  <div className="flex gap-4 mt-4">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Heart className="h-4 w-4" />
                      Like
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Comment
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Share className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ))}

      <div ref={loadMoreRef} className="h-10">
        {isFetchingNextPage && (
          <p className="text-center text-muted-foreground">Loading more posts...</p>
        )}
      </div>
    </div>
  );
};
