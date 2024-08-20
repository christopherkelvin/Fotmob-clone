import { Link, useSearchParams } from "react-router-dom";
import { Calendar } from "react-calendar";
import "../css/active.css";
import Loader from "./Loader";
import { useItems } from "../core/hooks";
import { useState } from "react";

const Main: React.FC = () => {
  const { data: competitions, isLoading} = useItems();
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useSearchParams();

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

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const tags = [
    { title: "All" },
    { title: "On going", link: "/ongoing" },
    { title: "By Time", link: "" },
  ];

  return (
    <>
      {isVisible && (
        <Calendar
          value={new Date()}
          className="bg-white fixed inset-1/3 rounded-md overflow-hidden h-72"
        />
      )}
      <div className="flex flex-col 2xl:ml-9 2xl:xl:w-1/2 sm:md:lg:w-auto sm:ml-2 xl:ml-3 md:mx-20 xl:mx-6">
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

        {isLoading && <Loader />}

        {!isLoading &&
          competitions &&
          Object.keys(competitions).map((leagueKey, index) => {
            const id = competitions[leagueKey];
            return (
              <div
                key={index}
                className="flex flex-col bg-[#1d1d1d] mt-7 rounded-xl overflow-hidden font-dancing"
              >
                <Link
                  to={`league/${id[0].league_id}/${leagueKey}`}
                  className="py-3 w-full hover:underline text-center text-white bg-[#262626] cursor-pointer"
                >
                  {leagueKey}
                </Link>
                {competitions[leagueKey].map((competition, compIndex) => (
                  <div className="ml-10" key={compIndex}>
                    <div className="grid grid-cols-3 items-center text-white font-roboto">
                      <div className="flex py-2">
                        <img
                          className="w-6 h-6 rounded-full mr-3"
                          src={competition.team_home_badge}
                          alt=""
                        />
                        <span>{competition.match_hometeam_name}</span>
                      </div>
                      <div className="flex">
                        {!competition.match_status ? (
                          <span className="text-center ml-20">
                            {competition.match_time}
                          </span>
                        ) : competition.match_status === "Postponed" ? (
                          <div className="flex flex-col ml-19">
                            <span className="text-center line-through">
                              {competition.match_time}
                            </span>
                            <span className="text-gray-400 text-xs">
                              {competition.match_status}
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col ml-19">
                            <span className="text-center">
                              {competition.match_hometeam_score} -
                              {competition.match_awayteam_score}
                            </span>
                            <span className="text-xs">
                              {competition.match_status}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex">
                        <img
                          src={competition.team_away_badge}
                          alt=""
                          className="w-6 h-6 rounded-full mr-3"
                        />
                        <span>{competition.match_awayteam_name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Main;
