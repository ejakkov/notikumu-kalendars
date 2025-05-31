import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';

import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css';
const app = createApp(App);

app.use(PrimeVue);
app.use(router);

app.component('InputText', InputText);
app.component('Dropdown', Dropdown);
app.component('Calendar', Calendar);

app.mount('#app');
