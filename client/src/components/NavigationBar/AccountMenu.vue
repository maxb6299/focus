<template>
    <div class="menu">
        <GoogleLogin v-show="!isSignedIn" :callback="signIn" />
        <button v-show="isSignedIn" @click="signOut">Sign out</button>
    </div>
</template>

<script>
import cookieHelper from '@/_helpers/cookie.js'
import { useSettingsStore } from "@/store/SettingsStore.js";

export default {
        
    data() {
        return {
            isSignedIn: false,
        }
    },
    methods: {
        signOut() {
            cookieHelper.deleteCookie('id_token');

            this.isSignedIn = false;

            this.settingsStore.updateSettings();
        }, 
        async signIn(response) {
            let dataString = JSON.stringify(response.credential);
            document.cookie = `id_token=${dataString}; expires= Sun, 1 January 2030 12:00:00 UTC; path=/`

            cookieHelper.deleteCookie('settings');
            this.isSignedIn = true;

            this.settingsStore.updateSettings();
        }
    },

    setup() {
        const settingsStore = useSettingsStore();
        return { settingsStore }
    },

    async created() {
        this.isSignedIn = (cookieHelper.readCookie('id_token') != null)
    }
}
</script>

<style>
.menu {
    display: flex;
    flex-direction: column;
}
</style>