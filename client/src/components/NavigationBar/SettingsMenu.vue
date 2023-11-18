<template>
    <div class="settings">
        <form @submit.prevent="saveSettings" class="settings-form">
            <div class="checkbox-wrapper">
                Toggle Theme: 
                <label for="lightText" class="checkbox-label">
                    <input id="lightText" @click="toggleTheme" type="checkbox" class="checkbox-input">
                    <img :src="newSettings.appSettings.backgroundColor == '#FFFFFF' && 
                               newSettings.appSettings.lightText == false ? 
                               '/assets/icons/Checked.png' : '/assets/icons/Unchecked.png'" 
                               alt="Checkbox" class="checkbox-image">
                </label>
            </div>
            
            <div>
                Custom Color: <input 
                v-model="newSettings.appSettings.backgroundColor" 
                type="color"> <br>
            </div>
                
            <div class="checkbox-wrapper">
                Light Text: <label for="lightText" class="checkbox-label">
                    <input id="lightText" v-model="newSettings.appSettings.lightText" type="checkbox" class="checkbox-input">
                    <img :src="newSettings.appSettings.lightText ? '/assets/icons/Checked.png' : '/assets/icons/Unchecked.png'" alt="Checkbox" class="checkbox-image">
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
 
            <div class="checkbox-wrapper">
                Timer: <label for="showTimer" class="checkbox-label">
                    <input id="showTimer" v-model="newSettings.appSettings.showTimer" type="checkbox" class="checkbox-input">
                    <img :src="newSettings.appSettings.showTimer ? '/assets/icons/Checked.png' : '/assets/icons/Unchecked.png'" alt="Checkbox" class="checkbox-image">
                </label>
            </div>

            <div>
                Time For Work: <input required 
                v-model="newSettings.timerSettings.workMinutes" 
                type="number" min="1" step="1"
                placeholder="25"> <br>
            </div>

            <div>
                Time For Break: <input required 
                v-model="newSettings.timerSettings.breakMinutes" 
                type="number" min="1" step="1"
                placeholder="5"> <br>
            </div>

            <div>
                Time For Long Break: <input required 
                v-model="newSettings.timerSettings.longBreakMinutes" 
                type="number" min="1" step="1"
                placeholder="5"> <br>
            </div>

            <div>
                Long Break Interval: <input required 
                v-model="newSettings.timerSettings.longBreakInterval" 
                type="number" min="1" step="1"
                placeholder="5"> <br>
            </div>
        
            <div class="checkbox-wrapper">
                Music Player: <label for="showMusic" class="checkbox-label">
                    <input id="showMusic" v-model="newSettings.appSettings.showMusic" type="checkbox" class="checkbox-input">
                    <img :src="newSettings.appSettings.showMusic ? '/assets/icons/Checked.png' : '/assets/icons/Unchecked.png'" alt="Checkbox" class="checkbox-image">
                </label>
            </div>
            
            <div>
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
            newSettings: settingsHelper.getDefaultSettings(),
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
        },
        toggleTheme() {
            if (this.newSettings.appSettings.backgroundColor == '#FFFFFF' &&
                this.newSettings.appSettings.lightText == false) {
                this.setDarkMode();
            } else {
                this.setLightMode();
            }
        },
        setLightMode() {
            this.newSettings.appSettings.backgroundColor = "#FFFFFF";
            this.newSettings.appSettings.lightText = false;
        },
        setDarkMode() {
            this.newSettings.appSettings.backgroundColor = "#000000";
            this.newSettings.appSettings.lightText = true;
        }
    },

    mounted() {
        this.getSettings();
    }
}
</script>