<template>
  <v-app>
    <app-header />
    <router-view />
    <app-footer />
    <template
      v-for="(localNotification, index) in localNotifications"
      :key="index"
    >
      <v-snackbar
        v-model="localNotification.showAppNotification"
        vertical
        :color="localNotification.color as string"
      >
        <div class="text-subtitle-1 pb-2">{{ localNotification.title }}</div>

        <p>{{ localNotification.message }}</p>

        <template v-slot:actions>
          <v-btn
            color="indigo"
            variant="text"
            @click="localNotification.showAppNotification = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script lang="ts" setup>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useClientState } from "@/stores/client";
import { onBeforeMount, ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth";

const localNotifications = ref();
const authStore = useAuthStore(); // just instantiating in app to make sure we have it
const clientState = useClientState();

onBeforeMount(() => {
  localNotifications.value = clientState.appNotification;
});

watch(
  () => clientState.appNotification,
  () => {
    localNotifications.value = clientState.appNotification;
  },
);
</script>
