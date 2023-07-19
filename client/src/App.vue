<template>
  <div class="main">
    <div class="navbar">
      <Button :buttonName="'Logo'"></Button>
      <Button :buttonName="'About'"><About></About></Button>
      <div style="width:64px; height:64px;"></div>
      <Button :buttonName="'Account'"><Account></Account></Button>
      <Button :buttonName="'Settings'"><Settings @get-cookie="getCookie"></Settings></Button>
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
    getCookie() {
      let cookie = document.cookie;

      let settingsStartIndex = cookie.indexOf('settings=');
      if (settingsStartIndex === -1) { return }
      let settingsEndIndex = cookie.indexOf(';', settingsStartIndex);
      if (settingsEndIndex === -1) { settingsEndIndex = cookie.length }

      let settingsString = cookie.substring(settingsStartIndex + 9, settingsEndIndex);
      let parsedSettings;
      try { parsedSettings = JSON.parse(settingsString) } 
      catch (error) { return }

      if (parsedSettings.appSettings) {
        this.settings.appSettings = parsedSettings.appSettings;
      }
      if (parsedSettings.musicSettings) {
        this.settings.musicSettings = parsedSettings.musicSettings;
      }
      if (parsedSettings.timerSettings) {
        this.settings.timerSettings = parsedSettings.timerSettings;
      }
    }
  },

  created() {
    document.title = "Focus";
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