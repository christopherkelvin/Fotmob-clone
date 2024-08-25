import { useEffect, useState } from "react";
import Loader from "./Loader";
import { Data } from "../core/types";
import { ScrollArea } from "./ui/scroll-area";

function Extra() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const $API_URL =
    "https://apiv3.apifootball.com/?action=get_standings&league_id=";
  const $LEAGUE_ID = "152&APIkey=";
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch(`${$API_URL}${$LEAGUE_ID}${apiKey}`);
      const datas = (await response.json()) as Data[];
      setData(datas);
      setIsLoading(false);
    };
    fetchData();
  }, [apiKey]);

  return (
    <div className="fixed hidden lg:block right-0 top-16 2xl:mr-0 xl:mr-3 lg:mr-6 md:mr-10">
      <ScrollArea className="h-[630px] w-full rounded-md p-4">
        <div className="h-auto font overflow-hidden font-walsheim text-white bg-[#262626] rounded-xl">
          <div className="p-4 bg-[#1d1d1d]">
            <h2 className="font-bold text-gray-300 cursor-pointer">
              Premier League
            </h2>
            <p className="font-pacifico text-sm mb-4">England</p>
          </div>
          <hr className="w-full" />
          <div>
            <table className="ml-3 font-roboto">
              <thead>
                <tr className="grid grid-cols-standings">
                  <td>#</td>
                  <td></td>
                  <td>Team</td>
                  <td>PL</td>
                  <td>GD</td>
                  <td>PTS</td>
                </tr>
              </thead>
              {!isLoading &&
                data.map((data, index) => (
                  <tbody key={index}>
                    <tr className="grid grid-cols-standings mb-2">
                      <td>{data.overall_league_position}</td>
                      <td>
                        <img
                          src={data.team_badge}
                          className="h-5 ml-2 mt-1"
                          alt=""
                        />
                      </td>
                      <td>{data.team_name}</td>
                      <td>{data.overall_league_payed}</td>
                      <td>{data.overall_league_GF}</td>
                      <td>{data.overall_league_PTS}</td>
                    </tr>
                  </tbody>
                ))}
              {isLoading && <Loader />}
            </table>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default Extra;
