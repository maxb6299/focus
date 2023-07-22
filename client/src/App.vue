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
import cookieHelper from './_helpers/cookie.js'

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
    return {
      settings: {
        appSettings: {
          showMusic: true,
          showNavbar: true,
          showTimer: true,
        },
        musicSettings: {
          musicLink: 'https://www.youtube.com/watch?v=Hlp6aawXVoY'
        },
        timerSettings: {
          workMinutes: 25,
          breakMinutes: 5,
          longBreakMinutes: 15,

          longBreakInterval: 3,

          alarmSound: '/assets/alarm.mp3'
        }
      }
    }
  },

  methods: {
    async getSettings() {
      const SIGNED_IN = cookieHelper.readCookie('id_token');
      const HAS_COOKIE = cookieHelper.readCookie('settings')

      if (SIGNED_IN) this.settings = await settingsHelper.getCloudSettings();
      else if (HAS_COOKIE) this.settings = settingsHelper.getCookieSettings();
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