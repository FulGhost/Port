import { Link } from 'react-router';
import { Dashboard } from './Dashboard';
import "./Header.css";

export function Header({data}) {
  return (
    <>
      <nav className="bg-white/30 backdrop-blur-xl border border-white/40 flex justify-between items-center p-6 z-50 fixed top-0 w-full">
          <div className=" left-side ml-10 text-xl font-bold tracking-tighter text-blue-950">
            <Dashboard />
            Hello{" "}
            <span className="inline-block animate-pulse bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 bg-clip-text font-black text-transparent drop-shadow-sm transition-transform duration-300 hover:scale-110">
              {data.username}
            </span>
          </div>
        <div className=" middle-section">
          <Link to={'/logpage'} className="inline-block cursor-pointer rounded-full px-3 py-1.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition-all duration-200 hover:bg-blue-950 hover:text-white active:scale-95">Log In</Link>

          <Link to={'/visitorlog'} className="inline-block ml-7 cursor-pointer rounded-full px-3 py-1.5 text-sm font-bold uppercase tracking-wide text-slate-600 transition-all duration-200 hover:bg-blue-950 hover:text-white active:scale-95">Visitors</Link>
        </div>
        <div className='right-side'>
          
        </div>
      </nav>
    </>
  );
}
