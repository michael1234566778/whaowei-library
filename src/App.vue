<template>
  <div class="main-container">
    <header v-if="showHeader">
      <BHeader />
    </header>
    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import BHeader from './components/BHeader.vue'
import CountBookAPI from './views/CountBookAPI.vue'

export default {
  name: 'App',
  components: {
    BHeader,
    CountBookAPI
  },
  computed: {
    showHeader() {
      return this.$route.name !== 'CountBookAPI'
    }
  }
}
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
