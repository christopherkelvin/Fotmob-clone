import { NavLink, Outlet, useParams } from "react-router-dom";
import "../css/active.css";
import { useEffect, useState } from "react";
interface Data {
  match_awayteam_name: string;
  match_hometeam_name: string;
  match_time: string;
  team_home_badge: string;
  team_away_badge: string;
}
function Leag() {
  // const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const today = new Date().toISOString().split("T")[0];
  const API_KEY =
    "57f7f89e7a1f77522516238337039068ea330bf010a78517bacf37c1c3c4e487";
  const $API_URL = `https://apiv3.apifootball.com/?action=get_events&league_id=${id}&from=${today}&to=2025-08-01&APIkey=${API_KEY}`;
  const [teams, setTeams] = useState<Data[]>([]);
  useEffect(() => {
    // setIsLoading(true);
    fetch($API_URL)
      .then((response) => response.json())
      .then((data) => {
        // setIsLoading(false);
        setTeams(data);
      });
  }, []);
  const pic = teams.slice(0, 1);
  return (
    <div className="bg-black min-h-screen font-bold">
      <div className="  mx-24 text-white font-walsheim">
        <div className="bg-[#1d1d1d]  rounded-2xl ">
          <div className="flex flex-col p-14 pt-4 pb-0">
            {pic.map((leg, index) => {
              return (
                <>
                  <div key={index} className="flex">
                    <img
                      src={leg.league_logo}
                      className="w-32 h-32 rounded-full"
                      alt=""
                    />
                    <div>
                      <h2 className="text-3xl font-roboto pt-8 pl-4">
                        {leg.league_name}
                      </h2>
                      <h3 className="font-roboto font-semibold pt-0.5 pl-6 text-[#9f9d99]">
                        {leg.country_name}
                      </h3>
                    </div>
                  </div>
                </>
              );
            })}
            <div className=" flex pt-7  gap-20 font-walsheim font-bold ">
              <NavLink className="pb-3 text-[#9f9d99]" to="overview">
                Overview
              </NavLink>
              <NavLink className="pb-3 text-[#9f9d99]" to="table">
                Table
              </NavLink>
              <NavLink className="pb-3 text-[#9f9d99]" to="matches">
                Matches
              </NavLink>
              <NavLink className="pb-3 text-[#9f9d99]" to="stats">
                Stats
              </NavLink>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
export default Leag;
