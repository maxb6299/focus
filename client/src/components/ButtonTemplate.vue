<template>
    <div class="button-icon">
        <img class="button-icon" :src="`/assets/icons/${this.buttonName}.png`" @click="emitClick" :alt="buttonName">

        <teleport to="#modals">
            <div v-if="isModalOn" class="button-content background">
                <slot></slot>
            </div>
        </teleport>
    </div>
</template>

<script>
export default {
    props: ['buttonName', 'isModalOn'],

    methods: {
        emitClick() {
            this.$emit('buttonClicked', this.buttonName)
        },
        handleKeyDown(event) {
            if (event.key === 'Escape' && this.isModalOn) {
                this.emitClick();
            }
        }
    },
    
    mounted() {
        document.addEventListener('keydown', this.handleKeyDown);
    },
    beforeUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }
}
</script>