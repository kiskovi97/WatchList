<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { getRedirectResult, signOut, signInWithPopup, type UserCredential } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { useFirebaseAuth, useCurrentUser } from 'vuefire'
import { onMounted, ref } from 'vue'

const auth = useFirebaseAuth()!
const user = useCurrentUser()
const error = ref(null)

const googleAuthProvider = new GoogleAuthProvider()
function signOutLocal() {
  signOut(auth).catch((reason) => {
    console.error('Failed signinRedirect', reason)
    error.value = reason
  })
}
function signinPopup() {
  error.value = null
  signInWithPopup(auth, googleAuthProvider)
    .catch((reason) => {
      console.error('Failed sign', reason)
      error.value = reason
    })
    .then((user: void | UserCredential) => {
      if (user && user.user.email !== 'kiskovi97@gmail.com') {
        alert('You have no permission to enter this page')
        signOutLocal()
      }
    })
}
onMounted(() => {
  getRedirectResult(auth).catch((reason) => {
    console.error('Failed redirect result', reason)
    error.value = reason
  })
})
</script>

<template>
  <div class="App">
    <header class="Header">
      <h1>WatchList</h1>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/explore">Explore</RouterLink>
        <button v-if="!user" @click="() => signinPopup()">Sign In</button>
        <button v-if="user" @click="() => signOutLocal()">Sign Out</button>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.Header h1 {
  margin: 0 auto;
  width: min-content;
  padding-top: 1rem;
  color: var(--darkestColor);
}

.Header nav {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  padding: 2rem;
}
.Header nav a {
  color: var(--darkestColor);
  text-decoration: none;
}
</style>
