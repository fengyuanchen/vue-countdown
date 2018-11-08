describe('event#start', () => {
  it('should trigger the `start` event', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" :interval="100" @start="handleCountdownStart"></countdown>',
      methods: {
        handleCountdownStart() {
          this.$nextTick(() => {
            expect(this.$refs.countdown.totalMilliseconds).to.equal(2000);
            expect(this.$refs.countdown.counting).to.be.true;
            done();
          });
        },
      },
    }).$mount();
  });

  it('should not trigger the `start` event when the `emit-events` property is set to `false`', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" :emit-events="false" @start="handleCountdownStart"></countdown>',
      methods: {
        handleCountdownStart() {
          expect.fail(1, 0);
        },
      },
      mounted() {
        setTimeout(done, 100);
      },
    }).$mount();
  });
});
