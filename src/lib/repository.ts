import type { ShowData, EpisodeData } from './types/ShowData'
import type { WatchData } from './types/WatchData'
import { fetchData, uploadData, removeDataById, fetchDataById } from './dynamoService'
import { getShowById as fetchShowById } from './tvmaze'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface WatchedShow {
  show: ShowData
  data: WatchData
  nextEpisode: EpisodeData | undefined
  nextAirDate: Date | undefined
  local: boolean
}

// ---------------- helpers ----------------
function GetNextEpisode(show: ShowData, data: WatchData): EpisodeData | undefined {
  if (!data || !show) return undefined
  if (data.episodes === undefined) return undefined
  const seenEpisodeIds = data.episodes.map((item) => parseInt(item))

  return (
    show.episodes.find((ep) => !seenEpisodeIds.includes(ep.id)) ??
    show.episodes.find((ep) => ep.airdate && ep.airdate.getTime() > Date.now())
  )
}

// ---------------- store ----------------
export const useWatchedShowsStore = defineStore('watchedShows', () => {
  const watchedShows = ref<WatchedShow[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchWatchedShows() {
    loading.value = true
    error.value = null
    watchedShows.value = []

    try {
      const result = await fetchData()
      if (result.success && result.data) {
        const exportList: WatchedShow[] = []

        for (const watchData of result.data) {
          const showData = await fetchShowById(watchData.showId)
          if (showData) {
            const nextEpisode = GetNextEpisode(showData, watchData)
            exportList.push({
              data: watchData,
              show: showData,
              nextEpisode,
              nextAirDate: nextEpisode?.airdate,
              local: false,
            })
          }
        }

        watchedShows.value = exportList
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        error.value = e.message + ' ' + e.stack
      } else {
        error.value = String(e)
      }
    } finally {
      loading.value = false
    }
  }

  async function getShowById(showId: string): Promise<WatchedShow | undefined> {
    const showData = watchedShows.value.find((s) => s.data.showId === showId)
    if (showData) return showData

    const apiShow = await fetchShowById(showId)
    const watchData = await fetchDataById(showId)

    if (watchData.data && apiShow) {
      const nextEpisode = GetNextEpisode(apiShow, watchData.data)
      return {
        data: watchData.data,
        show: apiShow,
        nextEpisode,
        nextAirDate: nextEpisode?.airdate,
        local: false,
      }
    }
    if (apiShow) {
      return {
        show: apiShow,
        data: {
          showId: showId,
          episodes: [],
        },
        nextAirDate: undefined,
        nextEpisode: undefined,
        local: true,
      }
    }

    return undefined
  }

  async function updateWatchedEpisodes(showId: string, watchedEpisodes: string[]) {
    try {
      const watchedShow = watchedShows.value.find((s) => s.data.showId === showId)
      if (watchedShow) {
        watchedShow.data.episodes = [...watchedEpisodes]
        watchedShow.nextEpisode = GetNextEpisode(watchedShow.show, watchedShow.data)
        watchedShow.nextAirDate = watchedShow.nextEpisode?.airdate

        await uploadData(watchedShow.data)
      } else {
        await uploadData({
          episodes: watchedEpisodes,
          showId: showId,
        })
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        error.value = e.message
      } else {
        error.value = String(e)
      }
    }
  }

  async function markEpisodeWatched(showId: string, episodeId: number) {
    try {
      const watchedShow = watchedShows.value.find((s) => s.data.showId === showId)
      if (watchedShow) {
        watchedShow.data.episodes.push(String(episodeId))
        watchedShow.nextEpisode = GetNextEpisode(watchedShow.show, watchedShow.data)
        watchedShow.nextAirDate = watchedShow.nextEpisode?.airdate

        await uploadData(watchedShow.data)
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        error.value = e.message
      } else {
        error.value = String(e)
      }
    }
  }

  async function unwatchEpisode(showId: string, episodeId: number) {
    try {
      const watchedShow = watchedShows.value.find((s) => s.data.showId === showId)
      if (watchedShow) {
        watchedShow.data.episodes = watchedShow.data.episodes.filter(
          (id) => parseInt(id) !== episodeId,
        )
        watchedShow.nextEpisode = GetNextEpisode(watchedShow.show, watchedShow.data)
        watchedShow.nextAirDate = watchedShow.nextEpisode?.airdate

        await uploadData(watchedShow.data)
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        error.value = e.message
      } else {
        error.value = String(e)
      }
    }
  }

  async function removeShow(showId: string) {
    try {
      await removeDataById(showId)
    } catch (e: unknown) {
      if (e instanceof Error) {
        error.value = e.message
      } else {
        error.value = String(e)
      }
    }
  }

  async function addShow(showId: string) {
    try {
      await uploadData({ showId: showId, episodes: [] })
    } catch (e: unknown) {
      if (e instanceof Error) {
        error.value = e.message
      } else {
        error.value = String(e)
      }
    }
  }

  const currentShows = computed(() => {
    const returnValue = [
      ...watchedShows.value.filter(
        (item) => item.nextEpisode && item.nextAirDate && item.nextAirDate < new Date(Date.now()),
      ),
    ]
    returnValue.sort(
      (itemA, itemB) =>
        (itemB.nextAirDate?.getTime() || Number.MAX_VALUE) -
        (itemA.nextAirDate?.getTime() || Number.MAX_VALUE),
    )
    return returnValue
  })

  const otherShows = computed(() => {
    const returnValue = [
      ...watchedShows.value.filter(
        (item) => item.nextEpisode && item.nextAirDate && item.nextAirDate > new Date(Date.now()),
      ),
    ]
    returnValue.sort(
      (itemA, itemB) =>
        (itemA.nextAirDate?.getTime() || Number.MAX_VALUE) -
        (itemB.nextAirDate?.getTime() || Number.MAX_VALUE),
    )
    return returnValue
  })

  return {
    watchedShows,
    loading,
    error,
    fetchWatchedShows,
    markEpisodeWatched,
    unwatchEpisode,
    getShowById,
    updateWatchedEpisodes,
    removeShow,
    addShow,
    otherShows,
    currentShows,
  }
})
