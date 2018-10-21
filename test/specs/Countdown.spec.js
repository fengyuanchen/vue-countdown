describe('Countdown', () => {
  it('should trigger the `start` event when the time is 0', (done) => {
    new Vue({
      template: '<countdown ref="countdown" @start="handleCountdownStart"></countdown>',
      methods: {
        handleCountdownStart() {
          done();
        },
      },
    }).$mount();
  });

  it('should not trigger the `progress` event when the time is 0', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :interval="100" @progress="handleCountdownProgress"></countdown>',
      methods: {
        handleCountdownProgress() {
          expect.fail(1, 0);
        },
      },
      mounted() {
        setTimeout(done, 200);
      },
    }).$mount();
  });

  it('should trigger the `end` event when the time is 0', (done) => {
    new Vue({
      template: '<countdown ref="countdown" @end="handleCountdownEnd"></countdown>',
      methods: {
        handleCountdownEnd() {
          done();
        },
      },
    }).$mount();
  });

  it('should continue only when it is counting', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" :interval="100" :auto-start="false" @progress="handleCountdownProgress"></countdown>',
      methods: {
        handleCountdownProgress() {
          expect.fail(1, 0);
        },
      },
      mounted() {
        setTimeout(() => {
          this.$refs.countdown.continue();
          setTimeout(done, 200);
        }, 100);
      },
    }).$mount();
  });

  it('should progress only when it is counting', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" :interval="100" :auto-start="false" @progress="handleCountdownProgress"></countdown>',
      methods: {
        handleCountdownProgress() {
          expect.fail(1, 0);
        },
      },
      mounted() {
        setTimeout(() => {
          this.$refs.countdown.progress();
          setTimeout(done, 200);
        }, 100);
      },
    }).$mount();
  });

  it('should destroy the countdown', (done) => {
    new Vue({
      template: '<countdown :time="2000" :interval="100" @progress="handleCountdownProgress"></countdown>',
      methods: {
        handleCountdownProgress() {
          expect.fail(1, 0);
        },
      },
      mounted() {
        this.$destroy();
        setTimeout(done, 200);
      },
    }).$mount();
  });
});
