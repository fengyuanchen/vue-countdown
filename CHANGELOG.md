# Changelog


## 0.2.0 (Apr 28, 2017)

- Not to register the component automatically by default, but export the component directly.

```js
// Before
Vue.use(VueCountdown);

// After
Vue.component('countdown', VueCountdown);
```


## 0.1.1 (Apr 27, 2017)

- Improved countdown progress.


## 0.1.0 (Apr 10, 2017)

- Supports 4 props (options): `autoStart`, `interval`, `time` and `tag`.
- Supports 2 methods: `start`, `stop`.
- Supports 3 events: `countdownstart`, `countdownprogress` and `countdownend`.
