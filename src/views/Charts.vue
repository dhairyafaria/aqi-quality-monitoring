<template>
  <div class="charts">
    <BarChart v-if="cities.length > 0" :cities="cities"/>
    <div v-if="cities.length == 0">Loading...</div>
  </div>
</template>
<script>
import BarChart from '@/components/BarChart.vue';

export default {
  name: 'Charts',
  components: {
    BarChart,
  },
  computed: {
    cities() {
      return this.$store.getters.getAllCities;
    },
  },
};
</script>
