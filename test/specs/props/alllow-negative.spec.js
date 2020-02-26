describe('prop#allowNegative', () => {
  it('should be `false` by default', (done) => {
    new Vue({
      template: '<countdown ref="countdown" />',
      mounted() {
        expect(this.$refs.countdown.allowNegative).to.be.false;
        done();
      },
    }).$mount();
  });

  it('should match the given value', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :allow-negative="true" />',
      mounted() {
        expect(this.$refs.countdown.allowNegative).to.be.true;
        done();
      },
    }).$mount();
  });

  it('should update the countdown when the `allowNegative` prop is changed', (done) => {
    new Vue({
      data() {
        return {
          allowNegative: true,
        };
      },
      template: '<countdown ref="countdown" :allow-negative="allowNegative" />',
      mounted() {
        expect(this.$refs.countdown.allowNegative).to.be.true;
        this.allowNegative = false;
        this.$nextTick(() => {
          expect(this.$refs.countdown.allowNegative).to.be.false;
          done();
        });
      },
    }).$mount();
  });

  it('should continue event if timer is negative', (done) => {
    new Vue({
      template: '<countdown ref="countdown" :allow-negative="true" :time="1000" :interval="200" @progress="handleCountdownProgress" @end="handleCountdownEnd" />',
      methods: {
        handleCountdownProgress(data) {
          if (data.totalMilliseconds < -100) {
            done();
          }
        },
        handleCountdownEnd() {
          expect.fail(1, 0);
        },
      },
    }).$mount();
  });
});
