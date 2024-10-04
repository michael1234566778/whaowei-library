<template>
  <div>
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
      <!-- Error message display -->
      <p v-if="error" style="color: red">{{ error }}</p>
    </form>

    <!-- Display the list of books after adding -->
    <BookList />
  </div>
</template>

<script>
import { ref } from 'vue'
import db from '../Firebase/init.js'
import { collection, addDoc } from 'firebase/firestore'
import BookList from '../components/BookList.vue'

export default {
  setup() {
    const isbn = ref('')
    const name = ref('')
    const error = ref(null) // To hold error messages

    const addBook = async () => {
      try {
        // Clear any previous error
        error.value = null

        // Validate ISBN input
        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)) {
          error.value = 'ISBN must be a valid number'
          return
        }

        // Validate name input
        if (!name.value.trim()) {
          error.value = 'Name cannot be empty'
          return
        }

        // Add book to Firestore
        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value.toUpperCase() // Capitalizing the name
        })

        // Reset form fields
        isbn.value = ''
        name.value = ''
        alert('Book added successfully!')
      } catch (err) {
        error.value = 'Error adding book: ' + err.message
        console.error('Error adding book:', err)
      }
    }

    return {
      isbn,
      name,
      addBook,
      error
    }
  },
  components: {
    BookList
  }
}
</script>
