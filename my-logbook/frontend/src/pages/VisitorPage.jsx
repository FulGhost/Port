import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { VisitorLog } from "../components/VisitorLog";
import { Calendar } from "../components/Calendar";
import { CheckBoxes } from "../components/Checkboxes";
import { SearchBar } from "../components/SearchBar";

// VisitorLogs is passed as a property to allow Visitorlog to use the prop
export function VisitorPage({ visitorLogs, setVisitorLogs, getLogs, data, onLogout }) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchText, setSearchText] = useState("");


  const displayedLogs = visitorLogs.filter((visitorLog) => {
  const matchesStatus =
    selectedFilter === "all" || visitorLog.status === selectedFilter;

  const search = searchText.trim().toLowerCase();

  const matchesSearch =
    search === "" ||
    visitorLog.name?.toLowerCase().includes(search) ||
    visitorLog.organisation?.toLowerCase().includes(search);

  return matchesStatus && matchesSearch;
});


  // const displayedLogs =
  //   selectedFilter === "all"
  //     ? visitorLogs
  //     : visitorLogs.filter((visitorLog) => {
  //         return visitorLog.status === selectedFilter;
  //       });

  function getDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function handleDateSelect(date) {
    setSelectedDate(date);
    getLogs(getDateKey(date));
  }

  useEffect(() => {
  getLogs(getDateKey(selectedDate));
}, []);

  return (
    <>
      <Header data={data} onLogout={onLogout}/>

      <div className="page-body flex flex-col md:flex-row">
        <div className="left-side h-auto w-full p-2 md:h-145 md:w-75">
          <div className="bg-amber-100 h-auto min-h-[18rem] mb-4 rounded-lg md:h-75">
            <Calendar onDateSelect={handleDateSelect} selectedDate={selectedDate}/>
          </div>

          <div className="bg-amber-50 h-auto rounded-sm pt-5 pb-5 mt-4 md:h-45 md:pb-0 md:mt-12">
            <CheckBoxes
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          </div>
        </div>

        <div className="right-page-side h-auto w-full flex-1 p-2 min-w-0 overflow-x-hidden md:h-145 md:w-auto md:min-w-8 md:overflow-visible">

          <div className="header-right-side h-auto flex flex-col gap-3 p-2 md:h-30 md:flex-row md:gap-0">

            <div className=" left-side-header w-full md:w-60">
              <h1 className="text-3xl md:text-3xl font-extrabold tracking-tighter text-primary leading-tight">
                Visitor Activity
              </h1>
              <p>Tuesday, 7th April 2026</p>
            </div>
            
            <SearchBar searchText={searchText} setSearchText={setSearchText}/>
            
          </div>

          <div className="detail-header h-auto min-h-9 w-full min-w-0 mb-0.5 grid grid-cols-7 gap-1 pr-2 pl-2 items-center overflow-hidden md:h-9 md:flex md:justify-between md:gap-0">
            <p className="text-[9px] sm:text-xs md:text-lg font-bold tracking-tighter text-primary leading-none md:leading-tight text-center min-w-0 break-words">
              Visitor Name
            </p>
            <p className="text-[9px] sm:text-xs md:text-lg font-bold tracking-tighter text-primary leading-none md:leading-tight text-center min-w-0 break-words">
              Company or From
            </p>
            <p className="text-[9px] sm:text-xs md:text-lg font-bold tracking-tighter text-primary leading-none md:leading-tight text-center min-w-0 break-words">
              Purpose
            </p>
            <p className="text-[9px] sm:text-xs md:text-lg font-bold tracking-tighter text-primary leading-none md:leading-tight text-center min-w-0 break-words">
              Time In
            </p>
            <p className="text-[9px] sm:text-xs md:text-lg font-bold tracking-tighter text-primary leading-none md:leading-tight text-center min-w-0 break-words">
              Contact
            </p>
            <p className="text-[9px] sm:text-xs md:text-lg font-bold tracking-tighter text-primary leading-none md:leading-tight text-center min-w-0 break-words">
              Tag Num
            </p>
            <p className="text-[9px] sm:text-xs md:text-lg font-bold tracking-tighter text-primary leading-none md:leading-tight text-center min-w-0 break-words">
              Action
            </p>
          </div>

          <div className="body-right-side bg-white rounded-lg h-[60vh] p-1 flex-1 flex-row overflow-auto md:h-100 [&>.details-container]:min-w-[760px] md:[&>.details-container]:min-w-0">
            <VisitorLog
              visitorLogs={displayedLogs}
              setVisitorLogs={setVisitorLogs}
              getLogs={() => getLogs(getDateKey(selectedDate))}
            />
          </div>
        </div>
      </div>
    </>
  );
}
