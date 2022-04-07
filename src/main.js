import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/theme.scss";
import Notifications from "@kyvg/vue3-notification";
import VAnimateCss from 'v-animate-css';

const app = createApp(App);
app.use(router);
app.use(Notifications);
app.use(VAnimateCss);
app.mount("#app");
