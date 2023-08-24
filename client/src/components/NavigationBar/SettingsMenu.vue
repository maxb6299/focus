<template>
    <div class="settings">
        <form @submit.prevent="saveSettings">

            <div class="checkbox-wrapper">
                Dark Mode: <label for="darkMode" class="checkbox-label">
                    <input id="darkMode" v-model="newSettings.appSettings.darkMode" type="checkbox" class="checkbox-input">
                    <img :src="newSettings.appSettings.darkMode ? '/assets/icons/Checked.png' : '/assets/icons/Unchecked.png'" alt="Checkbox" class="checkbox-image">
                </label>
            </div>

            <div class="checkbox-wrapper">
                Dots: <label for="showDots" class="checkbox-label">
                    <input id="showDots" v-model="newSettings.appSettings.showDots" type="checkbox" class="checkbox-input">
                    <img :src="newSettings.appSettings.showDots ? '/assets/icons/Checked.png' : '/assets/icons/Unchecked.png'" alt="Checkbox" class="checkbox-image">
                </label>
            </div>

            <div class="checkbox-wrapper">
                Navbar: <label for="showNavbar" class="checkbox-label">
                    <input id="showNavbar" v-model="newSettings.appSettings.showNavbar" type="checkbox" class="checkbox-input">
                    <img :src="newSettings.appSettings.showNavbar ? '/assets/icons/Checked.png' : '/assets/icons/Unchecked.png'" alt="Checkbox" class="checkbox-image">
                </label>
            </div>   
 
            <div>
                <div class="checkbox-wrapper">
                    Timer: <label for="showTimer" class="checkbox-label">
                        <input id="showTimer" v-model="newSettings.appSettings.showTimer" type="checkbox" class="checkbox-input">
                        <img :src="newSettings.appSettings.showTimer ? '/assets/icons/Checked.png' : '/assets/icons/Unchecked.png'" alt="Checkbox" class="checkbox-image">
                    </label>
                </div>
                
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
                <div class="checkbox-wrapper">
                    Music Player: <label for="showMusic" class="checkbox-label">
                        <input id="showMusic" v-model="newSettings.appSettings.showMusic" type="checkbox" class="checkbox-input">
                        <img :src="newSettings.appSettings.showMusic ? '/assets/icons/Checked.png' : '/assets/icons/Unchecked.png'" alt="Checkbox" class="checkbox-image">
                    </label>
                </div>
                
                Music Link: <input required 
                v-model="newSettings.musicSettings.musicLink" 
                type="url"
                placeholder="https://www.youtube.com/watch?v=Hlp6aawXVoY"><br>
            </div>

            <button type="submit" class="save-button">Save</button>
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