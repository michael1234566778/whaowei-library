<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8 text-center">
        <h2><span role="img" aria-label="icon">📂</span> W5. Library Registration Form</h2>
      </div>
    </div>

    <div class="row justify-content-center mt-4">
      <div class="col-12 col-md-10 col-lg-8 text-center">
        <button @click="goToFirebaseLogin" class="btn btn-primary me-3">Firebase Login</button>
        <button @click="goToFirebaseRegister" class="btn btn-secondary">Firebase Register</button>
        <button v-if="isAuthenticated" @click="firebaseLogout" class="btn btn-danger mt-3">
          Firebase Logout
        </button>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8">
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-12 col-md-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>

            <div class="col-12 col-md-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"
                id="gender"
                v-model="formData.gender"
                @change="validateGender"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-md-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
            <div class="col-12 col-md-6">
              <label for="confirm-password" class="form-label">Confirm password</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
                @blur="() => validateConfirmPassword(true)"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="role" class="form-label">Role</label>
            <select class="form-select" id="role" v-model="formData.role" @change="validateRole">
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="guest">Guest</option>
            </select>
            <div v-if="errors.role" class="text-danger">{{ errors.role }}</div>
          </div>

          <div class="mb-3">
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="isAustralian"
                v-model="formData.isAustralian"
                @change="validateResident"
              />
              <label class="form-check-label" for="isAustralian">Australian Resident?</label>
            </div>
            <div v-if="errors.resident" class="text-danger">{{ errors.resident }}</div>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              v-model="formData.reason"
              @blur="validateReason"
              @input="validateReason"
            ></textarea>
            <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
            <div v-if="friendMessage" class="text-success">{{ friendMessage }}</div>
          </div>

          <div class="mb-3">
            <label for="suburb" class="form-label">Suburb</label>
            <input type="text" class="form-control" id="suburb" v-bind:value="formData.suburb" />
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>

        <div class="mt-5">
          <DataTable :value="submittedCards" class="p-datatable-gridlines">
            <Column field="username" header="Username"></Column>
            <Column field="password" header="Password"></Column>
            <Column field="isAustralian" header="Australian Resident"></Column>
            <Column field="gender" header="Gender"></Column>
            <Column field="reason" header="Reason"></Column>
            <Column field="suburb" header="Suburb"></Column>
            <Column field="role" header="Role"></Column>
          </DataTable>
        </div>
      </div>
    </div>

    <div class="row justify-content-center mt-5">
      <div class="col-12 col-md-10 col-lg-8">
        <div class="console-panel mb-4">
          <h4>Current User Information</h4>
          <p><strong>Username:</strong> {{ currentUser.username }}</p>
          <p><strong>Email:</strong> {{ currentUser.email }}</p>
          <p><strong>Role:</strong> {{ currentUser.role }}</p>
        </div>
        <div class="text-center">
          <button type="button" class="btn btn-danger" @click="logout">Log Out</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { isAuthenticated } from '@/router'

const router = useRouter()
const auth = getAuth()

const goToFirebaseLogin = () => {
  router.push('/FirebaseLogin')
}

const goToFirebaseRegister = () => {
  router.push('/FirebaseRegister')
}

const firebaseLogout = async () => {
  try {
    await signOut(auth)
    isAuthenticated.value = false
    router.push('/login')
    console.log('User logged out successfully.')
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: '',
  suburb: 'Clayton',
  role: ''
})

const currentUser = ref({
  username: 'john_doe',
  email: 'john@example.com',
  role: 'user'
})

const submittedCards = ref([])
const friendMessage = ref(null)

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  gender: null,
  reason: null,
  role: null
})

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateResident()
  validateGender()
  validateReason()
  validateRole()
  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.resident &&
    !errors.value.gender &&
    !errors.value.reason &&
    !errors.value.role
  ) {
    submittedCards.value.push({ ...formData.value })

    if (formData.value.role === 'admin') {
      console.log('Logging in as Admin')
    } else if (formData.value.role === 'user') {
      console.log('Logging in as User')
    } else if (formData.value.role === 'guest') {
      console.log('Logging in as Guest')
    }
    clearForm()
  }
}

const logout = () => {
  console.log('Logging out...')
  currentUser.value = {
    username: '',
    email: '',
    role: ''
  }
  console.log('User logged out successfully.')
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: '',
    suburb: 'Clayton',
    role: ''
  }
  friendMessage.value = null
}

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const validateResident = () => {
  if (!formData.value.isAustralian) {
    errors.value.resident = 'You must be an Australian resident to proceed.'
  } else {
    errors.value.resident = null
  }
}

const validateGender = () => {
  if (!formData.value.gender) {
    errors.value.gender = 'Please select a gender.'
  } else {
    errors.value.gender = null
  }
}

const validateReason = () => {
  const reason = formData.value.reason
  if (reason.length < 10) {
    errors.value.reason = 'Reason must be at least 10 characters long.'
  } else {
    errors.value.reason = null
  }

  if (reason.includes('friend')) {
    friendMessage.value = 'Great to have a friend'
  } else {
    friendMessage.value = null
  }
}

const validateRole = () => {
  if (!formData.value.role) {
    errors.value.role = 'Please select a role.'
  } else {
    errors.value.role = null
  }
}
</script>

<style scoped>
.table-container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.p-datatable-gridlines {
  margin-top: 20px;
}

.console-panel {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
