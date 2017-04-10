window.addEventListener('DOMContentLoaded', function () {
  var Vue = window.Vue;
  var VueCountdown = window.VueCountdown;
  var App = {
    template: '#examples',
    data: function () {
      const now = new Date();
      const newYear = new Date(now.getFullYear() + 1, 0, 1);

      return {
        counting: false,
        time: newYear - now,
      };
    },
    methods: {
      countdown: function () {
        this.counting = true;
      },
      countdownend: function () {
        this.counting = false;
      },
    },
  };

  Vue.use(VueCountdown);

  new Vue({
    el: '.app',
    render: function (createElement) {
      return createElement(App);
    },
  });
}, false);
