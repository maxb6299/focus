<template>
  <div class="main">
    <div></div>
    <Settings @send-settings="saveSettings"></Settings>
    <Timer :settings="settings.timerSettings"></Timer>
    <MusicPlayer></MusicPlayer>
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
      settings: {
        
      }
    }
  },

  methods: {
    saveSettings(data) {
      this.settings = data;
    }
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