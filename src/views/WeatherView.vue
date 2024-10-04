<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
    </div>

    <div class="search-bar">
      <input
        type="text"
        v-model="city"
        placeholder="Enter city name (e.g., Clayton, AU)"
        class="search-input"
      />
      <button @click="searchByCity" class="search-button">Search</button>
    </div>

    <main>
      <div v-if="weatherData">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <span>{{ weatherData.weather[0].description }}</span>
      </div>

      <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'

const apikey = '19bccd8ae97dad9bda9dcb51d1823ed1'

export default {
  name: 'App',
  data() {
    return {
      city: '',
      weatherData: null,
      errorMessage: null
    }
  },
  computed: {
    temperature() {
      return this.weatherData ? Math.round(this.weatherData.main.temp) : null
    },

    iconUrl() {
      return this.weatherData
        ? `http://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`
        : null
    }
  },
  methods: {
    async searchByCity() {
      if (!this.city) {
        this.errorMessage = 'Please enter a city name.'
        return
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${apikey}`

      try {
        const response = await axios.get(url)
        this.weatherData = response.data
        this.errorMessage = null
      } catch (error) {
        console.error('Error fetching weather data:', error)
        this.errorMessage = 'City not found or error fetching data.'
        this.weatherData = null
      }
    },

    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`
          await this.fetchWeatherData(url)
        })
      }
    },

    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url)
        this.weatherData = response.data
        this.errorMessage = null
      } catch (error) {
        console.error('Error fetching weather data:', error)
        this.errorMessage = 'Error fetching weather data.'
        this.weatherData = null
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

.search-bar {
  margin: 20px 0;
}

.search-input {
  padding: 10px;
  font-size: 16px;
}

.search-button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.weather-result {
  margin-top: 20px;
}

.error-message {
  color: red;
  margin-top: 20px;
}
</style>
