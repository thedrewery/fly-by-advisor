<template>
  <div class="app">
  <header>
    <div class="header">
    <img class="logo" src="src/assets/flyadvisorlogo2.png" width="125" height="125" />
    <h1>Fly By Advisor</h1>
    <h2>Track flights in real time</h2>
    <p>{{ flightInfo.response.length }}</p>
    <p>{{ flightInfo.response }}</p>
    </div>
  </header>
  <body>

  </body>
  </div>
</template>

<script>
import process from "dotenv";
const API_KEY = process.env.VUE_APP_API_KEY;
export default {
  data() {
    return {
      flightInfo: {},
    }
  }, 
  created() {
    this.getFlightInfo()
  },
  methods: {
    async getFlightInfo() {
      try {
      const response = await fetch(`https://airlabs.co/api/v9/flights?api_key=${API_KEY}&bbox=34.037416,-118.377254,34.089575,-118.309595`)
        const data = await response.json()
        this.flightInfo = data
        } catch(error) {
          console.log(error)
        }
    }
      }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:ital@1&display=swap');
.header img {
  float: left;
  width: 200px;
  height: 200px;
}

.header h1 {
  font-family: 'Prompt', sans-serif;
  position: relative;
  top: 3px;
  left: 10px;
  bottom: 5px;
  font-size: 80px;
}

.header h2 {
  color: cream;
  font-family: 'Prompt', sans-serif;
  position: relative;
  top: -50px;
  left: 10px;
  font-size: 40px;
}

</style>
