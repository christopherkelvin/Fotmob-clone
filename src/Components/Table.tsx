import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Data } from "../core/types";
const headings = [
  { title: "#" },
  { title: "" },
  { title: "Teams" },
  { title: "PL" },
  { title: "W" },
  { title: "D" },
  { title: "L" },
  { title: "+/-" },
  { title: "GD" },
  { title: "PTS" },
];
function Table() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { id } = useParams();
  const [standings, setStandings] = useState<Data[]>([]);
    const $STANDARD_URL = `https://apiv3.apifootball.com/?action=get_standings&league_id=${id}&APIkey=${API_KEY}`;
     useEffect(() => {
       fetch($STANDARD_URL)
         .then((response) => response.json())
         .then((data) => {
           setStandings(data);
         });
     });

    return (
      <>
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
export default Table;
