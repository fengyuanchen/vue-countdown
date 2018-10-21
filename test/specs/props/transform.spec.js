describe('prop#transform', () => {
  it('should not transform the output props by default', (done) => {
    new Vue({
      template: '<countdown :time="2000"><template slot-scope="props">{{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes, {{ props.seconds }} seconds, {{ props.milliseconds }} milliseconds.</template></countdown>',
      mounted() {
        expect(this.$el.textContent).to.equal('0 days, 0 hours, 0 minutes, 2 seconds, 0 milliseconds.');
        done();
      },
    }).$mount();
  });

  it('should transform the output props', (done) => {
    new Vue({
      template: '<countdown :time="2000" :transform="transform"><template slot-scope="props">{{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes, {{ props.seconds }} seconds, {{ props.milliseconds }} milliseconds.</template></countdown>',
      methods: {
        transform(props) {
          Object.entries(props).forEach(([key, value]) => {
            props[key] = value < 10 ? `0${value}` : value;
          });

          return props;
        },
      },
      mounted() {
        expect(this.$el.textContent).to.equal('00 days, 00 hours, 00 minutes, 02 seconds, 00 milliseconds.');
        done();
      },
    }).$mount();
  });
});
