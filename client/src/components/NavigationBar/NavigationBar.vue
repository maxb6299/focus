<template>
    <div class="navbar">
        <Button :buttonName="'Logo'"></Button>
        <Button :buttonName="'About'"><AboutMenu></AboutMenu></Button>
        <div style="width:64px; height:64px;"></div>
        <Button :buttonName="'Account'"><AccountMenu></AccountMenu></Button>
        <Button :buttonName="'Settings'"><SettingsMenu></SettingsMenu></Button>
    </div>
</template>

<script>
import AboutMenu from '@/components/NavigationBar/AboutMenu.vue'
import AccountMenu from '@/components/NavigationBar/AccountMenu.vue'
import SettingsMenu from '@/components/NavigationBar/SettingsMenu.vue'
import ButtonTemplate from '@/components/ButtonTemplate.vue'

export default {
    components: {
        ButtonTemplate,
        AboutMenu,
        AccountMenu,
        SettingsMenu
    }
}
</script>

<style>
  .navbar {
    display: flex;
    gap: 16px;
  }
</style>