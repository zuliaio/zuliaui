<template>
  <v-toolbar height="40" color="zulia-blue">
    <template v-slot:prepend>
      <v-img
        height="80"
        width="100"
        src="@/assets/logo.png"
        style="cursor: pointer"
        @click="router.push('/')"
      />
    </template>
    <v-spacer />
    <v-btn @click="doLogout()">Logout</v-btn>
  </v-toolbar>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

function doLogout() {
  authStore.logout().then(() => {
    router.push("/login");
  });
}
</script>

<style scoped lang="sass"></style>
