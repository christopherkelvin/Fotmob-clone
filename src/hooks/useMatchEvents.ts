import {useQuery} from "react-query";
import {Match} from "../types";
import {getMatchEvents} from "../api";


interface UseMatchEventsOptions {
    from?:string, to?:string;
    onSuccess?: (matchEvents: Match[]) => void
}

export const useMatchEvents = (options?:UseMatchEventsOptions) => {
    const defaultFrom = options?.from ?? new Date().toISOString().split("T")[0];
    return useQuery<Match[]>({
        queryKey: ["match-events"],
        queryFn: () => getMatchEvents(defaultFrom, options?.to),
        onSuccess: options?.onSuccess,
    })
}
