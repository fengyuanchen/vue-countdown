window.onload = function () {
  // eslint-disable-next-line no-undef
  Vue.component(VueCountdown.name, VueCountdown);

  // eslint-disable-next-line no-new
  new Vue({
    el: '#app',
    data() {
      const now = new Date();
      const newYear = new Date(now.getFullYear() + 1, 0, 1);
      const lastYar = new Date(now.getFullYear(), 0, 1);

      return {
        counting: false,
        time: newYear - now,
        lastTime: lastYar - now,
      };
    },
    methods: {
      startCountdown() {
        this.counting = true;
      },
      handleCountdownEnd() {
        this.counting = false;
      },
    },
  });
};
