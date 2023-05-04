<template>
  <div class="app">
    <header>
      <div class="header">
        <img class="logo" src="src/assets/flyadvisorlogo2.png" width="125" height="125" />
        <h1>Fly By Advisor</h1>
        <h2>Track flights in real time</h2>
      </div>
    </header>
    <body>
      <div class="body">
        <h2>Enter coordinates to find flights in your area</h2>
        <FlightSearch @searchFlights="getFlightInfo" />
        <p v-if="flightInfo.response">{{ flightInfo.response.length }} flights found</p>
        <ul v-if="flightInfo.response">
          <li v-for="flight in flightInfo.response" :key="flight.flight_iata">
            Airline:{{ getAirlineName(flight.airline_iata)}} - Flight Number:{{flight.flight_number}} - Status:{{ flight.status }} - Altitude:{{ flight.alt }}m - Speed:{{ flight.speed }}km/hr - Location:{{ flight.lat }}, {{ flight.lng }}
          </li>
        </ul>
      </div>
    </body>
  </div>
</template>

<script>
import FlightSearch from "./components/FlightSearch.vue";
import iataDictionary from "./iataDictionary"
const apiKey = import.meta.env.VITE_APP_API_KEY;

export default {
  components: {
    FlightSearch,
  },
  data() {
    return {
      flightInfo: {},
    }
  }, 
  created() {
    this.getFlightInfo()
  },
  methods: {
    async getFlightInfo(NWLL, SELL) {
      try {
      const response = await fetch(`https://airlabs.co/api/v9/flights?api_key=${apiKey}&bbox=${NWLL},${SELL}`)
        const data = await response.json()
        this.flightInfo = data
        } catch(error) {
          console.log(error)
        }
    },
    getAirlineName(airlineIata) {
      return iataDictionary[airlineIata];
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

.body {
  font-family: 'Prompt', sans-serif;
  display: block;
}


</style>
