<template>
    <div>
        <form @submit.prevent="saveSettings">

            <div>
                Dark Mode: <input v-model="newSettings.appSettings.darkMode" type="checkbox"> <br>
            </div>

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
import settingsHelper from "@/_helpers/settings.js";
import { useSettingsStore } from "@/store/SettingsStore.js";

export default {
    data() {
        return {
            settingsStore: useSettingsStore(),
            newSettings: settingsHelper.getDefaultSettings()
        }
    },
    methods: {
        async getSettings() {
            const copiedSettings = JSON.parse(JSON.stringify(this.settingsStore.getSettings));
            this.newSettings = copiedSettings;
        },
        async saveSettings() {
            this.settingsStore.saveSettings(this.newSettings);
            this.$emit('savedSettings')
        }
    },

    mounted() {
        this.getSettings();
    }
}
</script>