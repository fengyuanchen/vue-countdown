describe('method#abort', () => {
  it('should abort the countdown', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" :interval="100" @progress="handleCountdownProgress" />',
      methods: {
        handleCountdownProgress() {
          expect.fail(1, 0);
        },
      },
      mounted() {
        this.$refs.countdown.abort();
        setTimeout(done, 200);
      },
    }).$mount();
  });

  it('should only abort once when call the method more than once at the same time', (done) => {
    let count = 0;

    new Vue({
      template: '<countdown ref="countdown" :time="2000" @abort="handleCountdownAbort" />',
      methods: {
        handleCountdownAbort() {
          count += 1;

          if (count > 1) {
            expect.fail(1, 0);
            return;
          }

          setTimeout(done, 100);
        },
      },
      mounted() {
        this.$refs.countdown.abort();

        // XXX: Call the `abort` method again
        this.$refs.countdown.abort();
      },
    }).$mount();
  });
});
