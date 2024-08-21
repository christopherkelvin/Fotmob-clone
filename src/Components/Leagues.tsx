import { useEffect, useState } from "react";
import "../css/toggle.css";
import { Data } from "../core/types";
function Leagues() {
  const [isVisible, setIsVisible] = useState(false);
  const [results, setResults] = useState<Data[]>([]);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const [isLoading, setIsLoading] = useState(false);
   const apiKey = import.meta.env.VITE_API_KEY;
  const $API_URL =
    "https://apiv3.apifootball.com/?action=get_countries&APIkey=";
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${$API_URL}${apiKey}`);
      const datas = (await response.json()) as Data[];
      setResults(datas);
      setData(datas);
      setIsLoading(false);
    };
    fetchData();
  }, [$API_URL,apiKey]);
  const Filter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResults(data.filter(result => result.country_name.toLowerCase().includes(e.target.value.toLowerCase())));
  }
  return (
    <>
      <div className="h-auto block  p-4 font-walsheim text-white bg-[#1d1d1d] xl:ml-10 2xl:ml-24 md:ml-2 mt-3 rounded-xl">
        <h2
          className=" font-bold ml-2 mb-2 text-gray-300 cursor-pointer"
          onClick={toggleVisibility}
        >
          {isVisible ? "Hide" : "Show"} All Leagues
          <i
            className={`fa-solid fa-caret-down ml-2 transition-all duration-500 ${
              isVisible ? " rotate-180" : "rotate-0"
            }`}
          ></i>
        </h2>

        <span className=" mb-6 ">
          <input
            type="text"
            className={`bg-slate-900/40 xl:w-full 2xl:w-3/4 mt-3 2xl:ml-4 font-dancing h-6 pl-7 py-1 rounded-2xl ${
              isVisible ? "expand" : "collapse"
            }`}
            onChange={Filter}
            placeholder="Filter ...."
          />
        </span>
        <div className="">
          <div className="grid grid-cols-3 gap-4">
            <div className=" ml-2 mt-4">
              {isLoading && (
                <div className="">
                  <div className=" ml-8 mt-2">
                    <span className="loader"></span>
                  </div>
                </div>
              )}
              {!isLoading &&
                results.map((result, index) => (
                  <div
                    key={index}
                    className={`content-container ${
                      isVisible ? "expand" : "collapse"
                    }`}
                  >
                    <div className="grid xl:grid-cols-2 2xl:grid-cols-nation 2xl:ml-4 mb-2">
                      <img
                        src={result.country_logo}
                        className="h-4 w-4 mt-1 rounded-full "
                        alt=""
                      />
                      <p className="pl-2 font-roboto text-md">
                        {result.country_name}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Leagues;
