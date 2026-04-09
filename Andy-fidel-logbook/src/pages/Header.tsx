import { Link } from 'react-router';
import spiderLogo from '../images/spider.png';
import "./Header.css";

export function Header() {
  return (
    <>
      <nav className="bg-white flex justify-between items-center p-6 z-50 fixed top-0 w-full">
          <div className=" right-side ml-10 text-xl font-bold tracking-tighter text-blue-950">Andy-Fidel Portal</div>
        <div className=" middle-section">
          <Link to={'/'} className="inline-block cursor-pointer hover:text-violet-400 hover:underline active:opacity-75 font-semibold">Log In</Link>
          <Link to={'/visitor'} className="inline-block ml-7 cursor-pointer hover:text-violet-400 hover:underline active:opacity-75 font-semibold">Visitors</Link>
        </div>
        <div className='right-side'>
          <img 
          src={spiderLogo}
          className='h-7 w-7'
          />
        </div>
      </nav>
    </>
  );
}
