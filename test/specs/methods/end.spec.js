describe('method#end', () => {
  it('should end the countdown', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" @end="handleCountdownEnd"></countdown>',
      methods: {
        handleCountdownEnd() {
          expect(this.$refs.countdown.counting).to.be.false;
          done();
        },
      },
      mounted() {
        this.$refs.countdown.end();
      },
    }).$mount();
  });

  it('should only end once when call the method more than once at the same time', (done) => {
    let count = 0;

    new Vue({
      template: '<countdown ref="countdown" :time="2000" @end="handleCountdownEnd"></countdown>',
      methods: {
        handleCountdownEnd() {
          count += 1;

          if (count > 1) {
            expect.fail(1, 0);
            return;
          }

          setTimeout(done, 100);
        },
      },

      mounted() {
        this.$refs.countdown.end();

        // XXX: Call the `end` method again
        this.$refs.countdown.end();
      },
    }).$mount();
  });
});
