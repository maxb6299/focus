<template>
    <div>
        <img class="icon" :src="`/assets/icons/${this.buttonName}.png`" @click="toggleModal" :alt="buttonName">

        <teleport to="#modals">
            <div v-if="isModalOn" class="content">
                <slot></slot>
            </div>
        </teleport>
    </div>
</template>

<script>
export default {
    props: ['buttonName', 'isSmall', 'isModalAllowed'],

    data() {
        return {
            isModalOn: false
        }
    },

    methods: {
        toggleModal() {
            this.isModalOn = !this.isModalOn;
        }
    }
}
</script>

<style scoped>
.icon {
    width: 64px;
    height: 64px;
}

.content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: white;
    padding: 16px;
    border-radius: 2px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>