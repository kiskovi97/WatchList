<script setup lang="ts">
import type { WatchedShow } from '@/lib/repository'
import { computed } from 'vue'
import { useCurrentUser } from 'vuefire'

const props = defineProps<{
  show: WatchedShow
  watchable: boolean
}>()

const user = useCurrentUser()

const emits = defineEmits<{
  (e: 'onWatched', show: WatchedShow): void
}>()

const showData = computed(() => props.show.show)
const progress = computed(() => props.show.data.episodes.length / props.show.show.episodes.length)
const progressStr = computed(() => progress.value * 100 + '%')

const watchNextEpisode = () => {
  emits('onWatched', props.show)
}

const lastEpisode = computed(() => props.show.nextEpisode)
</script>

<template>
  <div :class="$style.main" @click="$router.push('/show/' + showData.id)">
    <div>
      <img :src="showData.image?.medium" :alt="showData.name" />
    </div>
    <div :class="$style.details">
      <h1>{{ showData.name }}</h1>
      <div v-if="lastEpisode">
        {{ lastEpisode.airdate?.toLocaleString() }} - {{ lastEpisode.name }}
      </div>
    </div>
    <div :class="$style.buttons">
      <button v-if="watchable && user" @click.stop="watchNextEpisode">Watched</button>
    </div>
    <div :class="$style.progress">
      <div :style="{ backgroundColor: 'green', width: progressStr, height: '100%' }"></div>
    </div>
  </div>
</template>

<style module>
.main {
  background-color: white;
  width: 25rem;
  height: 8rem;
  border-radius: 1rem;
  filter: drop-shadow(0.2rem 0.5rem 0.2rem #0000001e);
  display: grid;
  grid-template-columns: 5rem 1fr 6rem;
  grid-template-rows: 1fr 0.5rem;
  overflow: hidden;
  cursor: pointer;
}

.details {
  padding: 0.5rem;
}

.progress {
  flex-grow: 1;
  grid-column-start: 1;
  grid-column-end: 4;
  background-color: rgba(0, 0, 0, 0.137);
}

.buttons {
  padding: 0.5rem;
}

img {
  width: 100%;
  height: 100%;
}

h1 {
  font-size: medium;
  color: var(--darkestColor);
  margin: 0;
}

div {
  font-size: medium;
}

button {
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
}

button:hover {
  opacity: 0.5;
}
</style>
