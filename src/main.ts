import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  ElButton,
  ElDialog,
  ElInput,
  ElInputNumber,
  ElPopover,
  ElRadioGroup,
  ElRadio,
  ElIcon,
} from "element-plus";
import "element-plus/dist/index.css";
import VueUploadComponent from "vue-upload-component";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElButton);
app.use(ElDialog);
app.use(ElInput);
app.use(ElInputNumber);
app.use(ElPopover);
app.use(ElRadioGroup);
app.use(ElRadio);
app.use(ElIcon);
app.component("file-upload", VueUploadComponent);
app.mount("#app");
