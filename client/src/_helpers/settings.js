import cookieHelper from "./cookie.js";

export default {
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

    const URL = `http://localhost:3000/users/settings/`;
    try {
      const response = await fetch(URL, {
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
      console.error(error);
      return null;
    }
  },
  async saveCloudSettings(data) {
    const token = cookieHelper.readCookie("id_token");

    const URL = "http://localhost:3000/users/settings/";
    const BODY = JSON.stringify({ settings: data });
    try {
      const response = await fetch(URL, {
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
      console.error(error);
      return null;
    }
  },
};
