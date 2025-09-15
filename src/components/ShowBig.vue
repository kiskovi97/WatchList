<script setup lang="ts">
import type { WatchedShow } from '@/lib/repository'
import { useWatchedShowsStore } from '@/lib/repository.ts'
import { computed, ref } from 'vue'
import { useCurrentUser } from 'vuefire'

const store = useWatchedShowsStore()
const props = defineProps<{
  show: WatchedShow
}>()
const user = useCurrentUser()

const showData = computed(() => props.show.show)
const seasons = computed(() => props.show.show.seasons)
const watchedEpisodes = ref(props.show.data.episodes)

const sendChange = () => {
  store.updateWatchedEpisodes(props.show.data.showId, watchedEpisodes.value)
}

const lastEpisode = computed(() => props.show.nextEpisode)
</script>

<template>
  <div :class="$style.main">
    <div>
      <img :src="showData.image?.medium" :alt="showData.name" />
    </div>
    <div>
      <h1>{{ showData.name }}</h1>
      <div v-if="lastEpisode">
        {{ lastEpisode.airdate?.toLocaleString() }} - {{ lastEpisode.name }}
      </div>
    </div>
  </div>
  <div :class="$style.seasons">
    <div v-for="season in seasons" :key="season.id">
      {{ season.number }}. Season {{ season.name }}
      <div v-for="episode in season.episodes" :key="episode.id">
        <input
          v-if="user"
          type="checkbox"
          :value="String(episode.id)"
          v-model="watchedEpisodes"
          @change="sendChange"
        />
        {{ episode.airdate?.toDateString() }} - {{ episode.number }} {{ episode.name }}
      </div>
    </div>
  </div>
</template>

<style module>
.main {
  margin: 0 auto;
  background-color: white;
  width: 20rem;
  height: 8rem;
  border-radius: 1rem;
  filter: drop-shadow(0.2rem 0.5rem 0.2rem #0000001e);
  display: flex;
  flex-direction: row;
  overflow: hidden;
  gap: 1rem;
  margin-bottom: 1rem;
}

img {
  height: 100%;
}

.seasons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 70rem;
  margin: 0 auto;
  gap: 1rem;
}

.seasons > div {
  padding: 1rem;
  background-color: white;
  width: 30rem;
  border-radius: 1rem;
  filter: drop-shadow(0.2rem 0.5rem 0.2rem #0000001e);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 1rem;
}
</style>
