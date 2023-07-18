<template>
    <div>
        <button @click="toggleSettings">Settings</button>
        <div v-if="viewSettings">
            <form @submit.prevent="saveSettings">
                        Timer: <br>
                        Time For Work: <input required 
                        v-model="settings.timerSettings.workMinutes" 
                        type="number" min="1" step="1"
                        placeholder="25"> <br>

                        Time For Break: <input required 
                        v-model="settings.timerSettings.breakMinutes" 
                        type="number" min="1" step="1"
                        placeholder="5"> <br>

                        Time For Long Break: <input required 
                        v-model="settings.timerSettings.longBreakMinutes" 
                        type="number" min="1" step="1"
                        placeholder="5"> <br>

                        Long Break Interval: <input required 
                        v-model="settings.timerSettings.longBreakInterval" 
                        type="number" min="1" step="1"
                        placeholder="5"> <br>
            
                        Music: <br>
                        Music Link: <input required 
                        v-model="settings.musicSettings.musicLink" 
                        type="url"
                        placeholder="https://www.youtube.com/watch?v=Hlp6aawXVoY"><br>
                <input type="submit" value="Save">
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                viewSettings: false,

                settings: {
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
            toggleSettings() {
                this.viewSettings = !this.viewSettings;
            },
            getCookie() {
                let cookie = document.cookie;
                let trimmedCookie = cookie.substring(9, cookie.length + 1);
                let parsedData = JSON.parse(trimmedCookie);

                this.settings = parsedData;
            },
            saveCookie(data) {
                let dataString = JSON.stringify(data);
                
                document.cookie = "settings=" + dataString 
                + "; expires= Sun, 1 January 2030 12:00:00 UTC; path=/";
            },
            saveSettings() {
                this.saveCookie(this.settings);

                console.log(document.cookie)

                this.sendSettings();

                this.toggleSettings();
            },
            sendSettings() {
                this.$emit("get-cookie")
            }
        },

        beforeMount() {
            if (!document.cookie) {
                this.saveCookie(this.settings);
            } else {
                this.getCookie();
            }

            this.sendSettings();
        }
    }
</script>