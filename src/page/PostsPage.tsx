import { useEffect, useState } from "react";
import { Header } from "../components/header/Header";
import { PostListItem, PostListItemProps } from "../components/post/ListItem";
import { Post, getPosts } from "../services/Reddit";
import { timeDifference } from "../services/Util";
import { LoadMoreButton } from "../components/loadMoreButton/LoadMoreButton";
import { useParams } from "react-router-dom";

function toPostListItemProps({ data }: Post): PostListItemProps {
  return {
    id: data.id,
    link: `/p/${data.id}`,
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
  const params = useParams();
  const subreddit = params.subreddit as string;

  const [{ next, posts }, setPage] = useState<{
    next?: string;
    posts: PostListItemProps[];
  }>({ posts: [] });

  async function load(subreddit: string, after?: string) {
    // TODO get these from path
    const { data } = await getPosts(subreddit, "new", after);
    setPage((prev) => ({
      next: data.after,
      posts: after
        ? [...prev.posts, ...data.children.map(toPostListItemProps)]
        : data.children.map(toPostListItemProps),
    }));
  }

  useEffect(() => {
    load(subreddit, undefined);
  }, []);

  const title = posts[0]?.subreddit || `r/${subreddit}`;

  return (
    <>
      <Header title={title} />
      <div>
        {posts.map((p) => (
          <PostListItem key={p.id} {...p} />
        ))}
      </div>
      {next && <LoadMoreButton onClick={() => load(subreddit, next)} />}
    </>
  );
}
