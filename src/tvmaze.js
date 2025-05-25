// tvmaze.js

const BASE_URL = 'https://api.tvmaze.com';

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
  return res.json();
}

export async function searchShowByName(name) {
  const results = await fetchJson(`${BASE_URL}/search/shows?q=${encodeURIComponent(name)}`);
  return results.map(result => result.show);
}

export async function getShowById(id) {
  try {
    const show = await fetchJson(`${BASE_URL}/shows/${id}`);
    const episodes = await fetchJson(`${BASE_URL}/shows/${id}/episodes`);

    return {
      ...show,
      episodes,
      nextUnseenEpisode(seenEpisodeIds) {
        return episodes.find(ep => !seenEpisodeIds.includes(ep.id));
      },
      nextAiringEpisode() {
        const now = new Date();
        return episodes.find(ep => ep.airstamp && new Date(ep.airstamp) > now);
      }
    };
  } catch (error) {
    console.error(`Error fetching show with ID ${id}:`, error);
    return null;
  }
}
