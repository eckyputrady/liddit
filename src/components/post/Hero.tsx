import { PostBody } from "../postbody/PostBody";
import "./Hero.css";

export interface PostHeroProps {
  id: string;
  subreddit: string;
  user: string;
  timeAgo: string;
  title: string;
  body: string;
  upvoteCount: number;
  commentCount: number;
}

export function PostHero(props: PostHeroProps) {
  return (
    <div className="postHero">
      <div className="postHero--header">
        <div>
          <div>{props.subreddit}</div>
          <div>
            {props.user} • {props.timeAgo}
          </div>
        </div>
      </div>
      <div>
        <h1>{props.title}</h1>
        <PostBody rawHtml={props.body} />
      </div>
      <div className="postHero--actionWrapper">
        <div className="postHero--actionWrapper--action">
          <a className="postHero--actionWrapper--action--icon">
            <i className="bx bx-upvote" />
          </a>
          <span>{props.upvoteCount}</span>
          <a className="postHero--actionWrapper--action--icon">
            <i className="bx bx-downvote" />
          </a>
        </div>
        <div className="postHero--actionWrapper--action">
          <a className="postHero--actionWrapper--action--icon">
            <i className="bx bx-comment" />
          </a>
          <span>{props.commentCount}</span>
        </div>
      </div>
    </div>
  );
}
