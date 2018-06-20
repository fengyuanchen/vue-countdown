const { Vue, VueCountdown } = window;

Vue.component(VueCountdown.name, VueCountdown);

describe('<countdown>', () => {
  describe('props', () => {
    it('autoStart', (done) => {
      const vm = new Vue({
        template: '<countdown ref="countdown" :time="60000" :auto-start="false" @countdownstart="handleCountdownStart"></countdown>',
        methods: {
          handleCountdownStart() {
            expect.fail(1, 0);
          },
        },
      }).$mount();

      setTimeout(() => {
        expect(vm.$refs.countdown.counting).to.be.false;
        done();
      }, 1000);
    });

    it('emitEvents', (done) => {
      const vm = new Vue({
        template: '<countdown ref="countdown" :time="60000" :emit-events="false" @countdownstart="handleCountdownStart"></countdown>',
        methods: {
          handleCountdownStart() {
            expect.fail(1, 0);
          },
        },
      }).$mount();

      setTimeout(() => {
        expect(vm.$refs.countdown.counting).to.be.true;
        done();
      }, 1000);
    });

    it('interval', (done) => {
      const vm = new Vue({
        template: '<countdown ref="countdown" :time="60000" :interval="100" @countdownprogress="handleCountdownProgress"></countdown>',
        methods: {
          handleCountdownProgress(data) {
            vm.$refs.countdown.pause();
            expect(data.totalSeconds).to.equal(59.9);
            done();
          },
        },
      }).$mount();
    });

    describe('leadingZero', () => {
      it('should have a leading zero by default', (done) => {
        const vm = new Vue({
          template: `<countdown ref="countdown" :time="10000" @countdownprogress="handleCountdownProgress">
  <template slot-scope="props">{{ props.seconds }}</template>
</countdown>`,
          methods: {
            handleCountdownProgress() {
              vm.$refs.countdown.pause();
              vm.$nextTick(() => {
                expect(vm.$el.textContent).to.equal('09');
                done();
              });
            },
          },
        }).$mount();
      });

      it('should not have a leading zero', (done) => {
        const vm = new Vue({
          template: `<countdown ref="countdown" :time="10000" :leading-zero="false" @countdownprogress="handleCountdownProgress">
  <template slot-scope="props">{{ props.seconds }}</template>
</countdown>`,
          methods: {
            handleCountdownProgress() {
              vm.$refs.countdown.pause();
              vm.$nextTick(() => {
                expect(vm.$el.textContent).to.equal('9');
                done();
              });
            },
          },
        }).$mount();
      });
    });

    it('now', (done) => {
      const vm = new Vue({
        template: '<countdown ref="countdown" :time="60000" :now="now" @countdownprogress="handleCountdownProgress"></countdown>',
        methods: {
          handleCountdownProgress() {
            vm.$refs.countdown.pause();
            expect(vm.$refs.countdown.endTime).to.equal(this.now() + 60000);
            done();
          },

          now() {
            const date = new Date();

            return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
          },
        },
      }).$mount();
    });

    describe('time', () => {
      it('should match the given time', (done) => {
        const vm = new Vue({
          template: `<countdown ref="countdown" :time="60000" @countdownstart="handleCountdownStart">
  <template slot-scope="props">{{ props.seconds }}</template>
</countdown>`,
          methods: {
            handleCountdownStart() {
              expect(vm.$refs.countdown.totalSeconds).to.equal(60);
              done();
            },
          },
        }).$mount();
      });

      it('should throw error when the time less than 0', () => {
        try {
          new Vue({
            template: '<countdown :time="-60000"></countdown>',
          }).$mount();
        } catch (error) {
          expect(error).to.be.an('error');
        }
      });
    });

    describe('tag', () => {
      it('should be "span" by default', () => {
        const vm = new Vue({
          template: '<countdown :time="60000"></countdown>',
        }).$mount();

        expect(vm.$el.tagName.toLowerCase()).to.equal('span');
      });

      it('should be "div"', () => {
        const vm = new Vue({
          template: '<countdown :time="60000" tag="div"></countdown>',
        }).$mount();

        expect(vm.$el.tagName.toLowerCase()).to.equal('div');
      });
    });
  });

  describe('methods', () => {
    it('start', (done) => {
      const vm = new Vue({
        template: '<countdown ref="countdown" :time="60000" :auto-start="false" @countdownstart="handleCountdownStart"></countdown>',
        methods: {
          handleCountdownStart() {
            done();
          },
        },
      }).$mount();

      setTimeout(() => {
        vm.$refs.countdown.start();
      }, 1000);
    });

    it('pause', (done) => {
      const vm = new Vue({
        template: '<countdown ref="countdown" :time="60000" @countdownprogress="handleCountdownProgress"></countdown>',
        methods: {
          handleCountdownProgress(data) {
            if (data.totalSeconds === 59) {
              vm.$refs.countdown.pause();
              done();
            } else {
              expect.fail(1, 0);
            }
          },
        },
      }).$mount();
    });

    it('stop', (done) => {
      const vm = new Vue({
        template: '<countdown ref="countdown" :time="60000" @countdownend="handleCountdownEnd"></countdown>',
        methods: {
          handleCountdownEnd() {
            done();
          },
        },
      }).$mount();

      setTimeout(() => {
        vm.$refs.countdown.stop();
      }, 1000);
    });
  });

  describe('events', () => {
    it('countdownstart', (done) => {
      new Vue({
        template: '<countdown :time="60000" @countdownstart="handleCountdownStart"></countdown>',
        methods: {
          handleCountdownStart() {
            done();
          },
        },
      }).$mount();
    });

    it('countdownprogress', (done) => {
      new Vue({
        template: '<countdown :time="60000" @countdownprogress="handleCountdownProgress"></countdown>',
        methods: {
          handleCountdownProgress() {
            done();
          },
        },
      }).$mount();
    });

    it('countdownend', (done) => {
      const vm = new Vue({
        template: '<countdown ref="countdown" :time="60000" @countdownend="handleCountdownEnd"></countdown>',
        methods: {
          handleCountdownEnd() {
            done();
          },
        },
      }).$mount();

      setTimeout(() => {
        vm.$refs.countdown.stop();
      }, 1000);
    });
  });
});
