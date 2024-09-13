<!-- src/views/AboutView.vue -->
<template>
  <div class="about">
    <h2>About Page</h2>
    <p>This is a protected page. Only authenticated users can see this.</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('isAuthenticated') // Clear authentication state
  router.push('/') // Redirect to login page on logout
}
</script>

<style scoped>
.about {
  text-align: center;
  margin-top: 50px;
}
</style>
