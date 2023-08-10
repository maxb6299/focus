<template>
  <div class="navbar-wrapper" @mouseenter="showNavbar = true" @mouseleave="showNavbar = false">
    <div class="navbar" v-if="showNavbar || settingsStore.getAppSettings.showNavbar || isModalOpen">
      <ButtonTemplate :buttonName="'Logo'" :isModalOn="false"></ButtonTemplate>
      <ButtonTemplate :buttonName="'About'" :isModalOn="modalData.about.isModalOn" @buttonClicked="toggleModal"><AboutMenu></AboutMenu></ButtonTemplate>
      <ButtonTemplate :buttonName="'Account'" :isModalOn="modalData.account.isModalOn" @buttonClicked="toggleModal"><AccountMenu></AccountMenu></ButtonTemplate>
      <ButtonTemplate :buttonName="'Settings'" :isModalOn="modalData.settings.isModalOn" @buttonClicked="toggleModal"><SettingsMenu @savedSettings="toggleModal('Settings')"></SettingsMenu></ButtonTemplate>
    </div>
  </div>
</template>

<script>
import AboutMenu from '@/components/NavigationBar/AboutMenu.vue'
import AccountMenu from '@/components/NavigationBar/AccountMenu.vue'
import SettingsMenu from '@/components/NavigationBar/SettingsMenu.vue'
import ButtonTemplate from '@/components/ButtonTemplate.vue'

import { useSettingsStore } from "@/store/SettingsStore.js";

export default {
    components: {
        ButtonTemplate,
        AboutMenu,
        AccountMenu,
        SettingsMenu
    },

    setup() {
      const settingsStore = useSettingsStore();
      return { settingsStore }
    },

    data() {
      return {
        showNavbar: false,
        isModalOpen: false,

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

        this.checkIfModalOpen();
      },

      checkIfModalOpen() {
        this.isModalOpen =  this.modalData.about.isModalOn || this.modalData.account.isModalOn || this.modalData.settings.isModalOn;
      }
    }
}
</script>