# vue-countdown

[![Coverage Status](https://img.shields.io/codecov/c/github/fengyuanchen/vue-countdown.svg)](https://codecov.io/gh/fengyuanchen/vue-countdown) [![Downloads](https://img.shields.io/npm/dm/@chenfengyuan/vue-countdown.svg)](https://www.npmjs.com/package/@chenfengyuan/vue-countdown) [![Version](https://img.shields.io/npm/v/@chenfengyuan/vue-countdown.svg)](https://www.npmjs.com/package/@chenfengyuan/vue-countdown) [![Gzip Size](https://img.shields.io/bundlephobia/minzip/@chenfengyuan/vue-countdown.svg)](https://unpkg.com/@chenfengyuan/vue-countdown/dist/vue-countdown.js)

> Countdown component for Vue 3. For Vue 2, check out the [`v1`](https://github.com/fengyuanchen/vue-countdown/tree/v1) branch.

- [Docs](src/README.md)
- [Demo](https://fengyuanchen.github.io/vue-countdown)

## Main npm package files

```text
dist/
├── vue-countdown.js         (UMD, default)
├── vue-countdown.min.js     (UMD, compressed)
├── vue-countdown.esm.js     (ECMAScript Module)
├── vue-countdown.esm.min.js (ECMAScript Module, compressed)
└── vue-countdown.d.ts       (TypeScript Declaration File)
```

## Getting started

### Installation

Using npm:

```shell
npm install vue@3 @chenfengyuan/vue-countdown@2
```

Using pnpm:

```shell
pnpm add vue@3 @chenfengyuan/vue-countdown@2
```

Using Yarn:

```shell
yarn add vue@3 @chenfengyuan/vue-countdown@2
```

Using CDN:

```html
<script src="https://unpkg.com/vue@3"></script><!-- Vue.js is required -->
<script src="https://unpkg.com/@chenfengyuan/vue-countdown@2"></script>
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
