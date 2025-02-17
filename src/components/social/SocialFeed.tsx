import { useEffect, useState, useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreatePost } from "./CreatePost";
import { Button } from "@/components/ui/button";
import { PostCard } from "./PostCard";
import type { PostWithProfile } from "@/types/database";
const POSTS_PER_PAGE = 10;
export const SocialFeed = () => {
  const {
    toast
  } = useToast();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [sortOrder, setSortOrder] = useState<"latest" | "popular">("latest");
  const fetchPosts = async ({
    pageParam = 0
  }) => {
    const from = pageParam * POSTS_PER_PAGE;
    const to = from + POSTS_PER_PAGE - 1;
    const {
      data,
      error
    } = await supabase.from("posts").select(`
        *,
        profiles (username, avatar_url)
      `).eq("draft", false).range(from, to).order(sortOrder === "latest" ? "created_at" : "likes_count", {
      ascending: false
    });
    if (error) throw error;
    return data as unknown as PostWithProfile[];
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
    }
  });
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  useEffect(() => {
    const element = loadMoreRef.current;
    const option = {
      threshold: 0.1
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);
  return <div className="max-w-2xl mx-auto space-y-6 py-0">
      <CreatePost onPostCreated={() => refetch()} />

      <div className="flex justify-end gap-2 mb-4">
        <Button variant={sortOrder === "latest" ? "default" : "outline"} onClick={() => setSortOrder("latest")} className="">
          Latest
        </Button>
        <Button variant={sortOrder === "popular" ? "default" : "outline"} onClick={() => setSortOrder("popular")}>
          Popular
        </Button>
      </div>

      {data?.pages.map((page, pageIndex) => <div key={pageIndex} className="space-y-4">
          {page.map((post: PostWithProfile) => <PostCard key={post.id} post={post} />)}
        </div>)}

      <div ref={loadMoreRef} className="h-10">
        {isFetchingNextPage && <p className="text-center text-muted-foreground">Loading more posts...</p>}
      </div>
    </div>;
};