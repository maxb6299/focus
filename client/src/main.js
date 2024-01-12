import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import vue3GoogleLogin from "vue3-google-login";
import { inject } from "@vercel/analytics";

inject(); // init vercel analytics

const app = createApp(App);

app.use(createPinia());
app.use(vue3GoogleLogin, {
  clientId: `666230453304-k60nab5fc65gslhht108fqujrmli3lgf.apps.googleusercontent.com`,
});

app.mount("#app");
