import "./Header.css";

export function Header() {
  return (
    <div className="header">
      <div className="header--logo">LOGO</div>
      <nav className="header--nav">
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">Documentation</a>
        <a href="#">Pricing</a>
      </nav>
      <div className="header--cta">
        <button>Open Dashboard</button>
      </div>
    </div>
  );
}
