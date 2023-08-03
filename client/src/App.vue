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
    gap: 150px;
  }

  body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .background {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 18px;
    padding-right: 18px;
    width: 1000px;
    height: 100%;
    background-image: url("@/../public/assets/icons/Dot.png");
    background-size: 36px;
    background-position-y: 16px;
    background-position-x: 16px;
    background-clip: content-box;
  }
</style>