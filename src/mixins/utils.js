export default {
  methods: {
    timeAgo(dateParam) {
      if (!dateParam) {
        return null;
      }

      const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
      const today = new Date();
      const seconds = Math.round((today - date) / 1000);
      const minutes = Math.round(seconds / 60);
      const hours = Math.round(minutes / 60);

      if (seconds < 2) {
        return 'now';
      } if (seconds < 60) {
        return `${seconds} seconds ago`;
      } if (seconds < 90) {
        return 'about a minute ago';
      } if (minutes < 60) {
        return `${minutes} minutes ago`;
      } if (minutes < 90) {
        return 'about a hour ago';
      } if (hours < 12) {
        return `${hours} hours ago`;
      }
      return date.toLocaleString('en-US', {
        hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true,
      });
    },
    getColorsForAqi(value) {
      if (value >= 0 && value <= 50) return 'green';
      if (value > 50 && value <= 100) return 'lightgreen';
      if (value > 100 && value <= 200) return '#dcdc4f';
      if (value > 200 && value <= 300) return 'orange';
      if (value > 300 && value <= 400) return 'lightcoral';
      return 'red';
    },
  },
};
