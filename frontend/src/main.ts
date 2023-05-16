import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import Notifications from "notiwind";
import VueCookies from "vue-cookies";

createApp(App).use(router).use(Notifications).use(VueCookies).mount("#app");
