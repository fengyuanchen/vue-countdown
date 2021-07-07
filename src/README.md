# Countdown

> Countdown with optional controls.

## Basic usage

```html
<vue-countdown :time="2 * 24 * 60 * 60 * 1000" v-slot="{ days, hours, minutes, seconds }">
  Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds.
</vue-countdown>
```

## Custom interval

```html
<vue-countdown :time="time" :interval="100" v-slot="{ days, hours, minutes, seconds, milliseconds }">
  New Year Countdown：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }}.{{ Math.floor(milliseconds / 100) }} seconds.
</vue-countdown>

<script>
export default {
  data() {
    const now = new Date();
    const newYear = new Date(now.getFullYear() + 1, 0, 1);

    return {
      time: newYear - now,
    };
  },
};
</script>
```

## Transform slot props

```html
<vue-countdown :time="2 * 24 * 60 * 60 * 1000" :transform="transformSlotProps" v-slot="{ days, hours, minutes, seconds }">
  Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds.
</vue-countdown>

<script>
export default {
  methods: {
    transformSlotProps(props) {
      const formattedProps = {};

      Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ? `0${value}` : String(value);
      });

      return formattedProps;
    },
  },
};
</script>
```

## Countdown on demand

```html
<button type="button" class="btn btn-primary" :disabled="counting" @click="startCountdown">
  <vue-countdown v-if="counting" :time="60000" @end="onCountdownEnd" v-slot="{ totalSeconds }">Fetch again {{ totalSeconds }} seconds later</vue-countdown>
  <span v-else>Fetch Verification Code</span>
</button>

<script>
export default {
  data() {
    return {
      counting: false,
    };
  },
  methods: {
    startCountdown: function () {
      this.counting = true;
    },
    onCountdownEnd: function () {
      this.counting = false;
    },
  },
};
</script>
```

## Props

| Name | Type | Default | Options | Description |
| --- | --- | --- | --- | --- |
| auto-start | `boolean` | `true` | - | Indicate if starts the countdown automatically when initialized or not. |
| emit-events | `boolean` | `true` | - | Indicate if emits the countdown events or not. |
| interval | `number` | `1000` | - | The interval time (in milliseconds) of the countdown progress. The value should not be less than `0`. |
| now | `Function` | `() => Date.now()` | - | Generates the current time (in milliseconds) in a specific time zone. |
| tag | `string` | `"span"` | - | The tag name of the component's root element. |
| time | `number` | `0` | - | The time (in milliseconds) to count down from. |
| transform | `Function` | `(slotProps) => slotProps` | - | Transforms the output slot props before render. The `slotProps` object contains the following properties: `days`, `hours`, `minutes`, `seconds`, `milliseconds`, `totalDays`, `totalHours`, `totalMinutes`, `totalSeconds`, and `totalMilliseconds`. |

## Methods

| Name | Parameters | Description |
| --- | --- | --- |
| start | `()` | Starts the countdown. Run automatically when the `auto-start` prop is set to `true`. |
| abort | `()` | Aborts the countdown immediately. |
| end | `()` | Ends the countdown manually. |

## Events

| Name | Parameters | Description |
| --- | --- | --- |
| start | `()` | Fires immediately when the countdown starts. |
| progress | `(data)` | Fires continually when the countdown is in progress. The `data` object contains the following properties: `days`, `hours`, `minutes`, `seconds`, `milliseconds`, `totalDays`, `totalHours`, `totalMinutes`, `totalSeconds`, and `totalMilliseconds`. |
| abort | `()` | Fired when the countdown has aborted. |
| end | `()` | Fired when the countdown has ended. |

> Native events that bubble up from child elements are also available.

**Note:** You can set the `emit-events` property to `false` to disable these events for better performance.
