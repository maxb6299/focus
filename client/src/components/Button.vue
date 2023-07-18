<template>
    <div>
        <img 
        class="icon" :src="`/assets/icons/${this.buttonName}.png`"
        @click="toggleButton" 
        :alt="buttonName">

        <div v-if="isButtonOn">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['buttonName', 'isSmall'],

        data() {
            return {
                isButtonOn: false
            }
        },
        
        methods: {
            toggleButton() {
                this.isButtonOn = !this.isButtonOn;
            }
        }
    }
</script>

<style>
    .icon { 
        width: 64px;
        height: 64px;
    }
</style>