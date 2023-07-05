<template>
    <div class="timer">
        {{ interface.minutes }} : {{interface.seconds}}
        <div class="buttons">
            <button @click="pause">Pause</button>
            <button @click="play">Play</button>
            <button @click="cycleTimerMode">Change Timer Mode</button>
        </div>
    </div>
    
    <div>
        <button @click="toggleSettings">Settings</button>
            <form @submit.prevent="sendData" v-if="interface.showSettings">
                Time For Work: <input v-model="settings.workMinutes"> <br>
                Time For Break: <input v-model="settings.breakMinutes"> <br>
        </form>
    </div>
    


    <!-- <div>
        For Testing:
        <div>machine.remainingSeconds: {{ machine.remainingSeconds }}</div>
        <div>machine.timerMode: {{ machine.timerMode }}</div>
        <div>interface.minutes: {{ interface.minutes }}</div>
        <div>interface.seconds: {{ interface.seconds }}</div>
        <button @click="stop">Stop</button>
    </div> -->
</template>

<script>
    export default {
        data() {
            return {
                machine: {
                    interval: null,
                    remainingSeconds: 0,
                    timerMode: 'work'
                },

                interface: {
                    minutes: '0',
                    seconds: '0',

                    showSettings: false
                },

                settings: {
                    workMinutes: 27,
                    breakMinutes: 3,
                    longBreakMinutes: 15,

                    alarmSound: new Audio('/assets/alarm.mp3')              
                }
                
            }
        },

        methods: {
            updateInterfaceTime() {
                const minutes = Math.floor(this.machine.remainingSeconds / 60);
                const seconds = this.machine.remainingSeconds % 60;

                this.interface.minutes = minutes.toString().padStart(2, "0");
                this.interface.seconds = seconds.toString().padStart(2, "0");
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
                this.machine.interval = setInterval(() => {
                    this.machine.remainingSeconds--;
                    this.updateInterfaceTime();
                    
                    if (this.machine.remainingSeconds == 0) this.stop();
                }, 1000)
            },

            pause() {
                clearInterval(this.machine.interval);

                this.machine.interval = null;

                this.updateInterfaceTime();
            },

            stop() {
                this.pause();

                this.cycleTimerMode();
                
                this.settings.alarmSound.play();
            },

            cycleTimerMode() {
                if (this.machine.timerMode == "work") {
                    this.machine.timerMode = "break";
                } else if (this.machine.timerMode == "break") {
                    this.machine.timerMode = "work";
                }

                this.initialize();
            },

            toggleSettings() {
            this.interface.showSettings = !this.interface.showSettings;
            }
        },

        

        beforeMount() {
            this.initialize();
        }
    }

    
</script>