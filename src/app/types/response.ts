// type search response, array of search results

import { Player } from './player'
import { Team } from './team'

export type SearchResponse = {
    data: {
        type: string
        results: SearchResult
    }
}

export type SearchResult = {
    teams?: Team[]
    players?: Player[]
}

// PlayerResults is an array of players
export type PlayerResult = Player
