import { mount } from '@vue/test-utils';
import VueCountdown from '../src';

describe('events', () => {
  describe('start', () => {
    it('should trigger the `start` event', (done) => {
      mount({
        components: {
          VueCountdown,
        },
        methods: {
          onCountdownStart() {
            done();
          },
        },
        template: '<vue-countdown :time="1000" @start="onCountdownStart" />',
      });
    });

    it('should not trigger the `start` event when the `emit-events` property is set to `false`', (done) => {
      mount({
        components: {
          VueCountdown,
        },
        methods: {
          onCountdownStart() {
            throw new Error();
          },
        },
        template: '<vue-countdown :time="1000" :emit-events="false" @start="onCountdownStart" />',
      });
      setTimeout(done, 1000);
    });
  });

  describe('progress', () => {
    it('should trigger the `progress` event', (done) => {
      mount({
        components: {
          VueCountdown,
        },
        methods: {
          onCountdownProgress() {
            done();
          },
        },
        template: '<vue-countdown :time="2000" @progress="onCountdownProgress" />',
      });
    });

    it('should not trigger the `progress` event when the `emit-events` property is set to `false`', (done) => {
      mount({
        components: {
          VueCountdown,
        },
        methods: {
          onCountdownProgress() {
            throw new Error();
          },
        },
        template: '<vue-countdown :time="2000" :emit-events="false" @progress="onCountdownProgress" />',
      });
      setTimeout(done, 1000);
    });

    it('should not trigger the `progress` event when the time is less then the interval', (done) => {
      mount({
        components: {
          VueCountdown,
        },
        mounted() {
          setTimeout(done, 200);
        },
        methods: {
          handleCountdownProgress() {
            throw new Error();
          },
        },
        template: '<vue-countdown :time="100" :interval="200" @progress="handleCountdownProgress" />',
      });
    });
  });

  describe('abort', () => {
    it('should trigger the `abort` event', (done) => {
      mount({
        components: {
          VueCountdown,
        },
        mounted() {
          setTimeout(() => {
            (this.$refs.countdown as any).abort();
          }, 500);
        },
        methods: {
          onCountdownAbort() {
            done();
          },
        },
        template: '<vue-countdown ref="countdown" :time="1000" :interval="100" @abort="onCountdownAbort" />',
      });
    });

    it('should not trigger the `abort` event when the `emit-events` property is set to `false`', (done) => {
      mount({
        components: {
          VueCountdown,
        },
        mounted() {
          setTimeout(() => {
            (this.$refs.countdown as any).abort();
            setTimeout(done, 500);
          }, 500);
        },
        methods: {
          onCountdownAbort() {
            throw new Error();
          },
        },
        template: '<vue-countdown ref="countdown" :time="1000" :interval="100" :emit-events="false" @abort="onCountdownAbort" />',
      });
    });
  });

  describe('end', () => {
    it('should trigger the `end` event', (done) => {
      mount({
        components: {
          VueCountdown,
        },
        methods: {
          onCountdownEnd() {
            done();
          },
        },
        template: '<vue-countdown :time="1000" @end="onCountdownEnd" />',
      });
    });

    it('should not trigger the `end` event when the `emit-events` property is set to `false`', (done) => {
      mount({
        components: {
          VueCountdown,
        },
        methods: {
          onCountdownEnd() {
            throw new Error();
          },
        },
        template: '<vue-countdown :time="1000" :emit-events="false" @end="onCountdownEnd" />',
      });
      setTimeout(done, 1000);
    });
  });

  describe('restart', () => {
    it('should trigger the `restart` event', (done) => {
      mount({
        components: {
          VueCountdown,
        },
        mounted() {
          setTimeout(() => {
            (this.$refs.countdown as any).restart();
          }, 500);
        },
        methods: {
          onCountdownRestart() {
            done();
          },
        },
        template: '<vue-countdown ref="countdown" :time="1000" @restart="onCountdownRestart" />',
      });
    });

    it('should not trigger the `restart` event when the `emit-events` property is set to `false`', (done) => {
      mount({
        components: {
          VueCountdown,
        },
        mounted() {
          setTimeout(() => {
            (this.$refs.countdown as any).restart();
          }, 500);
        },
        methods: {
          onCountdownRestart() {
            throw new Error();
          },
        },
        template: '<vue-countdown ref="countdown" :time="1000" :emit-events="false" @restart="onCountdownRestart" />',
      });
      setTimeout(done, 1000);
    });
  });
});
