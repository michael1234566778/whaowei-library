<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/" class="btn btn-primary">Home (Week 7)</router-link>
      <router-link v-if="isAuthenticated" to="/about" class="btn btn-primary">About</router-link>
      <router-link v-if="!isAuthenticated" to="/login" class="btn btn-secondary">Login</router-link>
      <button v-if="isAuthenticated" @click="logout" class="btn btn-danger">Logout</button>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { isAuthenticated } from './router'
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'

const logout = async () => {
  const auth = getAuth()
  try {
    await signOut(auth)
    isAuthenticated.value = false
    console.log('Successfully logged out')
    router.push('/')
  } catch (error) {
    console.error('Error signing out:', error)
  }
}
const router = useRouter()
</script>

<style>
.navbar {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.navbar .btn {
  text-decoration: none;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  font-size: 16px;
}

.navbar .btn:hover {
  background-color: #0056b3;
}

.navbar .btn-secondary {
  background-color: #6c757d;
}

.navbar .btn-danger {
  background-color: #dc3545;
}
</style>
