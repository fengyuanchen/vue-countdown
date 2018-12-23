describe('Countdown', () => {
  it('should trigger the `start` event when the time is 0', (done) => {
    new Vue({
      template: '<countdown ref="countdown" @start="handleCountdownStart" />',
      methods: {
        handleCountdownStart() {
          done();
        },
      },
    }).$mount();
  });

  it('should not trigger the `progress` event when the time is 0', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :interval="100" @progress="handleCountdownProgress" />',
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
      template: '<countdown ref="countdown" @end="handleCountdownEnd" />',
      methods: {
        handleCountdownEnd() {
          done();
        },
      },
    }).$mount();
  });

  it('should continue only when it is counting', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" :interval="100" :auto-start="false" @progress="handleCountdownProgress" />',
      methods: {
        handleCountdownProgress() {
          expect.fail(1, 0);
        },
      },
      mounted() {
        this.$refs.countdown.continue();
        setTimeout(done, 200);
      },
    }).$mount();
  });

  it('should progress only when it is counting', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" :interval="100" :auto-start="false" @progress="handleCountdownProgress" />',
      methods: {
        handleCountdownProgress() {
          expect.fail(1, 0);
        },
      },
      mounted() {
        this.$refs.countdown.progress();
        setTimeout(done, 200);
      },
    }).$mount();
  });

  it('should update the countdown', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" :interval="100" :auto-start="false" />',
      mounted() {
        setTimeout(() => {
          expect(this.$refs.countdown.totalMilliseconds).to.equal(2000);
          this.$refs.countdown.update();
          expect(this.$refs.countdown.totalMilliseconds).to.equal(2000);
          this.$refs.countdown.start();
          this.$refs.countdown.pause();
          setTimeout(() => {
            expect(this.$refs.countdown.totalMilliseconds).to.equal(2000);
            this.$refs.countdown.update();
            expect(this.$refs.countdown.totalMilliseconds).to.below(1800);
            done();
          }, 200);
        }, 200);
      },
    }).$mount();
  });

  it('should destroy the countdown', (done) => {
    new Vue({
      template: '<countdown :time="2000" :interval="100" @progress="handleCountdownProgress" />',
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
