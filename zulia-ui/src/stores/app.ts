// All App REST calls
import { defineStore } from "pinia";
import { Api as ZuliaApi } from "@/api/zulia-ui-rest-service_swagger";
import { useClientState } from "@/stores/client";

const zuliaAPI = new ZuliaApi();

export const useAppStore = defineStore("app", {
  state: () => ({}),
  actions: {
    async callHome(): Promise<void> {
      zuliaAPI.zuliauirest
        .homeTest()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          if (err.status === 403) {
            useClientState().addAppNotification({
              title: "Not allowed",
              message: "You are not allowed to access this section.",
              showAppNotification: true,
              color: "error",
            });
          } else {
            useClientState().addAppNotification({
              title: err.title,
              message: err.message,
              showAppNotification: true,
              color: "error",
            });
          }
        });
    },
    async callForbidden(): Promise<void> {
      zuliaAPI.zuliauirest
        .forbiddenTest()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          if (err.status === 403) {
            useClientState().addAppNotification({
              title: "Not allowed",
              message: "You are not allowed to access this section.",
              showAppNotification: true,
              color: "error",
            });
          } else {
            useClientState().addAppNotification({
              title: err.title,
              message: err.message,
              showAppNotification: true,
              color: "error",
            });
          }
        });
    },
    async callHomeAdmin(): Promise<void> {
      zuliaAPI.zuliauirest
        .homeTestAdmin()
        .then((res) => {
          useClientState().addAppNotification({
            title: "You are an admin!",
            message: "You can access this location",
            showAppNotification: true,
            color: "success",
          });
        })
        .catch((err) => {
          if (err.status === 403) {
            useClientState().addAppNotification({
              title: "Not allowed",
              message: "You are not allowed to access this section.",
              showAppNotification: true,
              color: "error",
            });
          } else {
            useClientState().addAppNotification({
              title: err.title,
              message: err.message,
              showAppNotification: true,
              color: "error",
            });
          }
        });
    },
  },
});
