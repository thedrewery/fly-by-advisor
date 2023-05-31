<template>
  <GoogleMap :api-key="mapsApiKey" style="width: 100%; height: 500px" :center="center" :zoom="10">
    <Marker :options="markerOptions" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";


export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const mapsApiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
    const center = { lat: 34.049247, lng: -118.054502 };
    const markerOptions = { position: { lat: 34.14, lng: -118.04 }, label: "FL1189", title: "Aéromexico" }

    return { mapsApiKey, center, markerOptions };
  },
});
</script>