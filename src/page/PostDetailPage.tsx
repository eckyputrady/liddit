import { useEffect, useState } from "react";
import { Comment, CommentProps } from "../components/comment/Comment";
import { Header } from "../components/header/Header";
import { PostHero, PostHeroProps } from "../components/post/Hero";
import { Comment as RComment, Post, getComments } from "../services/Reddit";
import { timeDifference } from "../services/Util";
import { LoadMoreButton } from "../components/loadMoreButton/LoadMoreButton";

function decodeHTMLEntities(text: string) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}

function toPostHeroProps({ data }: Post): PostHeroProps {
  return {
    id: data.id,
    subreddit: `r/${data.subreddit}`,
    user: `u/${data.author}`,
    timeAgo: timeDifference(new Date().getTime(), data.created * 1000),
    title: data.title,
    body: decodeHTMLEntities(data.selftext_html || ""),
    upvoteCount: data.score,
    commentCount: data.num_comments,
  };
}

function repliesToCommentProps(rcomment: RComment): CommentProps[] {
  const { data } = rcomment;
  try {
    if (data.replies === "") {
      return [];
    } else {
      return data.replies.data.children.map(toCommentProps);
    }
  } catch (e) {
    console.log(e, rcomment);
    return [];
  }
}

function toCommentProps(rcomment: RComment): CommentProps {
  const { data } = rcomment;
  return {
    id: data.id,
    user: `u/${data.author}`,
    timeAgo: timeDifference(new Date().getTime(), data.created * 1000),
    body: decodeHTMLEntities(data.body_html || ""),
    upvoteCount: data.score,
    children: repliesToCommentProps(rcomment),
    hasBottomPadding: data.depth === 0,
  };
}

export function PostDetailPage() {
  const [{ next, post, comments }, setPage] = useState<{
    next?: string;
    post?: PostHeroProps;
    comments: CommentProps[];
  }>({ comments: [] });

  async function loadPage(after?: string) {
    const [post, comment] = await getComments("139y1vn", undefined, after);
    setPage({
      next: comment.data.after,
      post: toPostHeroProps(post.data.children[0]),
      comments: comment.data.children.map(toCommentProps),
    });
  }

  async function loadComments() {}

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <>
      <Header />
      {post && <PostHero {...post} />}
      {comments.map((c) => (
        <Comment key={c.id} {...c} />
      ))}
      {next && <LoadMoreButton onClick={() => loadPage(next)} />}
    </>
  );
}
