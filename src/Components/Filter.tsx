import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-light-cyan/theme.css";

function Filter() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [liveActive, setLiveActive] = useState(false);
  const [finishActive, setFinishActive] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const reset = () => {
    setLiveActive(false);
    setFinishActive(false);
    searchParams.delete("sort");
    searchParams.delete("filter");
    setSearchParams(searchParams, { replace: true });
  };

  useEffect(() => {
    const sortParam = searchParams.get("sort");
    setLiveActive(sortParam === "1");
    setFinishActive(sortParam === "Finished");
  }, [searchParams]);

  const filterLiveMatch = () => {
    const isActive = !liveActive;
    setLiveActive(isActive);
    setFinishActive(false);
    searchParams.set("sort", isActive ? "1" : "");
    setSearchParams(searchParams, { replace: true });
  };

  const filterFinishedMatch = () => {
    const isActive = !finishActive;
    setFinishActive(isActive);
    setLiveActive(false);
    searchParams.set("sort", isActive ? "Finished" : "");
    setSearchParams(searchParams, { replace: true });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text.length === 0) {
      searchParams.delete("filter");
    } else {
      searchParams.set("filter", text);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <>
      <div className="w-full">
        {isVisible && (
          <PrimeReactProvider>
            <div className="fixed inset-1/3">
              <Calendar
                value={date}
                onChange={(e) => setDate(date)}
                inline
                showWeek
              />
            </div>
          </PrimeReactProvider>
        )}
        <div className="bg-[#1d1d1d] mt-3 rounded-xl h-auto">
          <div className="flex justify-center my-3 relative">
            <span className="hover:bg-white cursor-pointer fa-solid fa-chevron-left absolute top-1 bg-slate-500/30 rounded-full w-8 h-8 left-5 pt-2 pl-2.5"></span>
            <h1
              onClick={toggleVisibility}
              className="text-white cursor-pointer bg-slate-500/30 px-3 py-1.5 rounded-md"
            >
              Today
              <i
                className={`fa-solid fa-caret-down ml-2 ${
                  isVisible ? "rotate-180" : "rotate-0"
                }`}
              ></i>
            </h1>
            <span className="hover:bg-white cursor-pointer fa-solid fa-chevron-right absolute top-1 bg-slate-500/30 rounded-full w-8 h-8 right-5 pt-2 pl-2.5"></span>
          </div>
          <hr className="border-t-2 border-black w-full" />
          <div className="mt-2">
            <button
              onClick={reset}
              className="ml-3 mr-3 py-2 px-4 text-sm font-walsheim text-white rounded-2xl bg-slate-500/30 hover:bg-slate-600/30"
            >
              All
            </button>
            <button
              onClick={filterLiveMatch}
              className={`ml-3 mr-3 py-2 px-4 text-sm rounded-2xl font-walsheim ${
                liveActive
                  ? "text-black bg-white font-bold"
                  : "text-white  bg-slate-500/30 hover:bg-slate-600/30"
              }`}
            >
              On Going
            </button>
            <button
              onClick={filterFinishedMatch}
              className={`ml-3 mr-3 py-2 px-4 text-sm font-walsheim rounded-2xl ${
                finishActive
                  ? "text-black bg-white font-bold"
                  : "text-white  bg-slate-500/30 hover:bg-slate-600/30"
              }`}
            >
              Finished
            </button>
            <span className="inline-block mb-6">
              <input
                type="text"
                onChange={onChange}
                className="bg-slate-900/40 text-white font-dancing pl-6 py-1 rounded-2xl"
                placeholder="Filter ...."
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
