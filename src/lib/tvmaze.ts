import type {
  EpisodeData,
  SeasonData,
  ShowData,
  EpisodeDataAPI,
  SeasonDataAPI,
  ShowDataAPI,
} from './types/ShowData'

const BASE_URL = 'https://api.tvmaze.com'

interface SearchResult {
  show: ShowDataAPI
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch: ${url}`)
  return res.json()
}

function convertEpisode(item: EpisodeDataAPI): EpisodeData {
  return {
    id: item.id,
    name: item.name,
    season: item.season,
    number: item.number,
    airdate: new Date(item.airstamp || item.airdate + ' ' + item.airtime),
    image: item.image,
    summary: item.summary,
  }
}
function convertSeason(item: SeasonDataAPI, epsiode: EpisodeData[] = []): SeasonData {
  return {
    id: item.id,
    name: item.name,
    number: item.number,
    image: item.image,
    summary: item.summary,
    episodes: epsiode,
  }
}

function convert(
  apiShow: ShowDataAPI,
  apiSeasons: SeasonDataAPI[] = [],
  apiEpisodes: EpisodeDataAPI[] = [],
): ShowData {
  const episodes = apiEpisodes.map(convertEpisode)
  const seasons = apiSeasons.map((season) =>
    convertSeason(
      season,
      episodes.filter((ep) => ep.season === season.number),
    ),
  )

  return {
    id: apiShow.id,
    name: apiShow.name,
    image: apiShow.image,
    seasons: seasons,
    episodes: episodes,
    url: apiShow.url,
  }
}

export async function searchShowByName(name: string): Promise<ShowData[]> {
  const results = await fetchJson<SearchResult[]>(
    `${BASE_URL}/search/shows?q=${encodeURIComponent(name)}`,
  )
  return results.map((result) => convert(result.show))
}

export async function getShowById(id: string): Promise<ShowData | null> {
  try {
    const show = await fetchJson<ShowDataAPI>(`${BASE_URL}/shows/${id}`)
    const episodes = await fetchJson<EpisodeDataAPI[]>(`${BASE_URL}/shows/${id}/episodes`)
    const seasons = await fetchJson<SeasonDataAPI[]>(`${BASE_URL}/shows/${id}/seasons`)

    return convert(show, seasons, episodes)
  } catch (error) {
    console.error(`Error fetching show with ID ${id}:`, error)
    return null
  }
}
