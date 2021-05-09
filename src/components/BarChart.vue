<template>
    <canvas id="bar-chart" width="400" height="400"></canvas>
</template>
<script>
import Chart from 'chart.js/auto';
import utilsMixin from '../mixins/utils';

export default {
  name: 'BarChart',
  mixins: [utilsMixin],
  props: {
    cities: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      barChart: null,
    };
  },
  computed: {
    chartData() {
      const labels = this.cities.map((i) => i.name);
      const data = this.cities.map((i) => i.aqi);
      const backgroundColor = this.cities.map((i) => this.getColorsForAqi(i.aqi));
      return {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'AQI for Indian Cities',
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
    const ctx = document.getElementById('bar-chart');
    this.barChart = new Chart(ctx, this.chartData);
  },
  watch: {
    cities() {
      const data = this.cities.map((i) => i.aqi);
      const backgroundColor = this.cities.map((i) => this.getColorsForAqi(i.aqi));
      this.barChart.data.datasets[0].data = data;
      this.barChart.data.datasets[0].backgroundColor = backgroundColor;
      this.barChart.update();
    },
  },
};
</script>
