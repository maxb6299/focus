<template>
    <div class="navbar">
        <ButtonTemplate :buttonName="'Logo'" :isModalOn="false"></ButtonTemplate>
        <ButtonTemplate :buttonName="'About'" :isModalOn="modalData.about.isModalOn" @toggleModal="toggleModal"><AboutMenu></AboutMenu></ButtonTemplate>
        <div style="width:64px; height:64px;"></div>
        <ButtonTemplate :buttonName="'Account'" :isModalOn="modalData.account.isModalOn" @toggleModal="toggleModal"><AccountMenu></AccountMenu></ButtonTemplate>
        <ButtonTemplate :buttonName="'Settings'" :isModalOn="modalData.settings.isModalOn" @toggleModal="toggleModal"><SettingsMenu @savedSettings="toggleModal('Settings')"></SettingsMenu></ButtonTemplate>
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
    },

    data() {
      return {
        modalData: {
          about: { isModalOn: false },
          account: { isModalOn: false },
          settings: { isModalOn: false }
        }
      }
    },

    methods: {
      toggleModal(buttonName) {
        if (buttonName == "About") {
          this.modalData.about.isModalOn = !this.modalData.about.isModalOn;
          this.modalData.account.isModalOn = false;
          this.modalData.settings.isModalOn = false;
        } else if (buttonName == "Account") {
          this.modalData.account.isModalOn = !this.modalData.account.isModalOn;
          this.modalData.about.isModalOn = false;
          this.modalData.settings.isModalOn = false;
        } else if (buttonName == "Settings") {
          this.modalData.settings.isModalOn = !this.modalData.settings.isModalOn;
          this.modalData.about.isModalOn = false;
          this.modalData.account.isModalOn = false;
        }
      }
    }
}
</script>

<style>
  .navbar {
    display: flex;
    gap: 16px;
  }
</style>