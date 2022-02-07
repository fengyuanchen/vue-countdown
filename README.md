# vue-countdown

> Countdown component for [Vue 2](https://v2.vuejs.org/).

- [Website](https://fengyuanchen.github.io/vue-countdown)

## Table of contents

- [vue-countdown](#vue-countdown)
  - [Table of contents](#table-of-contents)
  - [Main files](#main-files)
  - [Getting started](#getting-started)
    - [Install](#install)
    - [Usage](#usage)
  - [Props](#props)
    - [auto-start](#auto-start)
    - [emit-events](#emit-events)
    - [interval](#interval)
    - [now](#now)
    - [tag](#tag)
    - [time](#time)
    - [transform](#transform)
  - [Methods](#methods)
    - [start](#start)
    - [abort](#abort)
    - [end](#end)
  - [Events](#events)
    - [start](#start-1)
    - [progress](#progress)
    - [abort](#abort-1)
    - [end](#end-1)
  - [Browser support](#browser-support)
  - [Versioning](#versioning)
  - [License](#license)

## Main files

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
npm install vue@2 @chenfengyuan/vue-countdown@1
```

In browser:

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/vue-countdown.js"></script>
<script>Vue.component(VueCountdown.name, VueCountdown);</script>
```

### Usage

```js
import Vue from 'vue';
import VueCountdown from '@chenfengyuan/vue-countdown';

Vue.component(VueCountdown.name, VueCountdown);
```

```html
<countdown :time="2 * 24 * 60 * 60 * 1000">
  <template slot-scope="props">Time Remaining：{{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes, {{ props.seconds }} seconds.</template>
</countdown>
<!-- <span>Time Remaining：1 days, 23 hours, 59 minutes, 59 seconds.</span> -->
```

[⬆ back to top](#table-of-contents)

## Props

### auto-start

- Type: `Boolean`
- Default: `true`

Starts the countdown automatically when initialized.

### emit-events

- Type: `Boolean`
- Default: `true`

Emits the countdown events.

### interval

- Type: `Number`
- Default: `1000`

The interval time (in milliseconds) of the countdown progress.

**Note:** The value should not be less than `0`.

### now

- Type: `Function`
- Default: `() => Date.now()`

Generates the current time (in milliseconds) in a specific time zone.

### tag

- Type: `String`
- Default: `'span'`

The tag name of the component's root element.

### time

- Type: `Number`
- Default: `0`

The time (in milliseconds) to count down from.

**Note:** The value should not be less than `0`.

### transform

- Type: `Function`
- Default: `props => props`

Transforms the output props before render.

```html
<countdown :time="120000" :transform="transform">
  <template slot-scope="props">{{ props.minutes }}, {{ props.seconds }}.</template>
</countdown>
<!-- <span>01 minute, 59 seconds.</span> -->
```

```js
export default {
  methods: {
    transform(props) {
      Object.entries(props).forEach(([key, value]) => {
        // Adds leading zero
        const digits = value < 10 ? `0${value}` : value;

        // uses singular form when the value is less than 2
        const word = value < 2 ? key.replace(/s$/, '') : key;

        props[key] = `${digits} ${word}`;
      });

      return props;
    },
  },
};
```

[⬆ back to top](#table-of-contents)

## Methods

### start

Starts the countdown.

```html
<countdown ref="countdown" :auto-start="false"></countdown>
```

```js
export default {
  mounted() {
    this.$refs.countdown.start();
  },
};
```

### abort

Aborts the countdown.

### end

Ends the countdown.

[⬆ back to top](#table-of-contents)

## Events

You have to set the [`emit-events`](#emit-events) property to `true` to enable these events. If you don't need them, you can set the property to `false` for better performance.

### start

This event fires immediately when the `start` method is called.

### progress

This event fires when the countdown is in progress.

```html
<countdown @progress="handleCountdownProgress"></countdown>
```

```js
export default {
  methods: {
    handleCountdownProgress(data) {
      console.log(data.days);
      console.log(data.hours);
      console.log(data.minutes);
      console.log(data.seconds);
      console.log(data.milliseconds);
      console.log(data.totalDays);
      console.log(data.totalHours);
      console.log(data.totalMinutes);
      console.log(data.totalSeconds);
      console.log(data.totalMilliseconds);
    },
  },
};
```

### abort

This event fires immediately when the `abort` method is called.

### end

This event fires immediately when the `end` method is called.

[⬆ back to top](#table-of-contents)

## Browser support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Edge (latest)
- Internet Explorer 9+

## Versioning

Maintained under the [Semantic Versioning guidelines](https://semver.org/).

## License

[MIT](https://opensource.org/licenses/MIT) © [Chen Fengyuan](https://chenfengyuan.com/)

[⬆ back to top](#table-of-contents)
