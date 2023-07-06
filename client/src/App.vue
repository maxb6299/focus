<template>
  <div class="main">
    <div></div>
    <Timer></Timer>
    <MusicPlayer></MusicPlayer>
  </div>
</template>

<script>
import MusicPlayer from './components/MusicPlayer.vue'
import Navbar from './components/Navbar.vue'
import Timer from './components/Timer.vue'

export default {
  name: 'App',
  components: {
    MusicPlayer,
    Timer
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