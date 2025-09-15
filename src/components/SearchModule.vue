<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { searchShowByName } from '@/lib/tvmaze'
import type { ShowData } from '@/lib/types/ShowData'

const searchKey = ref('')

const list = ref<ShowData[]>([])

watchEffect(async () => {
  const data = await searchShowByName(searchKey.value)
  list.value = data
})
</script>

<template>
  <div :class="$style.main">
    <input type="text" v-model="searchKey" />
    <div
      v-for="show in list"
      :key="show.id"
      :class="$style.item"
      @click="$router.push('/show/' + show.id)"
    >
      <div>
        <img :src="show.image?.medium" :alt="show.name" />
      </div>
      <div :class="$style.details">
        <h1>{{ show.name }}</h1>
      </div>
    </div>
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

.item {
  background-color: white;
  width: 20rem;
  height: 5rem;
  border-radius: 1rem;
  filter: drop-shadow(0.2rem 0.5rem 0.2rem #0000001e);
  display: grid;
  grid-template-columns: 5rem 1fr;
  gap: 1rem;
  overflow: hidden;
  cursor: pointer;
}

.details {
  padding: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
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
