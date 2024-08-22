const BASE_URL = import.meta.env.VITE_BASE_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

export const getMatchEvents =async (fromDate:string, to?:string) => {
    const res = await fetch(`${BASE_URL}?action=get_events&from=${fromDate}&to=${to ?? fromDate}&timezone=Africa/Dar_es_Salaam&APIkey=${API_KEY}`);
    if(!res.ok) throw new Error(res.statusText);
    return await res.json() ;
}


// ..other
