describe('method#start', () => {
  it('should start the countdown', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" :auto-start="false" @start="handleCountdownStart" />',
      methods: {
        handleCountdownStart() {
          expect(this.$refs.countdown.counting).to.be.true;
          done();
        },
      },
      mounted() {
        expect(this.$refs.countdown.counting).to.be.false;
        this.$refs.countdown.start();
      },
    }).$mount();
  });

  it('should only start once when call the method more than once at the same time', (done) => {
    let count = 0;

    new Vue({
      template: '<countdown ref="countdown" :time="2000" :auto-start="false" @start="handleCountdownStart" />',
      methods: {
        handleCountdownStart() {
          count += 1;

          if (count > 1) {
            expect.fail(1, 0);
            return;
          }

          setTimeout(done, 100);
        },
      },
      mounted() {
        this.$refs.countdown.start();

        // XXX: Call the `start` method again
        this.$refs.countdown.start();
      },
    }).$mount();
  });
});
