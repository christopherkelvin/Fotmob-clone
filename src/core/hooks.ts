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

  const $API_KEY =
    "57f7f89e7a1f77522516238337039068ea330bf010a78517bacf37c1c3c4e487";
  const $API_URL = `https://apiv3.apifootball.com/?action=get_events&from=${today}&to=${today}&timezone=Africa/Dar_es_Salaam&APIkey=${$API_KEY}`;

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