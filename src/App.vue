<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      connection: null,
      cities: [],
    };
  },
  created() {
    console.log('Starting connection to WebSocket Server');
    this.connection = new WebSocket('wss://city-ws.herokuapp.com/');

    this.connection.onmessage = (event) => {
      console.log(event);
      this.updateCitiesData(JSON.parse(event.data));
    };

    this.connection.onopen = (event) => {
      console.log(event);
      console.log('Successfully connected to the echo websocket server...');
    };
  },
  destroy() {
    // closing connection after closing the app
    this.connection.close();
    this.connection = null;
  },
  methods: {
    updateCitiesData(cities) {
      const date = new Date();
      cities.forEach((e) => {
        const aqi = {
          value: e.aqi,
          time: date,
        };
        const isCityPresent = this.cities.findIndex((x) => x.name === e.city);
        if (isCityPresent > -1) {
          this.cities[isCityPresent].aqis.unshift(aqi);
        } else {
          const city = {};
          city.name = e.city;
          city.aqis = [];
          city.aqis.push(aqi);
          this.cities.push(city);
        }
      });
      this.$store.commit('updateAllCities', this.cities);
    },
  },
};
</script>
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
