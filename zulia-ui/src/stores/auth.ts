// Authentication handling
import { defineStore } from "pinia";
import {
  Api as AuthApi,
  type UsernamePasswordCredentials,
} from "@/api/zulia-ui-rest-service_swagger";
import type { FetchInterceptorResponse } from "fetch-intercept";
import * as fetchIntercept from "fetch-intercept";
import { useRouter } from "vue-router";
import { useClientState } from "@/stores/client";

const authAPI = new AuthApi();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    router: useRouter(),
    unregisterInterceptor: fetchIntercept.register({
      request(url: string, config: unknown): Promise<unknown[]> | unknown[] {
        if (!url.endsWith("oauth/access_token")) {
          return useAuthStore()
            .refreshIfNeeded()
            .then(() => {
              config.headers["Authorization"] =
                "Bearer " + localStorage.getItem("token");
              return [url, config];
            });
        } else {
          // we've hit oauth/access_token, just return
          return [url, config];
        }
      },
      response(response: FetchInterceptorResponse): FetchInterceptorResponse {
        if (
          (response.status == 401 && !response.url.endsWith("login")) ||
          (response.status == 400 && response.url.endsWith("access_token"))
        ) {
        }
        if (response.url.includes("login")) {
          useAuthStore().clearLocalStorage();
        }
        const currentDate = new Date();
        localStorage.setItem("lastTime", currentDate.toISOString());
        return response;
      },
    }),
  }),
  actions: {
    async login(credentials: UsernamePasswordCredentials): Promise<void> {
      return new Promise((resolve, reject) => {
        authAPI.zuliauirest
          .login(credentials)
          .then((response) => response.data)
          .then((data) => {
            this.updateLocalStorageWithToken(data as Record<string, unknown>);
            resolve();
          })
          .catch((error) => reject(error));
      });
    },
    refreshIfNeeded(): Promise<void> {
      return new Promise((resolve, reject) => {
        const lastTime = localStorage.getItem("lastTime") as string;
        const expiresIn = localStorage.getItem("expiresIn") as string;
        if (!expiresIn) {
          // first login
          resolve();
        } else {
          const now = new Date();
          const lastTimeDate = new Date(lastTime);
          const expiresInDate = new Date(expiresIn);
          const diffMinutes = new Date(
            expiresInDate.getTime() - lastTimeDate.getTime(),
          ).getMinutes();

          if (now.getTime() > expiresInDate.getTime()) {
            // user has been idle and need to login again
            this.clearLocalStorage();
            useClientState().addAppNotification({
              title: "Session Expired",
              message: "Please login again.",
              showAppNotification: true,
              color: "error",
            });
            this.router.push({ name: "Login" }).then(() => resolve);
          } else {
            if (diffMinutes < 10 && diffMinutes > 0) {
              authAPI.zuliauirest
                .index2({
                  refresh_token: localStorage.getItem("refreshToken") as string,
                  grant_type: "refresh_token",
                })
                .then((response) => {
                  this.updateLocalStorageWithToken(
                    response.data as Record<string, unknown>,
                  );
                  resolve();
                })
                .catch((err) => console.log(err));
            } else {
              resolve();
            }
          }
        }
      });
    },
    updateLocalStorageWithToken(data: Record<string, unknown>): void {
      const currentDate = new Date();
      currentDate.setSeconds(
        currentDate.getSeconds() + (data.expires_in as number),
      );
      localStorage.setItem("refreshToken", data.refresh_token as string);
      localStorage.setItem("token", data.access_token as string);
      localStorage.setItem("expiresIn", currentDate.toISOString());
      if (Object.keys(data).includes("roles")) {
        let roles = data.roles as string[];
        localStorage.setItem("roles", roles.join(";"));
      }
    },
    clearLocalStorage(): void {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("token");
      localStorage.removeItem("expiresIn");
      localStorage.removeItem("roles");
    },
    getUserAccessToken() {
      return {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
    },
  },
});
