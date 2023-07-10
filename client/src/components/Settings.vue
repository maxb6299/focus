<template>
    <div>
        <button @click="toggleSettings">Settings</button>
        <div v-if="viewSettings">
            <form @submit.prevent="saveSettings">
                        Timer: <br>
                        Time For Work: <input required 
                        v-model="formSettings.timerSettings.workMinutes" 
                        type="number" min="1" step="1"
                        placeholder="25"> <br>

                        Time For Break: <input required 
                        v-model="formSettings.timerSettings.breakMinutes" 
                        type="number" min="1" step="1"
                        placeholder="5"> <br>

                        Time For Long Break: <input required 
                        v-model="formSettings.timerSettings.longBreakMinutes" 
                        type="number" min="1" step="1"
                        placeholder="5"> <br>

                        Long Break Interval: <input required 
                        v-model="formSettings.timerSettings.longBreakInterval" 
                        type="number" min="1" step="1"
                        placeholder="5"> <br>
            
                        Music: <br>
                        Music Link: <input required 
                        v-model="formSettings.musicSettings.musicLink" 
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
                        workMinutes: 27,
                        breakMinutes: 3,
                        longBreakMinutes: 15,

                        longBreakInterval: 3,

                        alarmSound: '/assets/alarm.mp3'
                    }
                },

                formSettings: { timerSettings: { }}
            }
        },

        methods: {
            toggleSettings() {
                this.viewSettings = !this.viewSettings;

                let string = JSON.stringify(this.settings);
                this.formSettings = JSON.parse(string);
            },
            saveSettings() {
                let string = JSON.stringify(this.formSettings);
                this.settings = JSON.parse(string);
                
                this.sendSettings();
            },
            sendSettings() {
                this.$emit("send-settings", this.settings)
            }
        },

        beforeMount() {
            this.sendSettings();
        }
    }
</script>