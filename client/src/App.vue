<template>
  <div class="main">
    <NavigationBar></NavigationBar>
    
    <Timer v-if="this.settingsStore.getAppSettings.showTimer"></Timer>
    <MusicPlayer v-if="this.settingsStore.getAppSettings.showMusic"></MusicPlayer>

  </div>
</template>

<script>
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
    return { settingsStore }
  },

  created() {
    document.title = "Focus";
    this.settingsStore.updateSettings();
  }
}
</script>

<style>
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 150px
  }
  .navbar {
    display: flex;
    gap: 16px;
  }
</style>