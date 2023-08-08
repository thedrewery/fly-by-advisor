<template>
  <div class="flight-search">
    <form @submit.prevent="submitForm">
      <label for="LL">Latitude, Longitude:</label>
      <input type="text" id="LL" v-model="LL" required>
      <button type="submit">Search Flights</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      LL: "",
      NWLL: "",
      SELL: "",
    };
  },
  methods: {
    submitForm() {
      const [lat, lng] = this.LL.split(" ");
      const parsedLat = parseFloat(lat);
      const parsedLng = parseFloat(lng);
      this.NWLL = `${(parsedLat + 0.05)}, ${parsedLng - 0.05}`;
      this.SELL = `${(parsedLat - 0.05)}, ${parsedLng + 0.05}`;
      console.log("NWLL", this.NWLL, "SELL", this.SELL, "LL", this.LL);
      this.$emit("searchFlights", this.NWLL, this.SELL, this.LL);
    },
  },
};
</script>

<style>
form {
  display: flex;
  justify-content: space-around;
}

input {
  width: 200px;
}


button {
  font-family: 'Prompt', sans-serif;
  background: #AC3032;
  color: white;
  border-radius: 5px;
}

</style>