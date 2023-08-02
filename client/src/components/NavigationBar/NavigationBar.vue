<template>
    <div class="navbar">
        <ButtonTemplate :buttonName="'Logo'"></ButtonTemplate>
        <ButtonTemplate :buttonName="'About'"><AboutMenu></AboutMenu></ButtonTemplate>
        <div style="width:64px; height:64px;"></div>
        <ButtonTemplate :buttonName="'Account'"><AccountMenu></AccountMenu></ButtonTemplate>
        <ButtonTemplate :buttonName="'Settings'"><SettingsMenu></SettingsMenu></ButtonTemplate>
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