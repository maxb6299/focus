import { createApp } from "vue";
import App from "./App.vue";
import vue3GoogleLogin from "vue3-google-login";

const app = createApp(App);

app.use(vue3GoogleLogin, {
  clientId: `666230453304-k60nab5fc65gslhht108fqujrmli3lgf.apps.googleusercontent.com`,
});

app.mount("#app");
