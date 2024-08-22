import { apiClient } from "./api";
import { Data } from "./types";
import { useQuery, UseQueryResult } from "react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";


const getMatchaEvents = () => {
  
}

export function useItems(): UseQueryResult<{ [key: string]: Data[] }> {
  const today = new Date().toISOString().split("T")[0];
  const [, setCompetitions] = useState<{ [key: string]: Data[] }>(
    {}
  );
  const [, setIsLoading] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;
  
  const $API_URL = `https://apiv3.apifootball.com/?action=get_events&from=${today}&to=${today}&timezone=Africa/Dar_es_Salaam&APIkey=${apiKey}`;
  const [search] = useSearchParams();
  const [sort] = useSearchParams();
  return useQuery([today,search.toString()], async () => {
    setIsLoading(true);
    const response = await apiClient.get($API_URL, {
      params: search,
    },
    );
    let datas = response.data;

    if (search.toString()) {
      const searchValue:string = search.get("filter")?.toLowerCase();
      datas = datas.filter(
        (competition: {
          league_name: string;
          country_name: string;
          match_awayteam_name: string;
          match_hometeam_name: string;
        }) =>
          competition.match_awayteam_name.toLowerCase().includes(searchValue) ||
          competition.match_hometeam_name.toLowerCase().includes(searchValue) ||
          competition.country_name.toLowerCase().includes(searchValue) ||
          competition.league_name.toLowerCase().includes(searchValue)
      );
    }
    if (sort.toString()) {
      const value = sort.get("sort")
      switch (value) {
        case 'Finished':
         datas = datas.filter(
           (competition: { match_status: string }) =>
             competition.match_status === "Finished"
         );
          break;
        case "LiveTv":
          datas = datas.filter(
            (competition: { match_live: string }) =>
              competition.match_live === '1'
          );
      }
    }

    
const groupedCompetitions = datas.reduce((acc: { [x: string]: []; }, competition: { country_name: string; league_name: string; }) => {
      const key = `${competition.country_name} - ${competition.league_name}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(competition);
      return acc;
    }, {} as { [key: string]: Data[] });

    setCompetitions(groupedCompetitions);
    setIsLoading(false);
    return groupedCompetitions;
  }, {
    staleTime: 120000
  });
}
