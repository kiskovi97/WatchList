export interface ShowDataAPI {
  id: number
  url: string
  name: string
  image: Image | undefined
}

export interface EpisodeDataAPI {
  id: number
  name: string
  season: number
  number: number
  airdate: string | null
  airtime: string | null
  airstamp: string | null
  image: Image | null
  summary: string | null
}

export interface SeasonDataAPI {
  id: number
  number: number
  name: string
  image: Image | null
  summary: string | null
}

export interface Image {
  medium: string | undefined
  original: string | undefined
}

export interface ShowData {
  id: number
  url: string
  name: string
  image: Image | undefined
  seasons: SeasonData[]
  episodes: EpisodeData[]
}

export interface EpisodeData {
  id: number
  name: string
  season: number
  number: number
  airdate: Date | undefined
  image: Image | null
  summary: string | null
}

export interface SeasonData {
  id: number
  number: number
  name: string
  image: Image | null
  summary: string | null
  episodes: EpisodeData[]
}
