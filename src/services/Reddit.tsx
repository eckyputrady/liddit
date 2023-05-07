export interface Listing<T> {
  kind: "Listing";
  data: {
    after?: string;
    before?: string;
    children: T[];
  };
}

export interface Post {
  kind: "t3";
  data: {
    author: string;
    id: string;
    selftext_html?: string;
    title: string;
    ups: number;
    downs: number;
    score: number;
    num_comments: number;
    created: number;
    url?: string;
    subreddit: string;
    thumbnail?: string;
    domain?: string;
    preview?: {
      images?: {
        resolutions: {
          url: string;
        }[];
      }[];
    };
  };
}

export interface Comment {
  kind: "t1";
  data: {
    created: number;
    id: string;
    replies: "" | Listing<Comment>;
    author: string;
    body_html: string;
    score: number;
    ups: number;
    down: number;
    depth: number;
  };
}

export async function getPosts(
  subreddit: string,
  type: "new" | "hot" | "best",
  after?: string
): Promise<Listing<Post>> {
  const url = `https://api.reddit.com/r/${subreddit}/${type}?after=${after}`;
  const resp = await fetch(url);
  return await resp.json();
}

export async function getComments(
  postId: string,
  parentId?: string,
  after?: string
): Promise<[Listing<Post>, Listing<Comment>]> {
  const url = parentId
    ? `https://api.reddit.com/morechildren/?link_id=${postId}&comment=${parentId}&after=${after}`
    : `https://api.reddit.com/comments/${postId}?after=${after}`;
  const resp = await fetch(url);
  return await resp.json();
}
