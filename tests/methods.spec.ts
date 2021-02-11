import { mount } from '@vue/test-utils';
import VueCountdown from '../src';

describe('methods', () => {
  describe('start', () => {
    it('should start the countdown', () => {
      const wrapper = mount(VueCountdown, {
        props: {
          autoStart: false,
          time: 5000,
        },
      });

      expect(wrapper.vm.counting).toBe(false);
      wrapper.vm.start();
      expect(wrapper.vm.counting).toBe(true);
    });

    it('should do nothing when it has been started', () => {
      const wrapper = mount(VueCountdown, {
        props: {
          time: 5000,
        },
      });

      expect(wrapper.vm.counting).toBe(true);
      wrapper.vm.start();
    });
  });

  describe('abort', () => {
    it('should abort the countdown', () => {
      const wrapper = mount(VueCountdown, {
        props: {
          time: 5000,
        },
      });

      expect(wrapper.vm.counting).toBe(true);
      wrapper.vm.abort();
      expect(wrapper.vm.counting).toBe(false);
      expect(wrapper.vm.totalMilliseconds).toBeGreaterThan(0);
    });

    it('should do nothing when it is not started', () => {
      const wrapper = mount(VueCountdown, {
        props: {
          autoStart: false,
          time: 5000,
        },
      });

      expect(wrapper.vm.counting).toBe(false);
      wrapper.vm.abort();
    });
  });

  describe('end', () => {
    it('should end the countdown', () => {
      const wrapper = mount(VueCountdown, {
        props: {
          time: 5000,
        },
      });

      expect(wrapper.vm.counting).toBe(true);
      wrapper.vm.end();
      expect(wrapper.vm.counting).toBe(false);
      expect(wrapper.vm.totalMilliseconds).toBe(0);
    });

    it('should do nothing when it is not started', () => {
      const wrapper = mount(VueCountdown, {
        props: {
          autoStart: false,
          time: 5000,
        },
      });

      expect(wrapper.vm.counting).toBe(false);
      wrapper.vm.end();
    });
  });
});
