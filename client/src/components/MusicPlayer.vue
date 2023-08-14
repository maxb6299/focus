<template>
    <!-- <div>
        <div v-show="!isPaused" id="player"></div>
        <button @click="togglePlayback">{{ isPaused ? 'Play' : 'Pause' }}</button>
    </div> -->
</template>

<script>
export default {
    data() {
        return {
            isPaused: true,
            player: null
        };
    },
    methods: {
        togglePlayback() {
            if (this.isPaused) {
                this.player = new window.YT.Player('player', {
                    videoId: 'Hlp6aawXVoY', // Replace with the YouTube video ID you want to play
                    events: {
                        onReady: () => {
                            this.player.playVideo();
                        }
                    }
                });
            } else {
                this.player.pauseVideo();
            }
            this.isPaused = !this.isPaused;
        }
    },
    mounted() {
        // Load YouTube Iframe Player API
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
};
</script>