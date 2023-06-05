<template>
  <GoogleMap :api-key="mapsApiKey" style="width: 100%; height: 500px" :center="center" :zoom="10">
    <Marker v-for="flight in flights" :key="flight.reg_number" :options="getMarkerOptions(flight)" />
  </GoogleMap>
</template>

<script>
import { defineComponent, ref, watch, computed } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";


export default defineComponent({
  // eslint-disable-next-line
  components: { GoogleMap, Marker }, //eslint ignore
  props: {
    flights: {
      type: Array
    },
    searchedCenter: {
      type: Object,
      default: () => ({ lat: 34.05, lng: -118.05 })
    },
  },
  setup(props) {
    const mapsApiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
    const searchedCenterRef = ref(props.searchedCenter)

    watch(
      () => props.searchedCenter,
      (newVal) => {
        Object.assign(searchedCenterRef.value, newVal);
      }
    );

    const center = computed(() => ({
      lat: searchedCenterRef.value.lat,
      lng: searchedCenterRef.value.lng
    }));
    console.log("this is FlightMap center", center)
    const getMarkerOptions = (flight) => {
      return {
        position: { lat: flight.lat, lng: flight.lng},
        label: flight.flight_icao,
        icon: "/airplaneIconSmall.png"
      }
    }
    return { mapsApiKey, center, getMarkerOptions };
  },
});
</script>