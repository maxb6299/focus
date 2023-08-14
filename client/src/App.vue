<template>
  <div class="background">
    <div class="main">
      <NavigationBar></NavigationBar>
      
      <Timer v-show="this.settingsStore.getAppSettings.showTimer"></Timer>
      <MusicPlayer v-show="this.settingsStore.getAppSettings.showMusic"></MusicPlayer>
    </div>
  </div>
</template>

<script>
import { computed, watch, watchEffect } from 'vue';
import NavigationBar from '@/components/NavigationBar/NavigationBar.vue'
import MusicPlayer from '@/components/MusicPlayer.vue'
import Timer from '@/components/Timer.vue'

import cookieHelper from '@/_helpers/cookie.js'
import { useSettingsStore } from "@/store/SettingsStore.js";

export default {
  name: 'App',
  components: {
    MusicPlayer,
    NavigationBar,
    Timer
  },

  setup() {
    const settingsStore = useSettingsStore();

    const isDarkMode = computed(() => settingsStore.getAppSettings.darkMode);
    watchEffect(() => {
      const body = document.querySelector('body');
      if (isDarkMode.value) {
        body.classList.add('dark');
      } else {
        body.classList.remove('dark');
      }
    });

    const isShowDots = computed(() => settingsStore.getAppSettings.showDots);
    watchEffect(() => {
      const body = document.querySelector('body');
      if (isShowDots.value) body.classList.add('show-dots');
      else body.classList.remove('show-dots');
    });


    return { settingsStore }
  },

  created() {
    document.title = "Focus";
    this.settingsStore.updateSettings();
  },

  errorCaptured(err, vm, info) {
    console.error(err)

    console.log("Deleting cookies")
    cookieHelper.deleteCookie("id_token");
    cookieHelper.deleteCookie("settings");

    location.reload(); // refreshes page
    
    return false;
  }
}
</script>

<style lang="scss">
@import "@/assets/_shared.scss";
</style>