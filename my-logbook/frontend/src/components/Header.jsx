import { Link } from 'react-router';
import "./Header.css";

export function Header() {
  return (
    <>
      <nav className="bg-white/30 backdrop-blur-xl border border-white/40 flex justify-between items-center p-6 z-50 fixed top-0 w-full">
          <div className=" left-side ml-10 text-xl font-bold tracking-tighter text-blue-950">Andy-Fidel Portal</div>
        <div className=" middle-section">
          <Link to={'/landingpage'} className="inline-block cursor-pointer hover:text-violet-400 hover:underline active:opacity-75 font-semibold mr-10">Home</Link>

          <Link to={'/'} className="inline-block cursor-pointer hover:text-violet-400 hover:underline active:opacity-75 font-semibold">Log In</Link>

          <Link to={'/visitor'} className="inline-block ml-7 cursor-pointer hover:text-violet-400 hover:underline active:opacity-75 font-semibold">Visitors</Link>
        </div>
        <div className='right-side'>
          
        </div>
      </nav>
    </>
  );
}
