import cookieHelper from "@/_helpers/cookie.js";

const URL = "https://focus-backend.vercel.app";

export default {
  async getSettings() {
    const SIGNED_IN = cookieHelper.readCookie("id_token");
    const HAS_COOKIE = cookieHelper.readCookie("settings");

    if (SIGNED_IN) {
      let settings = await this.getCloudSettings();
      if (settings) return settings;
      else return this.getDefaultSettings();
    } else if (HAS_COOKIE) return this.getCookieSettings();
    else return this.getDefaultSettings();
  },
  async saveSettings(data) {
    const SIGNED_IN = cookieHelper.readCookie("id_token");

    if (SIGNED_IN) await this.saveCloudSettings(data);
    else this.saveCookieSettings(data);
  },

  getCookieSettings() {
    const settingsCookie = cookieHelper.readCookie("settings");
    return settingsCookie;
  },
  saveCookieSettings(data) {
    let settingsString = JSON.stringify(data);
    document.cookie = `settings=${settingsString}; expires=Sun, 01 Jan 2030 12:00:00 UTC; path=/`;
  },

  async getCloudSettings() {
    const token = cookieHelper.readCookie("id_token");

    const URI = `${URL}/users/settings/`;
    try {
      const response = await fetch(URI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error getting cloud settings");
      }

      const cloudSettings = await response.json();
      return cloudSettings;
    } catch (error) {
      console.error("Error getting cloud settings" + error);
      return null;
    }
  },
  async saveCloudSettings(data) {
    const token = cookieHelper.readCookie("id_token");

    const URI = `${URL}/users/settings/`;
    const BODY = JSON.stringify({ settings: data });
    try {
      const response = await fetch(URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: BODY,
      });
      if (!response.ok) {
        throw new Error("Error updating cloud settings");
      }

      return response.ok;
    } catch (error) {
      console.error("Error saving cloud settings" + error);
      return null;
    }
  },

  getDefaultSettings() {
    const settings = {
      appSettings: {
        backgroundColor: "#FFFFFF",
        lightText: false,
        showDots: false,
        showMusic: true,
        showNavbar: true,
        showTimer: true,
      },
      musicSettings: {
        musicLink: "https://www.youtube.com/watch?v=Hlp6aawXVoY",
      },
      timerSettings: {
        workMinutes: 25,
        breakMinutes: 5,
        longBreakMinutes: 15,

        longBreakInterval: 3,

        alarmSound: "/assets/alarm.mp3",
      },
    };

    return settings;
  },
};
