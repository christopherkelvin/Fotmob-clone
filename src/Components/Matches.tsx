import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface Data {
  match_awayteam_name: string;
  match_hometeam_name: string;
  match_time: string;
}
function Matches() {
  const today = new Date().toISOString().split("T")[0];
  const API_KEY =
    "57f7f89e7a1f77522516238337039068ea330bf010a78517bacf37c1c3c4e487";
  const { id } = useParams();
  const [matches, setMatches] = useState<Data[]>([]);
  const [bydate, setBydate] = useState<Data[]>();
  const $EVENT_URL = `https://apiv3.apifootball.com/?action=get_events&from=${today}&to=2025-08-18&league_id=${id}&APIkey=${API_KEY}`;
  useEffect(() => {
    fetch($EVENT_URL)
      .then((response) => response.json())
      .then((data) => {
        const groupedCompetitions = data.reduce(
          (acc: { [x: string]: any[] }, bydate: { match_date: any }) => {
            const key = `${bydate.match_date}`;
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(bydate);
            return acc;
          },
          {} as { [key: string]: Data[] }
        );
        setMatches(groupedCompetitions);
      });
  });
  return (
    <>
      <div className="mt-6 bg-[#1d1d1d] rounded-xl p-7  text-white pl-12">
        {Object.keys(matches).map((matchkeys, index) => (
          <>
            <div key={index}>
              <h2 className="bg-[#333333] py-2 pl-6 font-pacifico rounded-md">
                {matchkeys}
              </h2>
              {matches[matchkeys].map((match, matchIndex) => (
                <div
                  key={matchIndex}
                  className="font-roboto grid grid-cols-custom py-2 cursor-pointer hover:bg-[#333333]"
                >
                  <div className=" justify-end mr-3 flex">
                    <div className="mr-2">{match.match_hometeam_name}</div>
                    <img
                      src={match.team_home_badge}
                      className="h-6 w-6 rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="">{match.match_time}</div>
                  <div className="flex">
                    <img
                      src={match.team_away_badge}
                      className="h-6 w-6 rounded-full"
                      alt=""
                    />
                    <div className="ml-2">{match.match_awayteam_name}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
    </>
  );
}
export default Matches;
