import { createApp } from 'vue';
import App from './app.vue';
import DemoBlock from './components/demo-block.vue';
import VueCountdown from '../src';

const app = createApp(App);

app.component(VueCountdown.name, VueCountdown);
app.component(DemoBlock.name, DemoBlock);
app.mount('#app');
