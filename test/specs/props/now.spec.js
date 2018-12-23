describe('prop#now', () => {
  it('should be now by default', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000" />',
      mounted() {
        expect(this.$refs.countdown.now()).to.equal(Date.now());
        done();
      },
    }).$mount();
  });

  it('should match the given time', (done) => {
    const date = new Date();

    new Vue({
      data() {
        return {
          now: () => new Date(Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
          )).getTime(),
        };
      },
      template: '<countdown ref="countdown" :time="2000" />',
      mounted() {
        expect(this.$refs.countdown.now()).to.above(new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
        ).getTime());
        done();
      },
    }).$mount();
  });
});
