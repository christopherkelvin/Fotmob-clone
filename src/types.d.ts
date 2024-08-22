export interface Match {
    match_id: string;
    country_id: string;
    country_name: string;
    league_id: string;
    league_name: string;
    match_date: string;
    match_status: string;
    match_time: string;
    match_hometeam_id: string;
    match_hometeam_name: string;
    match_hometeam_score: string;
    match_awayteam_name: string;
    match_awayteam_id: string;
    match_awayteam_score: string;
    match_hometeam_halftime_score: string;
    match_awayteam_halftime_score: string;
    match_hometeam_extra_score: string;
    match_awayteam_extra_score: string;
    match_hometeam_penalty_score: string;
    match_awayteam_penalty_score: string;
    match_hometeam_ft_score: string;
    match_awayteam_ft_score: string;
    match_hometeam_system: string;
    match_awayteam_system: string;
    match_live: string;
    match_round: string;
    match_stadium: string;
    match_referee: string;
    team_home_badge: string;
    team_away_badge: string;
    league_logo: string;
    country_logo: string;
    league_year: string;
    fk_stage_key: string;
    stage_name: string;
    goalscorer: GoalScorer[];
    cards: Card[];
    substitutions: Substitutions;
    lineup: Lineup;
    statistics: Statistic[];
    statistics_1half: Statistic[];
}

interface GoalScorer {
    time: string;
    home_scorer: string;
    home_scorer_id: string;
    home_assist: string;
    home_assist_id: string;
    score: string;
    away_scorer: string;
    away_scorer_id: string;
    away_assist: string;
    away_assist_id: string;
    info: string;
    score_info_time: string;
}

interface Card {
    time: string;
    home_fault: string;
    card: string;
    away_fault: string;
    info: string;
    home_player_id: string;
    away_player_id: string;
    score_info_time: string;
}

interface Substitutions {
    home: SubstitutionDetail[];
    away: SubstitutionDetail[];
}

interface SubstitutionDetail {
    time: string;
    substitution: string;
    substitution_player_id: string;
}

interface Lineup {
    home: TeamLineup;
    away: TeamLineup;
}

interface TeamLineup {
    starting_lineups: LineupPlayer[];
    substitutes: LineupPlayer[];
    coach: LineupPlayer[];
    missing_players: LineupPlayer[];
}

interface LineupPlayer {
    lineup_player: string;
    lineup_number: string;
    lineup_position: string;
    player_key: string;
}

interface Statistic {
    type: string;
    home: string;
    away: string;
}

// Example usage
