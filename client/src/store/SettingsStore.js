import { defineStore } from "pinia";
import { toRaw } from "vue";
import settingsHelper from "../_helpers/settings.js";

export const useSettingsStore = defineStore("settingsStore", {
  state: () => {
    return {
      settings: settingsHelper.getDefaultSettings(),
    };
  },
  actions: {
    async updateSettings() {
      const savedSettings = await settingsHelper.getSettings();
      this.settings = savedSettings;
    },
    async saveSettings(newSettings) {
      this.settings = newSettings;
      settingsHelper.saveSettings(this.getSettings);
    },
  },
  getters: {
    getSettings: (state) => {
      return toRaw(state.settings);
    },
    getAppSettings: (state) => {
      return state.settings.appSettings;
    },
    getMusicSettings: (state) => {
      return state.settings.musicSettings;
    },
    getTimerSettings: (state) => {
      return state.settings.timerSettings;
    },
  },
});
