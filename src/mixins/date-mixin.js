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

      if (seconds < 5) {
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
      return date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
    },
  },
};
