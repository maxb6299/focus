<template>
    <div>
        <div class="timer">
            {{ interface.timeString }}
            <div class="buttons">
                <button @click="pause">Pause</button>
                <button @click="play">Play</button>
                <button @click="cycleTimerMode">Skip</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['settings'],

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
                this.machine.remainingSeconds = this.settings.workMinutes * 60;
            } else if (this.machine.timerMode == "break") {
                this.machine.remainingSeconds = this.settings.breakMinutes * 60;
            } else {
                this.machine.remainingSeconds = this.settings.longBreakMinutes * 60;
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
            
            new Audio(this.settings.alarmSound).play();
        },

        cycleTimerMode() {
            if (this.machine.timerMode == "work") {
                this.machine.intervalCounter++;

                if (this.machine.intervalCounter % 
                    this.settings.longBreakInterval != 0) {
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
        settings() {
            this.initialize();
        }
    },

    beforeMount() {
        this.initialize();
    }
}
</script>