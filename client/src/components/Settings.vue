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

export default {
    data() {
        return { settings: settingsHelper.getDefaultSettings() }
    },

    methods: {
        async getSettings() {
            this.settings = await settingsHelper.getSettings();
        },
        async saveSettings() {
            settingsHelper.saveSettings(this.settings);
            this.$emit("updated-settings");
        }
    },

    async mounted() {
        await this.getSettings();
    }
}
</script>