import { apiClient } from "./api";
import { Data } from "./types";
import { useQuery, UseQueryResult } from "react-query";
import { useState } from "react";

export function useItems(): UseQueryResult<{ [key: string]: Data[] }> {
//   const [search] = useSearchParams();
  const today = new Date().toISOString().split("T")[0];
  const [, setCompetitions] = useState<{ [key: string]: Data[] }>(
    {}
  );
  const [, setIsLoading] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;
  
  const $API_URL = `https://apiv3.apifootball.com/?action=get_events&from=${today}&to=${today}&timezone=Africa/Dar_es_Salaam&APIkey=${apiKey}`;

  return useQuery(["Data", today], async () => {
    setIsLoading(true);
    const response = await apiClient.get($API_URL);
    const datas = response.data as Data[];

    // Group competitions by league
    const groupedCompetitions = datas.reduce((acc, competition) => {
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
  });
}
