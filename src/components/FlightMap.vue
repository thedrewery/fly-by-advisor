<template>
  <GoogleMap :api-key="mapsApiKey" style="width: 100%; height: 500px" :center="center" :zoom="10">
    <Marker v-for="flight in flights" :key="flight.reg_number" :options="getMarkerOptions(flight)" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";


export default defineComponent({
  components: { GoogleMap, Marker },
  props: {
    flights: {
      type: Array
    },
  },
  setup() {
    const mapsApiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
    const center = { lat: 34.049247, lng: -118.054502 };
    const getMarkerOptions = (flight) => {
      return {
        position: { lat: flight.lat, lng: flight.lng},
        label: flight.flight_icao,
        icon: "src/assets/airplaneIconSmall.png"
      }
    }
    return { mapsApiKey, center, getMarkerOptions };
  },
});
</script>