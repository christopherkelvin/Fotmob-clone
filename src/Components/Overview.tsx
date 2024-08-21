import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Data } from "../core/types";
const headings = [
  { title: "#" },
  { title: ""},
  { title: "Teams" },
  { title: "PL" },
  { title: "W" },
  { title: "D" },
  { title: "L" },
  { title: "+/-" },
  { title: "GD" },
  { title: "PTS" },
];
function Overview() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const today = new Date().toISOString().split("T")[0];
  const API_KEY = import.meta.env.VITE_API_KEY;
  const $API_URL = `https://apiv3.apifootball.com/?action=get_events&league_id=${id}&from=${today}&to=2025-08-01&APIkey=${API_KEY}`;
  const $STANDARD_URL = `https://apiv3.apifootball.com/?action=get_standings&league_id=${id}&APIkey=${API_KEY}
`;
  const [teams, setTeams] = useState<Data[]>([]);
  const [standings, setStandings] = useState<Data[]>([]);
  useEffect(() => {
    setIsLoading(true);
    fetch($API_URL)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setTeams(data);
      });
  }, [$API_URL, API_KEY]);

  useEffect(() => {
    fetch($STANDARD_URL)
     .then((response) => response.json())
     .then((data) => {
        setStandings(data);
      });
  })

  const tem = teams.slice(0, 3);
  return (
    <>
      <div className=" mt-6 bg-[#1d1d1d] rounded-xl p-10 ">
        <h1 className=" float-left">Matches</h1>
        <Link
          to={`/league/${id}/matches`}
          className=" float-right hover:text-[#61df6e]"
        >
          All matches
        </Link>
        <div className="flex flex-row justify-between w-full">
          {!isLoading &&
            tem.map((team, index) => {
              return (
                <div
                  key={index}
                  className="flex relative flex-row mt-14 h-36 w-80 overflow-hidden border-[#9f9d99] hover:opacity-50 cursor-pointer border rounded-lg"
                >
                  <div>
                    <div className="">
                      <img
                        src={team.team_home_badge}
                        className=" absolute left-5 top-6 h-16 w-16 rounded-full"
                        alt=""
                      />
                    </div>
                    <div className=" text-sm absolute left-6 bottom-3">
                      {team.match_hometeam_name}
                    </div>
                  </div>
                  <div className=" absolute top-14 left-32">
                    {team.match_time}
                  </div>
                  <div>
                    <div className=" ">
                      <img
                        src={team.team_away_badge}
                        className=" absolute h-14 w-14 right-16 top-9 rounded-full"
                        alt=""
                      />
                    </div>
                    <div className=" absolute text-sm right-4 bottom-3">
                      {team.match_awayteam_name}
                    </div>
                  </div>
                </div>
              );
            })}
          {isLoading && (
            <>
              <span className="loader"></span>
            </>
          )}
        </div>
      </div>
      <div className="mt-6 bg-[#1d1d1d] w-fit rounded-xl p-7 font-walsheim text-[#dddaf2]">
        <table>
          <thead>
            <tr className="grid grid-cols-stading">
              {headings.map((heading, index) => {
                return (
                  <th className=" text-left" key={index}>
                    {heading.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {/* TODO: Fetch and display data from API */}
            {standings.map((standing, index) => (
              <tr key={index} className="grid grid-cols-stading">
                <td>{standing.overall_league_position}</td>
                <td>
                  {" "}
                  <img
                    src={standing.team_badge}
                    className=" h-5 ml-2 mt-1"
                    alt=""
                  />
                </td>
                <td>{standing.team_name}</td>
                <td>{standing.overall_league_payed}</td>
                <td>{standing.overall_league_W}</td>
                <td>{standing.overall_league_D}</td>
                <td>{standing.overall_league_L}</td>
                <td>
                  {standing.overall_league_GF}-{standing.overall_league_GA}
                </td>
                <td>{standing.overall_league_GF}</td>
                <td>{standing.overall_league_PTS}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Overview;
