<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <v-app id="aqiTable" v-if="cities.length > 0">
      <v-data-table
        :headers="tableHeaders"
        :items-per-page="15"
        :items="cities"
        class="elevation-1 aqi-table"
      >
        <template v-slot:[`item.name`]="{ item }">
          <router-link :to="`/city/${item.name}`">{{item.name}}</router-link>
        </template>
        <template v-slot:[`item.aqi`]="{ item }">
          <span class="aqi-col-value"
            :class="{
              'good': item.aqi >= 0 && item.aqi <= 50,
              'satisfactory': item.aqi > 50 && item.aqi <= 100,
              'moderate': item.aqi > 100 && item.aqi <= 200,
              'poor': item.aqi > 200 && item.aqi <= 300,
              'very-poor': item.aqi > 300 && item.aqi <= 400,
              'severe': item.aqi > 400,
            }"
          >
            {{ item.aqi | formatNumber }}
          </span>
        </template>
        <template v-slot:[`item.time`]="{ item }">
          <span>{{ timeAgo(item.time) }}</span>
        </template>
      </v-data-table>
    </v-app>
    <div v-if="cities.length == 0">Loading...</div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import utilsMixin from '../mixins/utils';

export default {
  name: 'Home',
  components: {
    // HelloWorld,
  },
  mixins: [
    utilsMixin,
  ],
  computed: {
    cities() {
      return this.$store.getters.getAllCities;
    },
  },
  data() {
    return {
      tableHeaders: [
        {
          text: 'City',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Current AQI',
          sortable: true,
          value: 'aqi',
        },
        {
          text: 'Last Updated',
          sortable: true,
          value: 'time',
        },
      ],
    };
  },
  filters: {
    formatNumber(value) {
      return value.toFixed(2);
    },
  },
};
</script>
<style lang="scss" scoped>
  .home {
    .aqi-table {
      .aqi-col-value {
        &.good {
          color: green;
        }
        &.satisfactory {
          color: lightgreen;
        }
        &.moderate {
          color: #dcdc4f;
        }
        &.poor {
          color: orange;
        }
        &.very-poor {
          color: lightcoral;
        }
        &.severe {
          color: red;
        }
      }
    }
  }
</style>
