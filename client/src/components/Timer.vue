<template>
    <div>
        <div class="timer">
            <div class="time">{{ interface.timeString }}</div>

            <div class="timer-buttons">
                <img class="timer-button-icon" src="/assets/icons/Pause.png" @click="pause" alt="Pause">
                <img class="timer-button-icon" src="/assets/icons/Play.png" @click="play" alt="Play">
                <img class="timer-button-icon" src="/assets/icons/Skip.png" @click="cycleTimerMode" alt="Skip">
            </div>
        </div>
    </div>
</template>

<script>
import { useSettingsStore } from "@/store/SettingsStore.js";

export default {
    setup() {
        const settingsStore = useSettingsStore();
        return { settingsStore }
    },

    data() {
        return {
            machine: {
                interval: null,
                remainingSeconds: 0,
                timerMode: 'work',
                intervalCounter: 0
            },

            interface: {
                timeString: ''
            }                
        }
    },

    methods: {
        updateInterfaceTime() {
            const minutes = Math.floor(this.machine.remainingSeconds / 60);
            const seconds = this.machine.remainingSeconds % 60;

            this.interface.timeString = minutes.toString().padStart(2, "0")
                        + ":" + seconds.toString().padStart(2, "0");
        },

        initialize() {
            this.pause();
            
            if (this.machine.timerMode == "work") {
                this.machine.remainingSeconds = this.settingsStore.getTimerSettings.workMinutes * 60;
            } else if (this.machine.timerMode == "break") {
                this.machine.remainingSeconds = this.settingsStore.getTimerSettings.breakMinutes * 60;
            } else {
                this.machine.remainingSeconds = this.settingsStore.getTimerSettings.longBreakMinutes * 60;
            }

            this.updateInterfaceTime();
        },

        play() {
            if (this.machine.interval == null) {
                this.machine.interval = setInterval(() => {
                    this.machine.remainingSeconds--;
                    this.updateInterfaceTime();

                    if (this.machine.remainingSeconds == 0) this.stop();
                }, 1000)
            }
        },

        pause() {
            clearInterval(this.machine.interval);

            this.machine.interval = null;

            this.updateInterfaceTime();
        },

        stop() {
            this.pause();

            this.cycleTimerMode();
            
            new Audio(this.settingsStore.getTimerSettings.alarmSound).play();
        },

        cycleTimerMode() {
            if (this.machine.timerMode == "work") {
                this.machine.intervalCounter++;

                if (this.machine.intervalCounter % 
                    this.settingsStore.getTimerSettings.longBreakInterval != 0) {
                    this.machine.timerMode = "break";
                } else {
                    this.machine.timerMode = "longBreak"
                }
            } else if (this.machine.timerMode == "break" 
                    || this.machine.timerMode == "longBreak") {
                this.machine.timerMode = "work";
            }

            this.initialize();
        }
    },
    
    watch: {
        'settingsStore.getTimerSettings': {
            deep: true,
            handler() {
                this.initialize();
            },
        },
    },

    beforeMount() {
        this.initialize();
    }
}
</script>