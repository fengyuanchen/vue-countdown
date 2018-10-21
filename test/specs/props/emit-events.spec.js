describe('prop#emit-events', () => {
  it('should emit events by default', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" @start="handleCountdownStart"></countdown>',
      methods: {
        handleCountdownStart() {
          done();
        },
      },
      mounted() {
        expect(this.$refs.countdown.emitEvents).to.be.true;
      },
    }).$mount();
  });

  it('should not emit events', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" :emit-events="false" @start="handleCountdownStart"></countdown>',
      methods: {
        handleCountdownStart() {
          expect.fail(1, 0);
        },
      },
      mounted() {
        expect(this.$refs.countdown.emitEvents).to.be.false;
        setTimeout(done, 100);
      },
    }).$mount();
  });
});
