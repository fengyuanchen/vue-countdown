import { mount } from '@vue/test-utils';
import VueCountdown from '../src';

describe('props', () => {
  describe('auto-start', () => {
    it('should be `true` by default', () => {
      const wrapper = mount(VueCountdown, {
        props: {
          time: 5000,
        },
      });

      expect(wrapper.props('autoStart')).toBe(true);
      expect(wrapper.vm.counting).toBe(true);
    });

    it('should be `false`', () => {
      const wrapper = mount(VueCountdown, {
        props: {
          autoStart: false,
          time: 5000,
        },
      });

      expect(wrapper.props('autoStart')).toBe(false);
      expect(wrapper.vm.counting).toBe(false);
    });

    it('should start the countdown when set to `true` manually', (done) => {
      mount({
        components: {
          VueCountdown,
        },
        data() {
          return {
            autoStart: false,
          };
        },
        mounted() {
          setTimeout(() => {
            this.autoStart = true;
          }, 100);
        },
        methods: {
          onCountdownStart() {
            done();
          },
        },
        template: '<vue-countdown :time="5000" @start="onCountdownStart" />',
      });
    });
  });

  describe('emit-events', () => {
    it('should be `true` by default', (done) => {
      mount({
        components: {
          VueCountdown,
        },
        methods: {
          onCountdownStart() {
            done();
          },
        },
        template: '<vue-countdown :time="5000" @start="onCountdownStart" />',
      });
    });

    it('should be `false`', () => {
      mount({
        components: {
          VueCountdown,
        },
        methods: {
          onCountdownStart() {
            throw new Error();
          },
        },
        template: '<vue-countdown :time="5000" :emit-events="false" @start="onCountdownStart" />',
      });
    });
  });

  describe('interval', () => {
    it('should be `1000` by default', () => {
      const wrapper = mount(VueCountdown, {
        props: {
          time: 5000,
        },
      });

      expect(wrapper.props('interval')).toBe(1000);
    });

    it('should be `100`', () => {
      const wrapper = mount(VueCountdown, {
        props: {
          interval: 100,
          time: 5000,
        },
      });

      expect(wrapper.props('interval')).toBe(100);
    });

    it('should use the minimum value of `time` and `interval` as interval', (done) => {
      mount({
        components: {
          VueCountdown,
        },
        data() {
          return {
            startTime: 0,
          };
        },
        methods: {
          onCountdownStart() {
            this.startTime = Date.now();
          },
          onCountdownEnd() {
            const interval = Date.now() - this.startTime;

            expect(interval).toBeLessThan(200);
            done();
          },
        },
        template: '<vue-countdown :time="100" :interval="200" @start="onCountdownStart" @end="onCountdownEnd" />',
      });
    });
  });

  describe('now', () => {
    it('should be now by default', () => {
      const wrapper = mount(VueCountdown, {
        props: {
          time: 5000,
        },
      });

      expect(wrapper.vm.now()).toBe(Date.now());
    });

    it('should match the given time', () => {
      const date = new Date();
      const wrapper = mount(VueCountdown, {
        props: {
          now: () => new Date(Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
          )).getTime(),
          time: 5000,
        },
      });

      expect(wrapper.vm.now()).toBeGreaterThan(new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      ).getTime());
    });
  });

  describe('tag', () => {
    it('should be "span" by default', () => {
      const wrapper = mount(VueCountdown);

      expect(wrapper.props('tag')).toBe('span');
      expect(wrapper.vm.$el.tagName.toLowerCase()).toBe('span');
    });

    it('should be "div" by default', () => {
      const wrapper = mount(VueCountdown, {
        props: {
          tag: 'div',
        },
      });

      expect(wrapper.props('tag')).toBe('div');
      expect(wrapper.vm.$el.tagName.toLowerCase()).toBe('div');
    });
  });

  describe('time', () => {
    it('should be `0` by default', () => {
      const wrapper = mount(VueCountdown);

      expect(wrapper.props('time')).toBe(0);
    });

    it('should be `1000` by default', () => {
      const wrapper = mount(VueCountdown, {
        props: {
          time: 1000,
        },
      });

      expect(wrapper.props('time')).toBe(1000);
    });

    it('should update the countdown when the `time` prop is changed', (done) => {
      mount({
        components: {
          VueCountdown,
        },
        data() {
          return {
            time: 1000,
          };
        },
        mounted() {
          expect((this.$refs.countdown as any).totalMilliseconds).toBe(1000);
          this.time = 2000;
          this.$nextTick(() => {
            expect((this.$refs.countdown as any).totalMilliseconds).toBe(2000);
            done();
          });
        },
        template: '<vue-countdown ref="countdown" :time="time" />',
      });
    });
  });

  describe('transform', () => {
    it('should not transform the output props by default', (done) => {
      mount({
        components: {
          VueCountdown,
        },
        mounted() {
          expect(this.$el.textContent).toBe('0 days, 0 hours, 0 minutes, 2 seconds, 0 milliseconds.');
          done();
        },
        template: '<vue-countdown :time="2000" v-slot="{ days, hours, minutes, seconds, milliseconds }">{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds, {{ milliseconds }} milliseconds.</vue-countdown>',
      });
    });

    it('should transform the output props', (done) => {
      mount({
        components: {
          VueCountdown,
        },
        mounted() {
          expect(this.$el.textContent).toBe('00 days, 00 hours, 00 minutes, 02 seconds, 00 milliseconds.');
          done();
        },
        methods: {
          transform(props: Record<string, number>) {
            const formattedProps: Record<string, string> = {};

            Object.entries(props).forEach(([key, value]) => {
              formattedProps[key] = value < 10 ? `0${value}` : String(value);
            });

            return formattedProps;
          },
        },
        template: '<vue-countdown :time="2000" :transform="transform" v-slot="{ days, hours, minutes, seconds, milliseconds }">{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds, {{ milliseconds }} milliseconds.</vue-countdown>',
      });
    });
  });
});
