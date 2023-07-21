<template>
    <div>
        <form @submit.prevent="saveSettings">

            <div>
                Navbar: <input v-model="newSettings.appSettings.showNavbar" type="checkbox"> <br>
            </div>    
 
            <div>
                Timer: <input v-model="newSettings.appSettings.showTimer" type="checkbox"> <br>
                
                Time For Work: <input required 
                v-model="newSettings.timerSettings.workMinutes" 
                type="number" min="1" step="1"
                placeholder="25"> <br>

                Time For Break: <input required 
                v-model="newSettings.timerSettings.breakMinutes" 
                type="number" min="1" step="1"
                placeholder="5"> <br>

                Time For Long Break: <input required 
                v-model="newSettings.timerSettings.longBreakMinutes" 
                type="number" min="1" step="1"
                placeholder="5"> <br>

                Long Break Interval: <input required 
                v-model="newSettings.timerSettings.longBreakInterval" 
                type="number" min="1" step="1"
                placeholder="5"> <br>
            </div>
        
            <div>
                Music: <input v-model="newSettings.appSettings.showMusic" type="checkbox"> <br>
                
                Music Link: <input required 
                v-model="newSettings.musicSettings.musicLink" 
                type="url"
                placeholder="https://www.youtube.com/watch?v=Hlp6aawXVoY"><br>
            </div>

            <input type="submit" value="Save">
        </form>
    </div>
</template>

<script>
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
            }, 
            newSettings: {}
        }
    },

    methods: {
        getSettings() {
            const SIGNED_IN = this.readCookie('id_token');

            if (SIGNED_IN) this.getCloudSettings();
            else this.getCookieSettings();
        },
        saveSettings() {
            const SIGNED_IN = this.readCookie('id_token');
            
            if (SIGNED_IN) this.saveCloudSettings(this.newSettings);
            else this.saveCookieSettings(this.newSettings);

            this.copySettings(this.newSettings);
        },
        copySettings(newSettings) {
            if (newSettings.appSettings) {
                this.settings.appSettings = newSettings.appSettings;
            }
            if (newSettings.musicSettings) {
                this.settings.musicSettings = newSettings.musicSettings;
            }
            if (newSettings.timerSettings) {
                this.settings.timerSettings = newSettings.timerSettings;
            }
        },
        sendSettings() {
            this.$emit("get-cookie")
        },

        getCookieSettings() {
            const settingsCookie = this.readCookie('settings');

            this.copySettings(settingsCookie);
        },
        saveCookieSettings(data) {
            let settingsString = JSON.stringify(data);
            
            document.cookie = `settings=${settingsString}; expires= Sun, 1 January 2030 12:00:00 UTC; path=/`
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
                this.copySettings(cloudSettings);
            } catch (error) {
                console.error(error);
            }
        },
        async saveCloudSettings(data) {
            const token = this.readCookie('id_token');

            const URL = 'http://localhost:3000/users/settings/';
            const BODY = JSON.stringify({ settings: data });
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
        }, 

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
        }
    },

    created() {
        this.getSettings();
        this.newSettings = this.settings;
    }
}
</script>