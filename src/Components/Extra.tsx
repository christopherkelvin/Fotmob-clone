import { useEffect, useState } from "react";
import Loader from "./Loader";
interface Data {
  overall_league_position: number;
  team_name: string;
  overall_league_payed: number;
  overall_league_GF: number;
  overall_league_PTS: number;
  team_badge: string;
}
function Extra() {
  const $API_KEY =
    "57f7f89e7a1f77522516238337039068ea330bf010a78517bacf37c1c3c4e487";
  const $API_URL =
    "https://apiv3.apifootball.com/?action=get_standings&league_id=";
  const $LEAGUE_ID = "152&APIkey=";
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch(`${$API_URL}${$LEAGUE_ID}${$API_KEY}`);
      const datas = (await response.json()) as Data[];
      setData(datas);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="2xl:w-1/4 xl:block md:hidden max-sm:hidden ">
        <div className="h-auto font overflow-hidden font-walsheim text-white  bg-[#262626] 2xl:ml-0 xl:ml-3 mb-3 mr-10 mt-3 rounded-xl">
          <div className="p-4 bg-[#1d1d1d]">
            <h2 className=" font-bold text-gray-300 cursor-pointer">
              Premier League
            </h2>
            <p className=" font-pacifico text-sm mb-4">England</p>
          </div>
          <hr className="w-full" />
          <div className="">
            <table className=" ml-3  font-roboto ">
              <thead>
                <tr className="grid grid-cols-standings">
                  <td> #</td>
                  <td></td>
                  <td> Team</td>
                  <td className=""> PL</td>
                  <td> GD</td>
                  <td> PTS</td>
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
                          className=" h-5 ml-2 mt-1"
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
              {isLoading && <Loader/>}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default Extra;
