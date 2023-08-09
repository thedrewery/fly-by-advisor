<template>
  <div class="app">
    <header>
      <div class="header">
        <img class="logo" src="/flyadvisorlogo2.png" width="125" height="125" />
        <h1>Fly By Advisor</h1>
        <h2>Track flights in real time</h2>
      </div>
    </header>
    <body>
      <div class="body">
        <FlightMap v-if="isFlightInfoLoaded" :flights="searchedFlights" :searchedCenter="searchedCenter"/>
        <h2>Enter coordinates to find flights in your area</h2>
        <FlightSearch @searchFlights="getFlightInfo" />
        <p v-if="flightInfo.response">{{ flightInfo.response.length }} flights found</p>
        <ul v-if="flightInfo.response">
          <li v-for="flight in flightInfo.response" :key="flight.flight_iata">
            Airline:{{ getAirlineName(flight.airline_iata)}} 
            - Flight#:{{flight.flight_number}} 
            - Status:{{ flight.status }} 
            - Altitude:{{ flight.alt }}m 
            - Speed:{{ flight.speed }}km/hr 
            - Location:{{ flight.lat }}, {{ flight.lng }} 
            - ICAO#:{{ flight.flight_icao }} 
            - Departed:{{ flight.dep_iata }}
            - Arriving:{{ flight.arr_iata }}
            - Updated:{{ formatTimestamp(flight.updated) }}
          </li>
        </ul>
        <p v-if="isLoading">Loading flights...</p>
      </div>
    </body>
  </div>
</template>

<script>
import FlightSearch from "./components/FlightSearch.vue";
import FlightMap from "./components/FlightMap.vue"
import iataDictionary from "./iataDictionary"
const apiKey = import.meta.env.VITE_APP_API_KEY;

export default {
  components: {
    FlightSearch,
    FlightMap
  },
  data() {
    return {
      flightInfo: {},
      isLoading: true,
      isFlightInfoLoaded: false,
      searchedFlights: [],
      searchedCenter: { lat: 34.05, lng: -118.05 },
    }
  }, 
  created() {
    this.getFlightInfo()
  },
  methods: {
    async getFlightInfo(NWLL, SELL, LL) {
      try {
      const response = await fetch(`https://airlabs.co/api/v9/flights?api_key=${apiKey}&bbox=${NWLL},${SELL}`)
        const data = await response.json()
        this.flightInfo = data
        //console.log(data)
        if ((this.flightInfo.response).length > 500) {
          this.searchedFlights = (this.flightInfo.response).slice(0, 500)
        } else {
          this.searchedFlights = this.flightInfo.response
        }
        if ((NWLL) && (SELL)) {
          let [lat, lng] = LL.split(" ")
          this.searchedCenter.lat = parseFloat(lat);
          this.searchedCenter.lng = parseFloat(lng);
        }
        } catch(error) {
          console.log(error)
        } finally {
        this.isLoading = false;
        this.isFlightInfoLoaded = true;
        }
    },
    getAirlineName(airlineIata) {
      if (iataDictionary[airlineIata]) {
        return iataDictionary[airlineIata];
      } else {
        return airlineIata;
      }
    },
    formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000); // Convert to milliseconds

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (date >= today) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleString(); // Adjust the formatting as needed
    }
  },
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
  font-size: 12px;
}


</style>
