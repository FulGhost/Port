import axios from 'axios';
import { getValidAuthToken } from '../utils/jwtDecoder.js';

export function VisitorLog({ visitorLogs = [], getLogs}) {
  return (
    <>
      {visitorLogs.map((visitorLog) => {
        return (
          <div
            key={visitorLog.id}
            className="details-container !min-w-0 border-b text-gray-900 h-auto min-h-18 grid grid-cols-7 gap-1 items-center mb-1 pl-2 pr-1 md:h-25 md:flex md:justify-between md:gap-0"
          >
            <p className="text-[10px] sm:text-xs md:text-lg font-mono text-center md:text-left min-w-0 break-words leading-tight">{visitorLog.name}</p>
            <p className="text-[10px] sm:text-xs md:text-lg font-mono text-center md:text-left min-w-0 break-words leading-tight">{visitorLog.organisation}</p>
            <p className="text-[10px] sm:text-xs md:text-lg font-mono text-center md:text-left min-w-0 break-words leading-tight">{visitorLog.nature}</p>
            <p className="text-[10px] sm:text-xs md:text-lg font-mono text-center md:text-left min-w-0 break-words leading-tight md:mr-2">
              {new Date(visitorLog.timeIn).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </p>
            <p className="text-[10px] sm:text-xs md:text-lg font-mono text-center md:text-left min-w-0 break-words leading-tight">{visitorLog.contact}</p>
            <p className="text-[10px] sm:text-xs md:text-lg font-mono text-center md:text-left min-w-0 break-words leading-tight md:w-10">{visitorLog.tag}</p>
            <button
              className="rounded-sm font-mono text-[10px] sm:text-xs md:text-base w-full border h-9 cursor-pointer hover:bg-lime-200 active:bg-black active:text-white md:w-25 md:h-12"
                // When toggling status we send a protected PUT request.
                // Use `getValidAuthToken()` to ensure we attach a valid token
                // (cleans expired tokens and prefers admin token over temp).
              onClick={async () => {
                await axios.put(`/api/visitorlogs/${visitorLog.id}`,{},{headers: {Authorization: `Bearer ${getValidAuthToken()}`}})
                getLogs()
              }}
            >
              {visitorLog.status}
            </button>
          </div>
        );
      })}
    </>
  );
}
