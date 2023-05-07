import { useEffect, useState } from "react";
import { Header } from "../components/header/Header";
import { PostListItem, PostListItemProps } from "../components/post/ListItem";
import { Post, getPosts } from "../services/Reddit";
import { timeDifference } from "../services/Util";
import { LoadMoreButton } from "../components/loadMoreButton/LoadMoreButton";

function toPostListItemProps({ data }: Post): PostListItemProps {
  return {
    id: data.id,
    subreddit: `r/${data.subreddit}`,
    timeAgo: timeDifference(new Date().getTime(), data.created * 1000),
    title: data.title,
    upvoteCount: data.score,
    commentCount: data.num_comments,
    previewImageUrl: (data.thumbnail?.startsWith("http")
      ? data.thumbnail
      : data.preview?.images?.[0].resolutions?.[1].url || ""
    ).replaceAll(/&amp;/g, "&"),
    previewImageSubtitle: data.domain,
  };
}

export function PostsPage() {
  const [{ next, posts }, setPage] = useState<{
    next?: string;
    posts: PostListItemProps[];
  }>({ posts: [] });

  async function load(after?: string) {
    // TODO get these from path
    const { data } = await getPosts("indonesia", "new", after);
    setPage((prev) => ({
      next: data.after,
      posts: [...prev.posts, ...data.children.map(toPostListItemProps)],
    }));
  }

  useEffect(() => {
    load();
  }, []);
  return (
    <>
      <Header />
      <div>
        {posts.map((p) => (
          <PostListItem key={p.id} {...p} />
        ))}
      </div>
      {next && <LoadMoreButton onClick={() => load(next)} />}
    </>
  );
}
