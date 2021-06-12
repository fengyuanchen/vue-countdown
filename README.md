# vue-countdown

[![Coverage Status](https://img.shields.io/codecov/c/github/fengyuanchen/vue-countdown.svg)](https://codecov.io/gh/fengyuanchen/vue-countdown) [![Downloads](https://img.shields.io/npm/dm/@chenfengyuan/vue-countdown.svg)](https://www.npmjs.com/package/@chenfengyuan/vue-countdown) [![Version](https://img.shields.io/npm/v/@chenfengyuan/vue-countdown/next.svg)](https://www.npmjs.com/package/@chenfengyuan/vue-countdown) [![Gzip Size](https://img.shields.io/bundlephobia/minzip/@chenfengyuan/vue-countdown.svg)](https://unpkg.com/@chenfengyuan/vue-countdown/dist/vue-countdown.js)

> Countdown component for Vue 3.

- [Docs](src/README.md)
- [Demo](https://fengyuanchen.github.io/vue-countdown)

## Main files

```text
dist/
├── vue-countdown.js         (UMD, default)
├── vue-countdown.min.js     (UMD, compressed)
├── vue-countdown.esm.js     (ECMAScript Module)
└── vue-countdown.esm.min.js (ECMAScript Module, compressed)
```

## Getting started

### Installation

```shell
npm install vue@next @chenfengyuan/vue-countdown@next
```

In browser:

```html
<script src="/path/to/vue.js"></script><!-- Vue.js is required -->
<script src="/path/to/vue-countdown.js"></script>
```

### Usage

```js
import { createApp } from 'vue';
import VueCountdown from '@chenfengyuan/vue-countdown';

const app = createApp({});

app.component(VueCountdown.name, VueCountdown);
```

```html
<vue-countdown :time="2 * 24 * 60 * 60 * 1000" v-slot="{ days, hours, minutes, seconds }">
  Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds.
</vue-countdown>
<!-- <span>Time Remaining：1 days, 23 hours, 59 minutes, 59 seconds.</span> -->
```

## Browser support

Same as Vue 3.

## Versioning

Maintained under the [Semantic Versioning guidelines](https://semver.org/).

## License

[MIT](https://opensource.org/licenses/MIT) © [Chen Fengyuan](https://chenfengyuan.com/)
