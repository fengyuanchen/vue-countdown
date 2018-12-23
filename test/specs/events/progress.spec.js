describe('event#progress', () => {
  it('should trigger the `progress` event', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" :interval="100" @progress="handleCountdownProgress" />',
      methods: {
        handleCountdownProgress() {
          expect(this.$refs.countdown.totalMilliseconds).to.below(2000);
          done();
        },
      },
    }).$mount();
  });

  it('should not trigger the `progress` event when the time is less then the interval', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="10" :interval="100" @progress="handleCountdownProgress" />',
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

  it('should not trigger the `progress` event when the `emit-events` property is set to `false`', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" :interval="100" :emit-events="false" @progress="handleCountdownProgress" />',
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
});
