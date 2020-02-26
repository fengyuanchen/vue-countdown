describe('prop#time', () => {
  it('should be `0` by default', (done) => {
    new Vue({
      template: '<countdown ref="countdown" />',
      mounted() {
        expect(this.$refs.countdown.time).to.equal(0);
        done();
      },
    }).$mount();
  });

  it('should match the given value', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :time="1000" />',
      mounted() {
        expect(this.$refs.countdown.time).to.equal(1000);
        done();
      },
    }).$mount();
  });

  it('should update the countdown when the `time` prop is changed', (done) => {
    new Vue({
      data() {
        return {
          time: 1000,
        };
      },
      template: '<countdown ref="countdown" :time="time" />',
      mounted() {
        expect(this.$refs.countdown.totalMilliseconds).to.equal(1000);
        this.time = 2000;
        this.$nextTick(() => {
          expect(this.$refs.countdown.totalMilliseconds).to.equal(2000);
          done();
        });
      },
    }).$mount();
  });

  it('should throw error when the value is less than 0', () => {
    try {
      new Vue({
        template: '<countdown :time="-1" />',
      }).$mount();
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });

  it('should not throw error when allowNegative props is set and the value is less than 0', (done) => {
    try {
      new Vue({
        template: '<countdown ref="countdown" :allow-negative="true" :time="-1" />',
        mounted() {
          expect(this.$refs.countdown.time).to.equal(-1);
          done();
        },
      }).$mount();
    } catch (error) {
      expect.fail(1, 0, error);
    }
  });
});
