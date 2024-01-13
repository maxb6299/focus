<template>
    <div class="timer-outline">
        <div class="timer">
            <div class="time">{{ interface.timeString }}</div>

            <div class="timer-buttons">
                <img class="timer-button-icon" src="/assets/icons/Pause.png" v-show="machine.worker" @click="pause" alt="Pause">
                <img class="timer-button-icon" src="/assets/icons/Play.png" v-show="!machine.worker" @click="play" alt="Play">
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
                worker: null,
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
            if (this.machine.worker) this.machine.worker.terminate();

            this.machine.worker = new Worker('/timerWorker.js');

            this.machine.worker.postMessage({action: 'play', duration: 60, remainingSeconds: this.machine.remainingSeconds});

            this.machine.worker.onmessage = (message) => {
                this.machine.remainingSeconds = message.data.remainingSeconds;
                this.updateInterfaceTime();
            }
        },

        pause() {
            
            if (this.machine.worker) {
                this.machine.worker.postMessage({ action: 'pause'});
                this.machine.worker.terminate();
            }

            this.machine.worker = null;

            this.updateInterfaceTime();
        },

        stop() {
            this.pause();

            this.cycleTimerMode();
            
            this.notify();
            
            new Audio(this.settingsStore.getTimerSettings.alarmSound).play();
        },

        notify() {
            var message;

            if (this.machine.timerMode == 'work') { message = 'Time for work!'}
            else if (this.machine.timerMode == 'break') { message = 'Time for a break!'}                
            else { message = 'Time for a long break!'}

            if ('Notification' in window) {
                Notification.requestPermission().then((permission) => {
                    if (permission === 'granted') {
                        new Notification('Timer Ended', {
                            body: message,
                        });
                    }
                });
            }
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
    },

    beforeUnmount() {
        this.pause();
    }
}
</script>