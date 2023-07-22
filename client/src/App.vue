<template>
  <div class="main">
    <div class="navbar">
      <Button :buttonName="'Logo'"></Button>
      <Button :buttonName="'About'"><About></About></Button>
      <div style="width:64px; height:64px;"></div>
      <Button :buttonName="'Account'"><Account @signed-in-or-out="getSettings"></Account></Button>
      <Button :buttonName="'Settings'"><Settings @updated-settings="getSettings"></Settings></Button>
    </div>
    
    <Timer v-if="settings.appSettings.showTimer" :settings="settings.timerSettings"></Timer>
    <MusicPlayer v-if="settings.appSettings.showMusic" :settings="settings.musicSettings"></MusicPlayer>
  </div>
</template>

<script>
import About from './components/About.vue'
import Account from './components/Account.vue'
import Button from './components/Button.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import Settings from './components/Settings.vue'
import Timer from './components/Timer.vue'

import settingsHelper from './_helpers/settings.js'

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
  data() {
    return { settings: settingsHelper.getDefaultSettings() }
  },

  methods: {
    async getSettings() {
      this.settings = await settingsHelper.getSettings();
    },
  },

  async created() {
    document.title = "Focus";
    await this.getSettings();
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