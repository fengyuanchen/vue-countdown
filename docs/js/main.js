window.onload = function () {
  Vue.component(VueCountdown.name, VueCountdown);

  new Vue({
    el: '#app',
    data: function () {
      var now = new Date();
      var newYear = new Date(now.getFullYear() + 1, 0, 1);

      return {
        counting: false,
        time: newYear - now,
      };
    },
    methods: {
      startCountdown: function () {
        this.counting = true;
      },
      handleCountdownEnd: function () {
        this.counting = false;
      },
    }
  });

  if (typeof hljs !== 'undefined') {
    hljs.initHighlightingOnLoad();
  }
};
