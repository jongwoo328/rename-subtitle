import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import VueUploadComponent from "vue-upload-component";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.component("file-upload", VueUploadComponent);
app.mount("#app");
