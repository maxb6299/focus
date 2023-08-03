<template>
  <div class="background">
    <div class="main">
      <NavigationBar></NavigationBar>
      
      <Timer v-if="this.settingsStore.getAppSettings.showTimer"></Timer>
      <MusicPlayer v-if="this.settingsStore.getAppSettings.showMusic"></MusicPlayer>
    </div>
  </div>
</template>

<script>
import { computed, watch } from 'vue';
import NavigationBar from '@/components/NavigationBar/NavigationBar.vue'
import MusicPlayer from '@/components/MusicPlayer.vue'
import Timer from '@/components/Timer.vue'

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

    const isDarkMode = computed(() => settingsStore.getAppSettings.darkMode)
    watch(isDarkMode, (newVal) => {
      const body = document.querySelector('body');
      if (newVal) body.classList.add('dark')
      else body.classList.remove('dark')
    });

    return { settingsStore }
  },

  created() {
    document.title = "Focus";
    this.settingsStore.updateSettings();
  }
}
</script>

<style lang="scss">
@import "@/assets/_shared.scss";
</style>