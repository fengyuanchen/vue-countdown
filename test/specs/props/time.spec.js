describe('prop#time', () => {
  it('should be `0` by default', (done) => {
    new Vue({
      template: '<countdown ref="countdown"></countdown>',
      mounted() {
        expect(this.$refs.countdown.time).to.equal(0);
        done();
      },
    }).$mount();
  });

  it('should match the given value', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="1000"></countdown>',
      mounted() {
        expect(this.$refs.countdown.time).to.equal(1000);
        done();
      },
    }).$mount();
  });

  it('should throw error when the value is less than 0', () => {
    try {
      new Vue({
        template: '<countdown :time="-1"></countdown>',
      }).$mount();
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });
});
