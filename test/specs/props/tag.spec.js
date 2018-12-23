describe('prop#tag', () => {
  it('should be "span" by default', (done) => {
    new Vue({
      template: '<countdown :time="2000" />',
      mounted() {
        expect(this.$el.tagName.toLowerCase()).to.equal('span');
        done();
      },
    }).$mount();
  });

  it('should be "div"', (done) => {
    new Vue({
      template: '<countdown :time="2000" tag="div" />',
      mounted() {
        expect(this.$el.tagName.toLowerCase()).to.equal('div');
        done();
      },
    }).$mount();
  });
});
