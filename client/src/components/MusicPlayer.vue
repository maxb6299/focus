<template>
    <iframe width="400" :src=this.configureYoutubeLink(this.settingsStore.getMusicSettings.musicLink)></iframe>
</template>

<script>
import { useSettingsStore } from "../store/SettingsStore.js";
export default {
    setup() {
        const settingsStore = useSettingsStore();
        return { settingsStore }
    },

    methods: {
        configureYoutubeLink(link) {
            const linkBase = "https://www.youtube-nocookie.com/embed/"
            let configuredLink = linkBase + link.substring(32, 43)
            return configuredLink;
        }
    }
}
</script>