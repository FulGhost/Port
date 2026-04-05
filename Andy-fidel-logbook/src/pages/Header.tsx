import "./Header.css";

export function Header() {
  return (
    <>
      <div className="header-container">
        <div className="left-section">
          <h1 className="h1">The Andy-Fidel Portal</h1>
        </div>
        <div className="middle-section">
          <p className="log-in">Log In</p>
          <p className="visitors">Visitors</p>
        </div>
        <div className="right-section">
          <p>right Section</p>
        </div>
      </div>
    </>
  );
}
