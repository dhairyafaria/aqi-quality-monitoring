import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cities: [],
  },
  mutations: {
    updateAllCities(state, cities) {
      state.cities = cities;
    },
  },
  getters: {
    getAllCities: (state) => state.cities.map((i) => {
      const city = {};
      const currentAqi = i.aqis[0];
      city.name = i.name;
      city.aqi = currentAqi.value;
      city.time = currentAqi.time;
      return city;
    }),
  },
});
