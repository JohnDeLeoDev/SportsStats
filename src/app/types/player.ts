export type Player = {
    id?: number
    playerID?: string
    birthYear?: number
    birthMonth?: number
    birthDay?: number
    birthCity?: string
    birthCountry?: string
    birthState?: string
    deathYear?: number
    deathMonth?: number
    deathDay?: number
    deathCountry?: string
    deathState?: string
    deathCity?: string
    nameFirst?: string
    nameLast?: string
    nameGiven?: string
    weight?: number
    height?: number
    bats?: string
    throws?: string
    debut?: string
    bbrefID?: string
    finalGame?: string
    retroID?: string
}

export type PlayerStats = {
    batting?: BattingStats[]
    pitching?: PitchingStats[]
    fielding?: FieldingStats[]
}

export type BattingStats = {
    playerID?: string
    yearID?: number
    stint?: number
    teamID?: string
    lgID?: string
    G?: number
    AB?: number
    R?: number
    H?: number
    '2B'?: number
    '3B'?: number
    HR?: number
    RBI?: number
    SB?: number
    CS?: number
    BB?: number
    SO?: number
    IBB?: number
    HBP?: number
    SH?: number
    SF?: number
    GIDP?: number
}

export type PitchingStats = {
    playerID?: string
    yearID?: number
    stint?: number
    teamID?: string
    lgID?: string
    W?: number
    L?: number
    G?: number
    GS?: number
    CG?: number
    SHO?: number
    SV?: number
    IPouts?: number
    H?: number
    ER?: number
    HR?: number
    BB?: number
    SO?: number
    BAOpp?: number
    ERA?: number
    IBB?: number
    WP?: number
    HBP?: number
    BK?: number
    BFP?: number
    GF?: number
    R?: number
    SH?: number
    SF?: number
    GIDP?: number
}

export type FieldingStats = {
    playerID?: string
    yearID?: number
    stint?: number
    teamID?: string
    lgID?: string
    POS?: string
    G?: number
    GS?: number
    InnOuts?: number
    PO?: number
    A?: number
    E?: number
    DP?: number
    PB?: number
    WP?: number
    SB?: number
    CS?: number
    ZR?: number
}
