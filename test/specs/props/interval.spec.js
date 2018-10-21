describe('prop#interval', () => {
  it('should be `1000` by default', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="2000"></countdown>',
      mounted() {
        expect(this.$refs.countdown.interval).to.equal(1000);
        done();
      },
    }).$mount();
  });

  it('should match the given value', (done) => {
    new Vue({
      data() {
        return {
          startTime: 0,
        };
      },
      template: '<countdown ref="countdown" :time="200" :interval="100" @start="handleCountdownStart" @progress="handleCountdownProgress"></countdown>',
      methods: {
        handleCountdownStart() {
          this.startTime = Date.now();
        },
        handleCountdownProgress() {
          expect(Date.now() - this.startTime).to.closeTo(100, 50);
          done();
        },
      },
    }).$mount();
  });

  it('should use the minimum value of `time` and `interval` as interval', (done) => {
    new Vue({
      data() {
        return {
          startTime: 0,
        };
      },
      template: '<countdown ref="countdown" :time="50" :interval="100" @start="handleCountdownStart" @end="handleCountdownEnd"></countdown>',
      methods: {
        handleCountdownStart() {
          this.startTime = Date.now();
        },
        handleCountdownEnd() {
          expect(Date.now() - this.startTime).to.closeTo(50, 10);
          done();
        },
      },
    }).$mount();
  });

  it('should throw error when the value is less than 0', () => {
    try {
      new Vue({
        template: '<countdown :time="2000" :interval="-1"></countdown>',
      }).$mount();
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });
});
