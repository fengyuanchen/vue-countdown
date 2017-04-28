window.addEventListener('DOMContentLoaded', function () {
  var Vue = window.Vue;
  var VueCountdown = window.VueCountdown;

  Vue.component('countdown', VueCountdown);

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
      countdown: function () {
        this.counting = true;
      },
      countdownend: function () {
        this.counting = false;
      },
    },
  });
});
