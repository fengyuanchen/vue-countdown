describe('prop#auto-start', () => {
  it('should start the countdown automatically by default', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000"></countdown>',
      mounted() {
        expect(this.$refs.countdown.autoStart).to.be.true;
        expect(this.$refs.countdown.counting).to.be.false;
        setTimeout(() => {
          expect(this.$refs.countdown.counting).to.be.true;
          done();
        }, 100);
      },
    }).$mount();
  });

  it('should not start the countdown automatically', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" :auto-start="false"></countdown>',
      mounted() {
        expect(this.$refs.countdown.autoStart).to.be.false;
        expect(this.$refs.countdown.counting).to.be.false;
        setTimeout(() => {
          expect(this.$refs.countdown.counting).to.be.false;
          done();
        }, 100);
      },
    }).$mount();
  });
});
