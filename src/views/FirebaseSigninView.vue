<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { isAuthenticated } from '@/router'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()
const db = getFirestore()

const signin = async () => {
  if (!email.value) {
    alert('Email cannot be empty.')
    return
  }
  if (!password.value) {
    alert('Password cannot be empty.')
    return
  }

  try {
    // 调用 Firebase 登录 API
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    isAuthenticated.value = true
    console.log('User logged in, setting isAuthenticated to true.')

    const userDoc = await getDoc(doc(db, 'users', user.uid))
    if (userDoc.exists()) {
      const userData = userDoc.data()
      const userRole = userData.role
      console.log('User role:', userRole)

      if (userRole === 'admin') {
        router.push('/admin-dashboard')
      } else {
        router.push('/')
      }
    } else {
      console.log('No user data found in Firestore.')
    }
  } catch (error) {
    console.error('Error during sign-in:', error.code, error.message)

    if (error.code === 'auth/user-not-found') {
      alert('User not found. Please check your email and try again.')
    } else if (error.code === 'auth/wrong-password') {
      alert('Incorrect password. Please try again.')
    } else if (error.code === 'auth/invalid-credential') {
      alert('Invalid credentials. Please check your email and password and try again.')
    } else {
      alert('Login failed. Please try again later.')
    }
  }
}
</script>
