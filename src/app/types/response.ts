// type search response, array of search results

import { Player } from './player'
import { Team } from './team'

export type SearchResponse = [SearchResult]

export type SearchResult = Team | null | Player

// PlayerResults is an array of players
export type PlayerResult = Player
