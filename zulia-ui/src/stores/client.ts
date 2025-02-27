// Client State
import { defineStore } from "pinia";

export class AppNotification {
  title = "";
  message = "";
  showAppNotification = false;
  color = "";
}

export const useClientState = defineStore("client", {
  state: () => ({
    appNotification: [
      {
        title: "",
        message: "",
        showAppNotification: false,
        color: "",
      },
    ],
  }),
  actions: {
    addAppNotification(appNotification: AppNotification) {
      this.appNotification.push(appNotification);
    },
  },
});
