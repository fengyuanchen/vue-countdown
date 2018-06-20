# vue-countdown

[![Build Status](https://travis-ci.org/xkeshi/vue-countdown.svg)](https://travis-ci.org/xkeshi/vue-countdown) [![Downloads](https://img.shields.io/npm/dm/@xkeshi/vue-countdown.svg)](https://www.npmjs.com/package/@xkeshi/vue-countdown) [![Version](https://img.shields.io/npm/v/@xkeshi/vue-countdown.svg)](https://www.npmjs.com/package/@xkeshi/vue-countdown)

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
npm install @xkeshi/vue-countdown vue
```

In browser:

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/vue-countdown.js"></script>
```

### Usage

```js
import Vue from 'vue';
import VueCountdown from '@xkeshi/vue-countdown';

Vue.component(VueCountdown.name, VueCountdown);
```

```html
<countdown :time="2 * 24 * 60 * 60 * 1000">
  <template slot-scope="props">Time Remaining：{{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes, {{ props.seconds }} seconds.</template>
</countdown>
<!-- <span>Time Remaining：01 days, 23 hours, 59 minutes, 59 seconds.</span> -->
```

In browser:

```html
<script>Vue.component(VueCountdown.name, VueCountdown);</script>
```

[⬆ back to top](#table-of-contents)

## Props

### auto-start

- Type: `Boolean`
- Default: `true`

Start to countdown automatically when initialized.

### emit-events

- Type: `Boolean`
- Default: `true`

Indicate if emit [the countdown events](#events) or not.

### interval

- Type: `Number`
- Default: `1000`

Update interval time (in milliseconds) of the countdown.

### leading-zero

- Type: `Boolean`
- Default: `true`

Add a leading zero to the output days, hours, minutes and seconds if they are less than 10.

### now

- Type: `Function`
- Default: `() => Date.now()`

Generate the current time (in milliseconds) of a specific time zone.

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

### pause

Pause the countdown.

```html
<countdown ref="countdown"></countdown>
```

```js
export default {
  mounted() {
    this.$refs.countdown.pause();
  },
};
```

### stop

Stop the countdown.

## Events

> Require to set the [`emit-events`](#emit-events) property to `true`, or if you don't need these events, you can set the prop to `false` for better performance.

### countdownstart

This event fires when countdown started.

### countdownpause

This event fires when countdown is paused.

### countdownprogress

This event fires when countdown in progress.

```html
<countdown v-on:countdownprogress="handleCountdownProgress"></countdown>
```

```js
export default {
  methods: {
    handleCountdownProgress(data) {
      console.log(data.days);
      console.log(data.hours);
      console.log(data.minutes);
      console.log(data.seconds);
      console.log(data.totalDays);
      console.log(data.totalHours);
      console.log(data.totalMinutes);
      console.log(data.totalSeconds);
    },
  },
};
```

### countdownend

This event fires when countdown stopped.

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

[MIT](https://opensource.org/licenses/MIT) © [Xkeshi](http://xkeshi.com)

[⬆ back to top](#table-of-contents)
