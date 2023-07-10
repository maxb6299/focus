<template>
    <iframe width="400" :src=this.configureYoutubeLink(settings.musicLink)></iframe>
</template>

<script>
    export default {
        props: ['settings'],

        methods: {
            configureYoutubeLink(link) {
                const linkBase = "https://www.youtube-nocookie.com/embed/"
                let configuredLink = linkBase + link.substring(32, 43)
                return configuredLink;
            }
        }
    }
</script>