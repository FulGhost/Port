import { Header } from "./Header";
import logImage from '../images/iuliu-illes-rZiVfk-tg6Y-unsplash.jpg';
import "./HomePage.css";

export function HomePage() {
  return (
    <>
      <Header />

      <div>

        <div className=" inline-block h-124 w-113 ml-15">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-primary leading-tight">
            Visitor <br />
            Registration.
          </h1>
          <p className="text-on-surface-variant text-lg max-w-md leading-relaxed mb-1">
            Welcome to The Andy-Fidel Portal. Please provide your identification
            details to facilitate a secure and seamless entry into our corporate
            facility.
          </p>
          <div>
            <img src={logImage}
            className="h-80 w-110 rounded-sm"
            />
          </div>
        </div>

        <div className="w-220 h-140 pt-5 bg-white absolute right-20 bottom-6 rounded-xl">
          <div className="h-15 pl-12 pr-12">
            <label className="block">Full Name</label>
            <input
              className="border border-gray-300 w-190 h-10 rounded-lg pl-3"
              type="text"
              placeholder="Enter Your Name"
            />
          </div>

          <div className="h-18 pl-12 pr-12 mt-4">
            <label className="block"> Company or Organisation</label>
            <input
              className="border border-gray-300 w-190 h-10 rounded-lg pl-3"
              type="text"
              placeholder="Which Company Are You From"
            />
          </div>

          <div className="h-18 flex pl-12 pr-12 mt-2">
            <div className=" w-100 bg-g">
              <label className="block">Purpose of Visit</label>
               <input
              className="border border-gray-300 w-90 h-10 rounded-lg pl-3"
              type="text"
              placeholder="Which Company Are You From"
            />
            </div>

            <div className=" flex-1">
              <label className="block">Current Time</label>
               <input
              className="border border-gray-300 w-90 h-10 rounded-lg pl-3"
              type="text"
            />
              </div>
          </div>

          <div className="h-18 pl-12 pr-12 mt-2">
            <label className="block">Nature of Visit</label>
            <input
              className="border border-gray-300 w-190 h-10 rounded-lg pl-3"
              type="text"
              placeholder="Narure of Visit"
            />
          </div>

          <div className="h-18 pl-12 pr-12 mt-1">
            <label className="block">Contact Number</label>
            <input
              className="border border-gray-300 w-190 h-10 rounded-lg pl-3"
              type="text"
              placeholder="Narure of Visit"
            />
          </div>

          <div className="h-18 pl-12 pr-12 mt-1">
            <label className="block"> Tag</label>
            <input
              className="border border-gray-300 w-190 h-10 rounded-lg pl-3"
              type="text"
              placeholder="Narure of Visit"
            />
          </div>

          <button className="bg-cyan-700 mt-2 ml-11 h-10 text-white rounded-lg w-190 hover:opacity-90 active:bg-cyan-800">Submit Check-in</button>
        </div>
      </div>
    </>
  );
}
