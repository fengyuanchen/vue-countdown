# Changelog

## 0.5.0 (Nov 20, 2017)

- Added 2 new property: `emitEvents` (#11) and `now` (#12).
- Fixed the issue of count number update when it it not started (#13).

## 0.4.0 (Oct 9, 2017)

- Added a new property: `leadingZero` (#5).
- Fixed the issue of countdown process when document hidden (#8).

## 0.3.0 (Sep 18, 2017)

- Added 4 new scope properties: `totalDays`, `totalHours`, `totalMinutes` and `totalSeconds` (#1).
- Added a watch to activate timer after creation (#2).

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
- Supports 4 scope properties: `days`, `hours`, `minutes` and `seconds`.
