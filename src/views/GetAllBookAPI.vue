<template>
  <div class="container">
    <h1>All Books</h1>
    <pre v-if="books">{{ books }}</pre>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GetAllBookAPI',
  data() {
    return {
      books: null,
      errorMessage: null
    }
  },
  mounted() {
    this.fetchBooks()
  },
  methods: {
    async fetchBooks() {
      const url = 'https://us-central1-week7-haowei.cloudfunctions.net/getBooks'
      try {
        const response = await axios.get(url)
        this.books = JSON.stringify(response.data, null, 2)
        this.errorMessage = null
      } catch (error) {
        console.error('Error fetching books:', error)
        this.errorMessage = 'Error fetching book data'
      }
    }
  }
}
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
}

.error-message {
  color: red;
}
</style>
