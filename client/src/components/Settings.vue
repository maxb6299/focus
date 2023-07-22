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
import settingsHelper from '../_helpers/settings.js'
import cookieHelper from '../_helpers/cookie.js'

export default {
    data() {
        return {
            settings: {
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
            }
        }
    },

    methods: {
        async getSettings() {
            const SIGNED_IN = cookieHelper.readCookie('id_token');
            const HAS_COOKIE = cookieHelper.readCookie('settings')

            if (SIGNED_IN) this.settings = await settingsHelper.getCloudSettings();
            else if (HAS_COOKIE) this.settings = settingsHelper.getCookieSettings();
        },
        async saveSettings() {
            const SIGNED_IN = cookieHelper.readCookie('id_token');
            
            if (SIGNED_IN) await settingsHelper.saveCloudSettings(this.settings);
            else settingsHelper.saveCookieSettings(this.settings);

            this.$emit("updated-settings");
        }
    },

    async mounted() {
        await this.getSettings();
    }
}
</script>