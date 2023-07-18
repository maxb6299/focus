<template>
  <div class="main">
    <div class="navbar">
      <Button :buttonName="'Logo'"></Button>
      <Button :buttonName="'About'"><About></About></Button>
      <div style="width:64px; height:64px;"></div>
      <Button :buttonName="'Account'"><Account></Account></Button>
      <Button :buttonName="'Settings'"><Settings @get-cookie="getCookie"></Settings></Button>
    </div>
    
    <Timer :settings="settings.timerSettings"></Timer>
    <MusicPlayer :settings="settings.musicSettings"></MusicPlayer>
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
      settings: {}
    }
  },

  methods: {
    getCookie() {
      let cookie = document.cookie;
      let trimmedCookie = cookie.substring(9, cookie.length + 1);
      let parsedData = JSON.parse(trimmedCookie);

      this.settings = parsedData;
    }
  },

  created() {
    document.title = "Focus";
    this.getCookie();
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