import { useState } from "react";
import { Calendar } from "react-calendar";
import { useSearchParams } from "react-router-dom";
function Filter() {
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useSearchParams();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const tags = [
    { title: "All" },
    { title: "On going", link: "/ongoing" },
    { title: "By Time", link: "" },
  ];
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text.length === 0) {
      search.delete("filter");
      setSearch(search, { replace: true });
    } else {
      search.set("filter", text);
      setSearch(search, { replace: true });
    }
  };
  return (
    <>
      <div className=" w-full">
          {isVisible && (
            <Calendar
              value={new Date()}
              className="bg-white fixed inset-1/3 rounded-md overflow-hidden h-72"
            />
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
              {tags.map((tag, index) => (
                <button
                  key={index}
                  className="ml-3 mr-3 py-2 px-4 text-sm font-walsheim text-white rounded-2xl bg-slate-500/30 hover:bg-slate-600/30"
                >
                  {tag.title}
                </button>
              ))}
              <span className="inline-block mx-8 mb-6">
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
