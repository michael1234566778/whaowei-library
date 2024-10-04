<template>
  <div>
    <h1>Books with ISBN > 1000 (Ordered by Name, Limited to 5)</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
        <button @click="updateBook(book.id)">Update</button>
        <button @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

export default {
  setup() {
    const books = ref([])
    const db = getFirestore()

    const fetchBooks = async () => {
      try {
        const q = query(
          collection(db, 'books'),
          where('isbn', '>', 1000),
          orderBy('name', 'asc'),
          limit(5)
        )
        const querySnapshot = await getDocs(q)
        console.log(querySnapshot.size)
        const booksArray = []
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() })
        })
        books.value = booksArray
        console.log(books.value) // 打印获取到的书籍列表
      } catch (error) {
        console.error('Error fetching books: ', error)
      }
    }

    const updateBook = async (id) => {
      const bookDoc = doc(db, 'books', id)
      try {
        await updateDoc(bookDoc, {
          name: 'Updated Book Name',
          isbn: 9999
        })
        alert('Book updated successfully!')
        fetchBooks()
      } catch (error) {
        console.error('Error updating book: ', error)
      }
    }

    const deleteBook = async (id) => {
      const bookDoc = doc(db, 'books', id)
      try {
        await deleteDoc(bookDoc)
        alert('Book deleted successfully!')
        fetchBooks()
      } catch (error) {
        console.error('Error deleting book: ', error)
      }
    }

    onMounted(() => {
      fetchBooks()
    })

    return {
      books,
      updateBook,
      deleteBook
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
}

li {
  font-size: 1.2em;
  margin-bottom: 10px;
}

button {
  margin-left: 10px;
}
</style>
