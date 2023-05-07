import "./Header.css";

export function Header() {
  return (
    <div className="header">
      <div>
        <a>
          <i className="bx bx-dots-vertical" />
        </a>
      </div>
      <div>LiteReddit</div>
      <div>
        <a>
          <i className="bx bx-search" />
        </a>
      </div>
    </div>
  );
}
