<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <div id="app">
        <nav class="navbar">
          <router-link to="/" class="btn btn-primary">Home (Week 7)</router-link>
          <router-link v-if="isAuthenticated" to="/about" class="btn btn-primary"
            >About</router-link
          >
          <router-link v-if="!isAuthenticated" to="/login" class="btn btn-secondary"
            >Login</router-link
          >
          <button v-if="isAuthenticated" @click="logout" class="btn btn-danger">Logout</button>
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
          <router-link to="/Booklist" class="nav-link" active-class="active">Booklist</router-link>
          <router-link to="/WeatherCheck" class="nav-link" active-class="active"
            >Get Weather</router-link
          >
          <router-link to="/GetBookCount" class="nav-link" active-class="active"
            >Get Book Count</router-link
          >
          <router-link to="/CountBookAPI" class="nav-link" active-class="active"
            >Count Book API</router-link
          >
          <router-link to="/GetAllBookAPI" class="nav-link" active-class="active"
            >Get All Book API</router-link
          >
        </nav>
      </div>
    </header>
  </div>
</template>
<script setup>
import { isAuthenticated } from '@/router'
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'

const router = useRouter()

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
</script>

<style>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>
