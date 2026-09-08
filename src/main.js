import { createApp } from "vue";
import App from "./App/App.vue";
import router from "./router";
import i18n from "./i18n/index.js";
import "./style/main.css";

// Application entry point: instantiates the root component and registers
// the routing and internationalization plugins prior to mounting.
createApp(App).use(router).use(i18n).mount("#app");
