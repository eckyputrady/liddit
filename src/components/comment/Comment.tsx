import { PostBody } from "../postbody/PostBody";
import "./Comment.css";

export interface CommentProps {
  id: string;
  user: string;
  timeAgo: string;
  body: string;
  upvoteCount: number;
  children: CommentProps[];
  hasBottomPadding: boolean;
}

export function Comment(props: CommentProps) {
  return (
    <div
      className={`comment ${
        props.hasBottomPadding ? "" : "comment__noBottomPadding"
      }`}
    >
      <div className="comment--header">
        <div>
          {props.user} • {props.timeAgo}
        </div>
      </div>
      <div className="comment--body">
        <PostBody rawHtml={props.body} />
      </div>
      <div className="comment--actionWrapper">
        <div className="comment--actionWrapper--action">
          <a className="comment--actionWrapper--action--icon">
            <i className="bx bx-upvote" />
          </a>
          <span>{props.upvoteCount}</span>
          <a className="comment--actionWrapper--action--icon">
            <i className="bx bx-downvote" />
          </a>
        </div>
        <div className="comment--actionWrapper--action">
          <a className="comment--actionWrapper--action--icon">
            <i className="bx bx-reply" />
          </a>
          <span>Reply</span>
        </div>
      </div>
      <div className="comment--childrenWrapper">
        {props.children.map((p) => (
          <Comment key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
