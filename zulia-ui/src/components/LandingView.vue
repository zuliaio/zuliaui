<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">
      <div class="text-center">
        <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
        <h1 class="text-h2 font-weight-bold">Zulia UI!</h1>
        <v-divider class="ma-10" />
        <div class="pa-2">You have successfully logged into your project!</div>
        <v-btn @click="callHome()">Call Forbidden</v-btn>
        <v-btn class="ml-2" @click="callHomeAdmin()">Call Admin Role</v-btn>
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";

function callHome() {
  useAppStore()
    .callHome()
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
}

function callHomeAdmin() {
  useAppStore()
    .callHomeAdmin()
    .then(() => {});
}
</script>
