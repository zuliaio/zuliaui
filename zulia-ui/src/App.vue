<template>
  <v-app>
    <app-header />
    <router-view />
    <app-footer />
  </v-app>
</template>

<script lang="ts" setup>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>
