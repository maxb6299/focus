<template>
    <div class="menu">
        <GoogleLogin v-show="!isSignedIn" :callback="signIn" />
        <button v-show="isSignedIn" @click="signOut">Sign out</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

var isSignedIn = ref(doesCookieExist());

function doesCookieExist() {
    return document.cookie.includes(`id_token=`);
}

function signOut() {
    document.cookie = `id_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    isSignedIn.value = false;
}

const signIn = async (response) => {
        let dataString = JSON.stringify(response.credential);
        document.cookie = `id_token=${dataString}; expires= Sun, 1 January 2030 12:00:00 UTC; path=/`

        isSignedIn.value = true;
}
</script>

<style>
.menu {
    display: flex;
    flex-direction: column;
}
</style>