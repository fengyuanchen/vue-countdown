/*!
 * vue-countdown v0.2.0
 * https://github.com/xkeshi/vue-countdown
 *
 * Copyright (c) 2017 xkeshi
 * Released under the MIT license
 *
 * Date: 2017-09-11T02:19:01.459Z
 */

var MILLISECONDS_SECOND = 1000;
var MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
var MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
var MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;

var index = {
  data: function data() {
    return {
      /**
       * Total number of time (in milliseconds) for the countdown.
       * @type {number}
       */
      count: 0,

      /**
       * Define if the time is countdowning.
       * @type {boolean}
       */
      counting: false
    };
  },


  props: {
    /**
     * Start to countdown automatically when initialized.
     */
    autoStart: {
      type: Boolean,
      default: true
    },

    /**
     * Update interval time (in milliseconds) of the countdown.
     */
    interval: {
      type: Number,
      default: 1000
    },

    /**
     * Total number of time (in milliseconds) for the countdown.
     */
    time: {
      type: Number,
      default: 0,
      required: true,
      validator: function validator(value) {
        return value >= 0;
      }
    },

    /**
     * The tag of the component root element in the countdown.
     */
    tag: {
      type: String,
      default: 'span'
    }
  },

  computed: {
    /**
     * Remaining days.
     * @returns {number}
     */
    days: function days() {
      return Math.floor(this.count / MILLISECONDS_DAY);
    },


    /**
     * Remaining hours.
     * @returns {number}
     */
    hours: function hours() {
      return Math.floor(this.count % MILLISECONDS_DAY / MILLISECONDS_HOUR);
    },


    /**
     * Remaining minutes.
     * @returns {number}
     */
    minutes: function minutes() {
      return Math.floor(this.count % MILLISECONDS_HOUR / MILLISECONDS_MINUTE);
    },


    /**
     * Remaining seconds.
     * @returns {number}
     */
    seconds: function seconds() {
      var interval = this.interval;
      var seconds = this.count % MILLISECONDS_MINUTE / MILLISECONDS_SECOND;

      if (interval < 10) {
        return seconds.toFixed(3);
      } else if (interval >= 10 && interval < 100) {
        return seconds.toFixed(2);
      } else if (interval >= 100 && interval < 1000) {
        return seconds.toFixed(1);
      }

      return Math.floor(seconds);
    },


    /**
     * All remaining days.
     * @returns {number}
     */
    totalDays: function totalDays() {
      return this.days;
    },


    /**
     * All remaining hours.
     * @returns {number}
     */
    totalHours: function totalHours() {
      return this.totalDays * (MILLISECONDS_DAY / MILLISECONDS_HOUR) + this.hours;
    },


    /**
     * All remaining minutes.
     * @returns {number}
     */
    totalMinutes: function totalMinutes() {
      return this.totalHours * (MILLISECONDS_HOUR / MILLISECONDS_MINUTE) + this.minutes;
    },


    /**
     * All remaining seconds.
     * @returns {number}
     */
    totalSeconds: function totalSeconds() {
      return this.totalMinutes * (MILLISECONDS_MINUTE / MILLISECONDS_SECOND) + this.seconds;
    },


    /**
     * All remaining milliseconds.
     * @returns {number}
     */
    totalMilliseconds: function totalMilliseconds() {
      return this.count;
    }
  },

  render: function render(createElement) {
    return createElement(this.tag, this.$scopedSlots.default ? [this.$scopedSlots.default({
      days: this.days,
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
      totalDays: this.totalDays,
      totalHours: this.totalHours,
      totalMinutes: this.totalMinutes,
      totalSeconds: this.totalSeconds,
      totalMilliseconds: this.totalMilliseconds
    })] : this.$slots.default);
  },
  created: function created() {
    if (this.time > 0) {
      this.count = this.time;
    }
  },
  mounted: function mounted() {
    if (this.autoStart) {
      this.start();
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.destroy();
  },


  watch: {
    time: function time() {
      if (this.time > 0) {
        this.count = this.time;

        if (this.autoStart) {
          this.start();
        }
      }
    }
  },

  methods: {
    /**
     * Start to countdown.
     * @public
     * @emits Countdown#countdownstart
     */
    start: function start() {
      if (this.counting) {
        return;
      }

      /**
       * Countdown start event.
       * @event Countdown#countdownstart
       */
      this.$emit('countdownstart');
      this.counting = true;
      this.step();
    },


    /**
     * Step to countdown.
     * @private
     * @emits Countdown#countdownprogress
     */
    step: function step() {
      var _this = this;

      if (!this.counting) {
        return;
      }

      /**
       * Countdown progress event.
       * @event Countdown#countdownprogress
       */
      this.$emit('countdownprogress', {
        days: this.days,
        hours: this.hours,
        minutes: this.minutes,
        seconds: this.seconds
      });

      if (this.count > 0) {
        var interval = this.interval;

        this.timeout = setTimeout(function () {
          _this.count -= interval;
          _this.step();
        }, interval);
      } else {
        this.stop();
      }
    },


    /**
     * Stop the countdown.
     * @public
     * @emits Countdown#countdownend
     */
    stop: function stop() {
      this.destroy();

      /**
       * Countdown end event.
       * @event Countdown#countdownend
       */
      this.$emit('countdownend');
    },


    /**
     * Destroy the countdown.
     * @private
     */
    destroy: function destroy() {
      this.counting = false;
      clearTimeout(this.timeout);
    }
  }
};

export default index;
