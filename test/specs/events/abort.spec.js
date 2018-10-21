describe('event#abort', () => {
  it('should trigger the `abort` event', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" :interval="100" @progress="handleCountdownProgress" @abort="handleCountdownAbort"></countdown>',
      methods: {
        handleCountdownProgress() {
          expect.fail(1, 0);
        },
        handleCountdownAbort() {
          expect(this.$refs.countdown.counting).to.be.false;
          done();
        },
      },
      mounted() {
        setTimeout(() => {
          this.$refs.countdown.abort();
          setTimeout(done, 200);
        }, 50);
      },
    }).$mount();
  });

  it('should not trigger the `abort` event when it is not started', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" @abort="handleCountdownAbort"></countdown>',
      methods: {
        handleCountdownAbort() {
          expect.fail(1, 0);
        },
      },
      mounted() {
        expect(this.$refs.countdown.counting).to.be.false;
        this.$refs.countdown.abort();
        setTimeout(done, 100);
      },
    }).$mount();
  });

  it('should not trigger the `abort` event when the `emit-events` property is set to `false`', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" :emit-events="false" @abort="handleCountdownAbort"></countdown>',
      methods: {
        handleCountdownAbort() {
          expect.fail(1, 0);
        },
      },
      mounted() {
        setTimeout(() => {
          this.$refs.countdown.abort();
          done();
        }, 100);
      },
    }).$mount();
  });
});
