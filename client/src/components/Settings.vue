<template>
    <div>
        <form @submit.prevent="saveSettings">

            <div>
                Navbar: <input v-model="settings.appSettings.showNavbar" type="checkbox"> <br>
            </div>    
 
            <div>
                Timer: <input v-model="settings.appSettings.showTimer" type="checkbox"> <br>
                
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
            </div>
        
            <div>
                Music: <input v-model="settings.appSettings.showMusic" type="checkbox"> <br>
                
                Music Link: <input required 
                v-model="settings.musicSettings.musicLink" 
                type="url"
                placeholder="https://www.youtube.com/watch?v=Hlp6aawXVoY"><br>
            </div>

            <input type="submit" value="Save">
        </form>
    </div>
</template>

<script>
import { reactive } from 'vue';

    export default {
        data() {
            return {
                settings: reactive({
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
                })
            }
        },

        methods: {
            getCookie() {
                let cookie = document.cookie;
                let trimmedCookie = cookie.substring(9, cookie.length + 1);
                let parsedData = JSON.parse(trimmedCookie);
                
                if (parsedData.appSettings) {
                    this.settings.appSettings = parsedData.appSettings;
                }
                if (parsedData.musicSettings) {
                    this.settings.musicSettings = parsedData.musicSettings;
                }
                if (parsedData.timerSettings) {
                    this.settings.timerSettings = parsedData.timerSettings;
                }
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
            },
            sendSettings() {
                this.$emit("get-cookie")
            }
        },

        created() {
            if (document.cookie) {
                this.getCookie();
            } else {
                this.saveCookie(this.settings);
            }

            this.sendSettings();
        }
    }
</script>