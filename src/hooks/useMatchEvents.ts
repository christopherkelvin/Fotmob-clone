import {useQuery} from "react-query";
import {MatchEvent} from "../types";
import {getMatchEvents} from "../api";


interface UseMatchEventsOptions {
    from?:string, to?:string;
    onSuccess?: (matchEvents: MatchEvent[]) => void
}

export const useMatchEvents = (options?:UseMatchEventsOptions) => {
    const defaultFrom = options?.from ?? new Date().toISOString().split("T")[0];
    return useQuery<MatchEvent[]>({
        queryKey: ["match-events"],
        queryFn: () => getMatchEvents(defaultFrom, options?.to),
        onSuccess: options?.onSuccess,
    })
}
