import { Header } from "./Header";

export function VisitorPage() {
  return (
    <>
      <Header />

      <div className="page-body flex ">
        <div className="bg-cyan-500 h-145 w-75 p-2">
          <div className="bg-green-400 h-60 mb-4"></div>
          <div className="bg-amber-50 h-45"></div>
        </div>

        <div className="right-page-side h-145 flex-1 p-2 min-w-8">
          <div className="header-right-side h-30 flex p-2">
            <div className=" left-side-header w-60">
              <h1 className="text-3xl md:text-3xl font-extrabold tracking-tighter text-primary leading-tight">
                Visitor Activity
              </h1>
              <p>Tuesday, 7th April 2026</p>
            </div>
            <div className=" right-side-header flex items-start p-6 flex-1">
              <input
                className="h-12 flex-1 rounded-lg border p-3"
                placeholder="Search Visitor"
              />
              <button className="bg-gray-500 w-30 h-12 ml-1 rounded-lg cursor-pointer hover:opacity-80 active:opacity-100">
                Search
              </button>
            </div>
          </div> 

            <div className="detail-header h-9 mb-0.5 flex justify-between pr-2 pl-2 items-center">
              <p className=" md:text-lg font-bold tracking-tighter text-primary leading-tight">Visitor Name</p>
              <p className=" md:text-lg font-bold tracking-tighter text-primary leading-tight">Company or From</p>
              <p className=" md:text-lg font-bold tracking-tighter text-primary leading-tight">Purpose</p>
              <p className=" md:text-lg font-bold tracking-tighter text-primary leading-tight">Time In</p>
              <p className=" md:text-lg font-bold tracking-tighter text-primary leading-tight">Contact</p>
              <p className=" md:text-lg font-bold tracking-tighter text-primary leading-tight">Tag Num</p>
              <p className=" md:text-lg font-bold tracking-tighter text-primary leading-tight">Action</p>
            </div>

          <div className="body-right-side bg-white rounded-lg h-100 p-1 flex-1 flex-row overflow-y-auto">
          
            <div className="details-container border-b text-gray-900 h-25 flex justify-between items-center mb-1 pl-2 pr-1">
              <p className=" md:text-lg font-mono">Kojo Ampadu</p>
              <p className="md:text-lg font-mono">Saa Company</p>
              <p className="md:text-lg font-mono">Mahup The Place</p>
              <p className="md:text-lg font-mono">7th April, 2026</p>
              <p className="md:text-lg font-mono">0244189091</p>
              <p className="md:text-lg font-mono w-10">10</p>
              <button className=" rounded-sm font-mono w-25 border h-12 cursor-pointer hover:bg-lime-200 active:bg-black active:text-white ">In <br />Building</button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
