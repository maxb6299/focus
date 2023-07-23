<template>
  <div class="main">
    <div class="navbar">
      <Button :buttonName="'Logo'"></Button>
      <Button :buttonName="'About'"><About></About></Button>
      <div style="width:64px; height:64px;"></div>
      <Button :buttonName="'Account'"><Account @signed-in-or-out="getSettings"></Account></Button>
      <Button :buttonName="'Settings'"><Settings></Settings></Button>
    </div>
    
    <Timer v-if="this.settingsStore.getAppSettings.showTimer"></Timer>
    <MusicPlayer v-if="this.settingsStore.getAppSettings.showMusic"></MusicPlayer>

  </div>
</template>

<script>
import About from './components/About.vue'
import Account from './components/Account.vue'
import Button from './components/Button.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import Settings from './components/Settings.vue'
import Timer from './components/Timer.vue'

import { useSettingsStore } from "./store/SettingsStore.js";

export default {
  name: 'App',
  components: {
    About,
    Account,
    Button,
    MusicPlayer,
    Settings,
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