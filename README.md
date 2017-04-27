# vue-countdown

> Countdown component for [Vue.js](https://vuejs.org/).


## Table of contents

- [Main](#main)
- [Getting started](#getting-started)
- [Props / Options](#props)
- [Methods](#methods)
- [Events](#events)
- [Browser support](#browser-support)
- [Versioning](#versioning)
- [License](#license)



## Main

```
dist/
├── vue-countdown.js        (5 KB, UMD)
├── vue-countdown.min.js    (2 KB, UMD, compressed)
├── vue-countdown.common.js (5 KB, CommonJS)
└── vue-countdown.esm.js    (5 KB, ES Module)
```



## Getting started


### Download

- [Download the latest release](https://github.com/xkeshi/vue-countdown/archive/master.zip).
- Clone the repository: `git clone https://github.com/xkeshi/vue-countdown.git`.
- Install with [NPM](https://npmjs.com): `npm install xkeshi/vue-countdown`.


### Usage

- Browser: `window.VueCountdown`
- CommonJS: `var VueCountdown = require('vue-countdown')`
- ES2015: `import VueCountdown from 'vue-countdown'`

```js
Vue.use(VueCountdown);
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

[MIT](http://opensource.org/licenses/MIT) © [xkeshi](http://xkeshi.com)

[⬆ back to top](#table-of-contents)
