<template>
    <div class="container">
        <canvas v-show="cityDetails.length > 1" id="line-chart" width="400" height="400"></canvas>
        <span v-if="cityDetails.length <= 1">Loading...</span>
    </div>
</template>
<script>
import Chart from 'chart.js/auto';
import utilsMixin from '../mixins/utils';

export default {
  name: 'City',
  mixins: [utilsMixin],
  data() {
    return {
      city: this.$route.params.name,
      lineChart: null,
    };
  },
  computed: {
    cityDetails() {
      const cityAqis = this.$store.getters.getCityDetails(this.city).aqis;
      return cityAqis.sort((a, b) => a.time - b.time);
    },
    chartData() {
      const labels = this.cityDetails.map((i) => this.getFormattedDate(i.time));
      const data = this.cityDetails.map((i) => i.value.toFixed());
      const backgroundColor = this.cityDetails.map((i) => this.getColorsForAqi(i.value.toFixed()));
      return {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: `AQI details for ${this.city}`,
            data,
            backgroundColor,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      };
    },
  },
  mounted() {
    this.addLineChart();
  },
  methods: {
    addLineChart() {
      if (this.cityDetails.length > 1) {
        const ctx = document.getElementById('line-chart');
        this.lineChart = new Chart(ctx, this.chartData);
      }
    },
    getFormattedDate(date) {
      return new Date(date).toLocaleString('en-US', {
        hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true,
      });
    },
  },
  watch: {
    cityDetails() {
      if (this.lineChart) {
        const labels = this.cityDetails.map((i) => this.getFormattedDate(i.time));
        const data = this.cityDetails.map((i) => i.value.toFixed());
        const backgroundColor = this.cityDetails
          .map((i) => this.getColorsForAqi(i.value.toFixed()));
        this.lineChart.data.labels = labels;
        this.lineChart.data.datasets[0].data = data;
        this.lineChart.data.datasets[0].backgroundColor = backgroundColor;
        this.lineChart.update();
      } else {
        this.addLineChart();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
    .container {
        width: 80%;
        margin: 20px auto;
    }
</style>
