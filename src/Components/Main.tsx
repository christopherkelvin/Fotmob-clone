import {matches} from "lodash";
import {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import "../css/active.css";
import {Match} from "../types";
import {groupBy} from "../utils/group-by-name.ts";
import {useMatchEvents} from "../hooks/useMatchEvents.ts";
import Loader from "./Loader";
import Filter from "./Filter";


const transformMatchEvents = (matchEvents: Match[]) => {
    const transformed = matchEvents.map((event) => {
        return {
            ...event,
            league_name: `${event.country_name} - ${event.league_name}`,
        }
    }) as never as Match[];
    return groupBy(transformed, "league_name");
}

const handleSearch = (query:string, matches:Match[]):Record<string, Match[]> => {
    // 1. perform search the return filtered matches
    // 2. use <transformMatchEvents>  to transform match and group them by match league
    return {}
}


const Main = () => {
    const [matchEvents, setMatchEvents] = useState<Match[]>([]);
    const [competitions, setCompetitions] = useState<Record<string, Match[]>>({})
    const [search, setSearch] = useState("")
    const [searchParams] = useSearchParams();

    const {isLoading} = useMatchEvents({
        onSuccess: (_matchEvents) => {
            setMatchEvents(_matchEvents)
            filterLiveMatches(_matchEvents)
        }
    });

    useEffect(() => {
        if(search && !isLoading && matchEvents.length> 0) {
            setCompetitions(handleSearch(search, matchEvents));
        }
    }, [search]);

    // filter match events when searchParams changes
    const filterLiveMatches = (_matchEvents: Match[]) => {
        let filteredMatchEvents: Match[] = []
        const liveStatus = searchParams.get("sort");

        filteredMatchEvents = liveStatus
            ? _matchEvents.filter((match) => {
                return match.match_live === liveStatus
            })
            : _matchEvents;
        setCompetitions(transformMatchEvents(filteredMatchEvents));
    }


    useEffect(() => {
        filterLiveMatches(matchEvents)
    }, [searchParams]);

    return (
        <>
            <div className=" mt-20">
                <Filter onSearch={setSearch}/>
                <div className="flex flex-col ">
                    {isLoading && <Loader/>}
                    {!isLoading &&
                        competitions &&
                        Object.keys(competitions).map((leagueKey, index) => {
                            const id = competitions[leagueKey];
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col bg-[#1d1d1d] mt-7 rounded-xl overflow-hidden font-dancing"
                                >
                                    <Link
                                        to={`league/${id[0].league_id}/${leagueKey}`}
                                        className="py-3 w-full hover:underline text-center text-white bg-[#262626] cursor-pointer"
                                    >
                                        {leagueKey}
                                    </Link>
                                    {competitions[leagueKey].map((competition, compIndex) => (
                                        <div className="ml-10" key={compIndex}>
                                            <div className="grid grid-cols-3 items-center text-white font-roboto">
                                                <div className="flex py-2">
                                                    <img
                                                        className="w-6 h-6 rounded-full mr-3"
                                                        src={competition.team_home_badge}
                                                        alt=""
                                                    />
                                                    <span>{competition.match_hometeam_name}</span>
                                                </div>
                                                <div className="flex">
                                                    {!competition.match_status ? (
                                                        <span className="text-center ml-20">
                              {competition.match_time}
                            </span>
                                                    ) : competition.match_status === "Postponed" ? (
                                                        <div className="flex flex-col ml-19">
                              <span className="text-center line-through">
                                {competition.match_time}
                              </span>
                                                            <span className="text-gray-400 text-xs">
                                {competition.match_status}
                              </span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col ml-19">
                              <span className="text-center">
                                {competition.match_hometeam_score} -
                                  {competition.match_awayteam_score}
                              </span>
                                                            <span className="text-xs">
                                {competition.match_status}
                              </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex">
                                                    <img
                                                        src={competition.team_away_badge}
                                                        alt=""
                                                        className="w-6 h-6 rounded-full mr-3"
                                                    />
                                                    <span>{competition.match_awayteam_name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default Main;
