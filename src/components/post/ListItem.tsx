import "./ListItem.css";
import { Link } from "react-router-dom";

export interface PostListItemProps {
  id: string;
  link: string;
  subreddit: string;
  timeAgo: string;
  title: string;
  upvoteCount: number;
  commentCount: number;
  previewImageUrl?: string;
  previewImageSubtitle?: string;
}

export function PostListItem(props: PostListItemProps) {
  return (
    <div className="listItem">
      <div className="listItem--title--img">
        {props.previewImageUrl && <img src={props.previewImageUrl} />}
        {props.previewImageUrl && props.previewImageSubtitle && (
          <div className="listItem--title--img--subtitle">
            {props.previewImageSubtitle}
          </div>
        )}
      </div>
      <div className="listItem--header">
        <span>{props.subreddit}</span>
        <span>•</span>
        <span>{props.timeAgo}</span>
      </div>
      <div className="listItem--title">
        <Link to={props.link}>{props.title}</Link>
      </div>
      <div className="listItem--actionWrapper">
        <div className="listItem--actionWrapper--action">
          <a className="listItem--actionWrapper--action--icon">
            <i className="bx bx-upvote" />
          </a>
          <span>{props.upvoteCount}</span>
          <a className="listItem--actionWrapper--action--icon">
            <i className="bx bx-downvote" />
          </a>
        </div>
        <div className="listItem--actionWrapper--action">
          <a className="listItem--actionWrapper--action--icon">
            <i className="bx bx-comment" />
          </a>
          <span>{props.commentCount}</span>
        </div>
      </div>
    </div>
  );
}
