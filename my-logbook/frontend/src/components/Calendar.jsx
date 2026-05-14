import { useState } from "react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
});

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getMonthDays(displayDate) {
  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const totalDays = new Date(year, month + 1, 0).getDate();
  const days = [];

  for (let i = 0; i < firstDay.getDay(); i += 1) {
    days.push(null);
  }

  for (let day = 1; day <= totalDays; day += 1) {
    days.push(new Date(year, month, day));
  }

  return days;
}

export function Calendar({ selectedDate, onDateSelect }) {
  const today = new Date();
  const [displayDate, setDisplayDate] = useState(selectedDate || today);
  const [activeDate, setActiveDate] = useState(selectedDate || today);
  const monthDays = getMonthDays(displayDate);
  const todayKey = getDateKey(today);
  const activeDateKey = getDateKey(activeDate);

  function handleMonthChange(direction) {
    setDisplayDate((currentDate) => {
      return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + direction,
        1
      );
    });
  }

  function handleTodayClick() {
    setDisplayDate(today);
    setActiveDate(today);
    onDateSelect?.(today);
  }

  function handleDateClick(date) {
    setActiveDate(date);
    onDateSelect?.(date);
  }

  return (
    <div className="h-full rounded-sm bg-amber-100 p-3 font-mono text-gray-900">
      <div className="mb-2 flex items-center justify-between">
        <button
          className="h-8 w-8 rounded-sm border border-gray-400 bg-amber-50 text-lg leading-none cursor-pointer hover:bg-lime-200 active:bg-black active:text-white"
          onClick={() => handleMonthChange(-1)}
          type="button"
        >
          {"<"}
        </button>

        <div className="text-center">
          <h2 className="text-base font-extrabold tracking-tight">
            {monthFormatter.format(displayDate)}
          </h2>
          <button
            className="mt-1 rounded-sm border border-gray-400 bg-amber-50 px-2 py-0.5 text-xs cursor-pointer hover:bg-lime-200 active:bg-black active:text-white"
            onClick={handleTodayClick}
            type="button"
          >
            Today
          </button>
        </div>

        <button
          className="h-8 w-8 rounded-sm border border-gray-400 bg-amber-50 text-lg leading-none cursor-pointer hover:bg-lime-200 active:bg-black active:text-white"
          onClick={() => handleMonthChange(1)}
          type="button"
        >
          {">"}
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold">
        {weekDays.map((day) => {
          return (
            <div key={day} className="py-1">
              {day}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {monthDays.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="h-7" />;
          }

          const dateKey = getDateKey(date);
          const isToday = dateKey === todayKey;
          const isActive = dateKey === activeDateKey;

          return (
            <button
              key={dateKey}
              className={`h-7 rounded-sm border text-sm cursor-pointer hover:bg-lime-200 active:bg-black active:text-white ${
                isActive
                  ? "border-black bg-gray-900 text-white"
                  : isToday
                    ? "border-lime-500 bg-lime-100"
                    : "border-transparent bg-amber-50"
              }`}
              onClick={() => handleDateClick(date)}
              type="button"
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
