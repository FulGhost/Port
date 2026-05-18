export function VisitorLog({ visitorLogs = [], setVisitorLogs }) {
  function handleSignOut(id) {
    setVisitorLogs((currentLogs) =>
      currentLogs.map((visitorLog) => {
        if (visitorLog.id === id && visitorLog.status === "in-building") {
          return {
            ...visitorLog,
            status: "signed-out",
          };
        }

        return visitorLog;
      }),
    );
  }

  return (
    <>
      {visitorLogs.map((visitorLog) => {
        return (
          <div
            key={visitorLog.id}
            className="details-container border-b text-gray-900 h-25 flex justify-between items-center mb-1 pl-2 pr-1"
          >
            <p className="md:text-lg font-mono">{visitorLog.name}</p>
            <p className="md:text-lg font-mono">{visitorLog.organisation}</p>
            <p className="md:text-lg font-mono">{visitorLog.nature}</p>
            <p className="md:text-lg font-mono">
              {new Date(visitorLog.timeIn).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </p>
            <p className="md:text-lg font-mono">{visitorLog.contact}</p>
            <p className="md:text-lg font-mono w-10">{visitorLog.tag}</p>
            <button
              className="rounded-sm font-mono w-25 border h-12 cursor-pointer hover:bg-lime-200 active:bg-black active:text-white"
              onClick={() => handleSignOut(visitorLog.id)}
              disabled={visitorLog.status === "signed-out"}
            >
              {visitorLog.status === "in-building"
                ? "In Building"
                : "Signed Out"}
            </button>
          </div>
        );
      })}
    </>
  );
}
