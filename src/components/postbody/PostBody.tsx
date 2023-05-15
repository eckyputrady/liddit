import "./PostBody.css";

export interface PostBodyProps {
  rawHtml: string;
}

export function PostBody(props: PostBodyProps) {
  return (
    <div
      className="postBody"
      dangerouslySetInnerHTML={{ __html: props.rawHtml }}
    />
  );
}
