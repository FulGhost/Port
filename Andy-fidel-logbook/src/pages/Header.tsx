import "./Header.css";

export function Header() {
  return (
    <>
      <nav className="bg-white flex items-center p-7">
          <div className="w-130 ml-10 text-xl font-bold tracking-tighter text-blue-950">Andy-Fidel Portal</div>
        <div className="flex-1 ">
          <p className="inline-block">Log In</p>
          <p className="inline-block ml-7">Visitors</p>
        </div>
      </nav>
    </>
  );
}
