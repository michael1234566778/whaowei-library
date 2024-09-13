<template>
  <div class="login">
    <h2>Login to Your Account</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated } from '../router'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMessage = ref('')

const validUsername = 'user'
const validPassword = 'password'

const handleLogin = () => {
  if (username.value === validUsername && password.value === validPassword) {
    isAuthenticated.value = true
    router.push('/about')
  } else {
    errorMessage.value = 'Invalid username or password'
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 100px auto;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
