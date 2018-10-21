describe('event#end', () => {
  it('should trigger the `end` event', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="100" :interval="100" @end="handleCountdownEnd"></countdown>',
      methods: {
        handleCountdownEnd() {
          expect(this.$refs.countdown.totalMilliseconds).to.equal(0);
          expect(this.$refs.countdown.counting).to.be.false;
          done();
        },
      },
    }).$mount();
  });

  it('should not trigger the `end` event when the `emit-events` property is set to `false`', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="100" :interval="100" :emit-events="false" @end="handleCountdownEnd"></countdown>',
      methods: {
        handleCountdownEnd() {
          expect.fail(1, 0);
        },
      },
      mounted() {
        setTimeout(done, 200);
      },
    }).$mount();
  });
});
