import "./Header.css";

export function Header(props: { title: string }) {
  // TODO: implement Vertical dots and search later
  return (
    <div className="header">
      <div>
        <a>
          <i className="bx bx-dots-vertical" />
        </a>
      </div>
      <div>{props.title}</div>
      <div>
        <a>
          <i className="bx bx-search" />
        </a>
      </div>
    </div>
  );
}
