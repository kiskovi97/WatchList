<script setup lang="ts">
import ShowBig from '@/components/ShowBig.vue'
import { useWatchedShowsStore, type WatchedShow } from '@/lib/repository.ts'
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { useCurrentUser } from 'vuefire'

const store = useWatchedShowsStore()
const route = useRoute()

const user = useCurrentUser()

const show = ref<WatchedShow | undefined>(undefined)

onMounted(async () => {
  show.value = await store.getShowById(route.params.id.toString())
})

onMounted(async () => {
  await store.fetchWatchedShows()
})
const isLocal = computed(() => show.value && show.value.local)

const removeShow = async () => {
  if (show.value) {
    await store.removeShow(show.value.data.showId)
    show.value = await store.getShowById(route.params.id.toString())
  }
}
const addShow = async () => {
  if (show.value) {
    await store.addShow(show.value.data.showId)
    show.value = await store.getShowById(route.params.id.toString())
  }
}
</script>

<template>
  <button v-if="!isLocal && user" @click="removeShow">Remove show</button>
  <button v-if="isLocal && user" @click="addShow">Add show</button>
  <ShowBig v-if="show" :show="show" />
</template>

<style scoped>
button {
  margin: 1rem;
}
</style>
