const MILLISECONDS_SECOND = 1000;
const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;

export default {
  data() {
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
      counting: false,

      /**
       * The absolute end time.
       * @type {number}
       */
      endTime: 0,
    };
  },

  props: {
    /**
     * Start to countdown automatically when initialized.
     */
    autoStart: {
      type: Boolean,
      default: true,
    },

    /**
     * Indicate if emit the countdown events or not.
     */
    emitEvents: {
      type: Boolean,
      default: true,
    },

    /**
     * Update interval time (in milliseconds) of the countdown.
     */
    interval: {
      type: Number,
      default: 1000,
    },

    /**
     * Add a leading zero to the output numbers if they are less than 10.
     */
    leadingZero: {
      type: Boolean,
      default: true,
    },

    /**
     * Generate the current time of a specific time zone.
     */
    now: {
      type: Function,
      default: () => Date.now(),
    },

    /**
     * Total number of time (in milliseconds) for the countdown.
     */
    time: {
      type: Number,
      default: 0,
      required: true,
      validator: value => value >= 0,
    },

    /**
     * The tag of the component root element in the countdown.
     */
    tag: {
      type: String,
      default: 'span',
    },
  },

  computed: {
    /**
     * Remaining days.
     * @returns {number}
     */
    days() {
      return Math.floor(this.count / MILLISECONDS_DAY);
    },

    /**
     * Remaining hours.
     * @returns {number}
     */
    hours() {
      return Math.floor((this.count % MILLISECONDS_DAY) / MILLISECONDS_HOUR);
    },

    /**
     * Remaining minutes.
     * @returns {number}
     */
    minutes() {
      return Math.floor((this.count % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE);
    },

    /**
     * Remaining seconds.
     * @returns {number}
     */
    seconds() {
      const { interval } = this;
      const seconds = (this.count % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND;

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
     * Total remaining days.
     * @returns {number}
     */
    totalDays() {
      return this.days;
    },

    /**
     * Total remaining hours.
     * @returns {number}
     */
    totalHours() {
      return Math.floor(this.count / MILLISECONDS_HOUR);
    },

    /**
     * Total remaining minutes.
     * @returns {number}
     */
    totalMinutes() {
      return Math.floor(this.count / MILLISECONDS_MINUTE);
    },

    /**
     * Total remaining seconds.
     * @returns {number}
     */
    totalSeconds() {
      return Math.floor(this.count / MILLISECONDS_SECOND);
    },
  },

  render(createElement) {
    const preprocess = value => (this.leadingZero && value < 10 ? `0${value}` : value);

    return createElement(this.tag, this.$scopedSlots.default ? [
      this.$scopedSlots.default({
        days: preprocess(this.days),
        hours: preprocess(this.hours),
        minutes: preprocess(this.minutes),
        seconds: preprocess(this.seconds),
        totalDays: this.totalDays,
        totalHours: this.totalHours,
        totalMinutes: this.totalMinutes,
        totalSeconds: this.totalSeconds,
      }),
    ] : this.$slots.default);
  },

  created() {
    this.init();
  },

  mounted() {
    if (this.autoStart) {
      this.start();
    }

    window.addEventListener('focus', (this.onFocus = this.update.bind(this)));
  },

  beforeDestroy() {
    window.removeEventListener('focus', this.onFocus);
    clearTimeout(this.timeout);
  },

  watch: {
    time() {
      this.init();
    },
  },

  methods: {
    /**
     * Initialize count.
     */
    init() {
      const { time } = this;

      if (time > 0) {
        this.count = time;
        this.endTime = this.now() + time;
      }
    },

    /**
     * Start to countdown.
     * @public
     * @emits Countdown#countdownstart
     */
    start() {
      if (this.counting) {
        return;
      }

      if (this.emitEvents) {
        /**
         * Countdown start event.
         * @event Countdown#countdownstart
         */
        this.$emit('countdownstart');
      }

      this.counting = true;
      this.step();
    },

    /**
     * Step to countdown.
     * @private
     * @emits Countdown#countdownprogress
     */
    step() {
      if (!this.counting) {
        return;
      }

      if (this.emitEvents) {
        /**
         * Countdown progress event.
         * @event Countdown#countdownprogress
         */
        this.$emit('countdownprogress', {
          days: this.days,
          hours: this.hours,
          minutes: this.minutes,
          seconds: this.seconds,
        });
      }

      if (this.count > 0) {
        const { interval } = this;

        this.timeout = setTimeout(() => {
          this.count -= interval;
          this.step();
        }, interval);
      } else {
        this.count = 0;
        this.stop();
      }
    },

    /**
     * Stop the countdown.
     * @public
     * @emits Countdown#countdownend
     */
    stop() {
      this.counting = false;
      this.timeout = undefined;

      if (this.emitEvents) {
        /**
         * Countdown end event.
         * @event Countdown#countdownend
         */
        this.$emit('countdownend');
      }
    },

    /**
     * Update the count.
     * @private
     */
    update() {
      if (this.counting) {
        this.count = Math.max(0, this.endTime - this.now());
      }
    },
  },
};
