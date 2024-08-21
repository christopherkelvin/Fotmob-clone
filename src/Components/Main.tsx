import { Link } from "react-router-dom";
import "../css/active.css";
import Loader from "./Loader";
import { useItems } from "../core/hooks";
import Filter from "./Filter";
const Main: React.FC = () => {
  const { data: competitions, isLoading} = useItems();
  return (
    <>
      <div className=" mt-20">
        <Filter />
        <div className="flex flex-col ">
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
      </div>
    </>
  );
};

export default Main;
