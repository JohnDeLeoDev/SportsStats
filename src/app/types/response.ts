// type search response, array of search results

export type SearchResponse = [SearchResult]

export type SearchResult = Team | null

export type Team = {
    id?: number
    yearid?: number
    lgid?: string
    teamid?: string
    franchid?: string
    teamidbr?: string
    teamidfg?: string
    teamidretro?: string
    name?: string
    city?: string
}
