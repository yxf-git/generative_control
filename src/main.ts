import { createApp } from "vue";
import "amfe-flexible";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import VConsole from "vconsole"
import "./assets/css/index.scss";
import "element-plus/dist/index.css";
// new VConsole()
const app = createApp(App);
//配置模块
app.use(router); //路由
app.use(store); //缓存
app.mount("#app");