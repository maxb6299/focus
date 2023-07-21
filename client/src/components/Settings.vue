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
        readCookie(name) {
            let cookie = document.cookie;

            let cookieStartIndex = cookie.indexOf(`${name}=`);
            if (cookieStartIndex === -1) { return }
            let cookieEndIndex = cookie.indexOf(';', cookieStartIndex);
            if (cookieEndIndex === -1) { cookieEndIndex = cookie.length }

            let cookieString = cookie.substring(cookieStartIndex + 9, cookieEndIndex);
            let parsedCookie;
            
            try { parsedCookie = JSON.parse(cookieString) }
            catch (error) { return null }

            return parsedCookie;
        },

        getCookieSettings() {
            const settingsCookie = this.readCookie('settings');

            if (settingsCookie.appSettings) {
                this.settings.appSettings = settingsCookie.appSettings;
            }
            if (settingsCookie.musicSettings) {
                this.settings.musicSettings = settingsCookie.musicSettings;
            }
            if (settingsCookie.timerSettings) {
                this.settings.timerSettings = settingsCookie.timerSettings;
            }
        },
        saveCookieSettings(data) {
            let dataString = JSON.stringify(data);
            
            document.cookie = `settings=${dataString}; expires= Sun, 1 January 2030 12:00:00 UTC; path=/`
        },
        saveSettings() {
            this.saveCookieSettings(this.settings);

            this.sendSettings();
        },
        sendSettings() {
            this.$emit("get-cookie")
        },

        async getCloudSettings() {
            const token = this.readCookie('id_token');

            const URL = `http://localhost:3000/users/settings/`;
            try {
                const response = await fetch(URL, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                })
                if (!response.ok) {
                    throw new Error("Error getting cloud settings");
                }
                
                const cloudSettings = await response.json();
                return cloudSettings;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
        async saveCloudSettings() {
            const token = this.readCookie('id_token');

            const URL = 'http://localhost:3000/users/settings/';
            const BODY = JSON.stringify({ settings: this.settings });
            try {
                const response = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: BODY
                })
                if (!response.ok) {
                    throw new Error("Error updating cloud settings");
                }
                const cloudSettings = await response.json();
                return cloudSettings;
            } catch (error) {
                console.error(error);
                return null;
            }
        }
    },

    created() {
        if (document.cookie) {
            this.getCookieSettings();
        } else {
            this.saveCookieSettings(this.settings);
        }

        this.sendSettings();
    }
}
</script>