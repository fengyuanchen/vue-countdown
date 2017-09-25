# vue-countdown

> Countdown component for [Vue.js](https://vuejs.org/).

- [Website](https://xkeshi.github.io/vue-countdown)

## Table of contents

- [Main](#main)
- [Getting started](#getting-started)
- [Props](#props)
- [Methods](#methods)
- [Events](#events)
- [Browser support](#browser-support)
- [Versioning](#versioning)
- [License](#license)

## Main

```text
dist/
├── vue-countdown.js        (UMD)
├── vue-countdown.min.js    (UMD, compressed)
├── vue-countdown.common.js (CommonJS, default)
└── vue-countdown.esm.js    (ES Module)
```

## Getting started

### Install

```shell
npm install @xkeshi/vue-countdown
```

### Usage

- Browser: `window.VueCountdown`
- CommonJS: `var VueCountdown = require('@xkeshi/vue-countdown')`
- ES2015: `import VueCountdown from '@xkeshi/vue-countdown'`

```js
Vue.component('countdown', VueCountdown);
```

```html
<countdown :time="2 * 24 * 60 * 60 * 1000">
  <template scope="props">Time Remaining：{{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes, {{ props.seconds }} seconds.</template>
</countdown>
<!-- <span>Time Remaining：1 days, 23 hours, 59 minutes, 59 seconds.</span> -->
```

[⬆ back to top](#table-of-contents)

## Props

### autoStart

- Type: `Boolean`
- Default: `true`

Start to countdown automatically when initialized.

### interval

- Type: `Number`
- Default: `1000`

Update interval time (in milliseconds) of the countdown.

```html
<countdown v-bind:interval="100"></countdown>
```

### time

- Type: `Number`
- Default: `0`

Total number of time (in milliseconds) for the countdown.

**Note:** The given value should not less than `0`.

### tag

- Type: `String`
- Default: `'span'`

The tag of the component root element in the countdown.

## Methods

### start

Start to countdown.

```html
<countdown v-bind:auto-start="false" ref="countdown"></countdown>
```

```js
export default {
  mounted() {
    this.$refs.countdown.start();
  },
};
```

### stop

Stop the countdown.

## Events

### countdownstart

This event fires when countdown started.

### countdownprogress

This event fires when countdown in progress.

```html
<countdown v-on:countdownprogress="onCountdownProgress"></countdown>
```

```js
export default {
  methods: {
    onCountdownProgress(data) {
      console.log(data.days);
      console.log(data.hours);
      console.log(data.minutes);
      console.log(data.seconds);
    },
  },
};
```

### countdownend

This event fires when countdown stoped.

[⬆ back to top](#table-of-contents)

## Browser support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Edge (latest)
- Internet Explorer 9+

## Versioning

Maintained under the [Semantic Versioning guidelines](http://semver.org/).

## License

[MIT](http://opensource.org/licenses/MIT) © [Xkeshi](http://xkeshi.com)

[⬆ back to top](#table-of-contents)
