<template>
  <div class="flight-search">
    <form @submit.prevent="submitForm">
      <label for="NWLL">North-West Longitude and Latitude:</label>
      <input type="text" id="NWLL" v-model="NWLL" required>
      <label for="SWLL">South-West Longitude and Latitude:</label>
      <input type="text" id="SWLL" v-model="SWLL" required>
      <button type="submit">Search Flights</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      NWLL: "",
      SWLL: "",
    };
  },
  methods: {
    submitForm() {
      this.$emit("searchFlights", this.NWLL, this.SWLL);
    },
  },
};
</script>

<style>

</style>