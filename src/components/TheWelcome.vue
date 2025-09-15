<script setup lang="ts">
import ShowSall from './ShowSmall.vue'
import { onMounted } from 'vue'
import { useWatchedShowsStore } from '@/lib/repository.ts'
import type { WatchedShow } from '@/lib/repository.ts'

const store = useWatchedShowsStore()

const watchNextEpisode = (show: WatchedShow) => {
  if (show.nextEpisode) {
    store.markEpisodeWatched(show.data.showId, show.nextEpisode?.id)
    console.log('Episode watched: ' + show.nextEpisode?.name)
  }
}

onMounted(async () => {
  await store.fetchWatchedShows()
})
</script>

<template>
  <div :class="$style.main" :style="{ color: undefined }">
    <h1 v-if="store.loading">Loading...</h1>
    <h1 v-if="store.error">ERROR: {{ store.error }}</h1>
    <h2 v-if="store.currentShows.length > 0">Current</h2>
    <template v-for="show in store.currentShows" :key="show.show.id">
      <ShowSall
        :class="{ stars: show.show.name.includes('Star') }"
        :show="show"
        :watchable="true"
        @on-watched="watchNextEpisode"
      />
    </template>
    <h2 v-if="store.otherShows.length > 0">Others</h2>
    <template v-for="show in store.otherShows" :key="show.show.id">
      <ShowSall
        :class="{ stars: show.show.name.includes('Star') }"
        :show="show"
        :watchable="false"
      />
    </template>
  </div>
</template>

<style module scoped>
.main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 80rem;
  margin: 0 auto;
  gap: 1rem;
}

h1,
h2 {
  color: var(--darkestColor);
  width: 100%;
}

@media only screen and (max-width: 80em) {
  .main {
    margin: 1rem;
  }
}
</style>
