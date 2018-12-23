describe('prop#auto-start', () => {
  it('should start the countdown automatically by default', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" />',
      mounted() {
        expect(this.$refs.countdown.autoStart).to.be.true;
        expect(this.$refs.countdown.counting).to.be.true;
        done();
      },
    }).$mount();
  });

  it('should not start the countdown automatically', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" :auto-start="false" />',
      mounted() {
        expect(this.$refs.countdown.autoStart).to.be.false;
        expect(this.$refs.countdown.counting).to.be.false;
        done();
      },
    }).$mount();
  });

  it('should start the countdown automatically when the `auto-start` prop is set to `true`', (done) => {
    new Vue({
      data() {
        return {
          autoStart: false,
        };
      },
      template: '<countdown ref="countdown" :time="2000" :auto-start="autoStart" />',
      mounted() {
        expect(this.$refs.countdown.counting).to.be.false;
        this.autoStart = true;
        this.$nextTick(() => {
          expect(this.$refs.countdown.counting).to.be.true;
          done();
        });
      },
    }).$mount();
  });
});
