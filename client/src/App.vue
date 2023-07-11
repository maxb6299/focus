<template>
  <div class="main">
    <div></div>
    <Settings @get-cookie="getCookie"></Settings>
    <Timer :settings="settings.timerSettings"></Timer>
    <MusicPlayer :settings="settings.musicSettings"></MusicPlayer>
  </div>
</template>

<script>
import MusicPlayer from './components/MusicPlayer.vue'
import Settings from './components/Settings.vue'
import Timer from './components/Timer.vue'

export default {
  name: 'App',
  components: {
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
</style>