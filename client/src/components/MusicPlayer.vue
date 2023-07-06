<template>
    <iframe width="400" :src=musicLink></iframe>
</template>

<script>
    export default {
        data() {
            return {
                musicLink: 'https://www.youtube-nocookie.com/embed/Hlp6aawXVoY'
            }
        },

        methods: {
            getWebsiteName(link) {
                var websiteNameStartIndex; // index that name begins in string

                // so string skips 'https://'
                for (var i = 0; i < 20; i++) { 
                    if (link.substring(i, i + 2) == '//') {
                        websiteNameStartIndex = i + 2;
                    }
                }
                // so string skips 'www.'
                if (link.substring(websiteNameStartIndex, websiteNameStartIndex + 4) == 'www.') {
                    websiteNameStartIndex += 4;
                }

                var websiteNameEndIndex = websiteNameStartIndex;
                while (true) {
                    if (link[websiteNameEndIndex] == '.') {
                        break;
                    }
                    websiteNameEndIndex++;
                }

                var websiteName = link.substring(websiteNameStartIndex, websiteNameEndIndex);
                return websiteName;
            },
            configureLink() {           
                var websiteName = this.getWebsiteName(this.musicLink);

                if (websiteName == 'youtube') this.configureYoutube;
                else if (websiteName == 'soundcloud') this.configureSoundcloud;

            },
            configureYoutube() {

            },
            configureSoundcloud() {

            }
        }
    }
</script>