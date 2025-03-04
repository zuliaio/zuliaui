<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">
      <div class="text-center">
        <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
        <h1 class="text-h2 font-weight-bold">Zulia UI!</h1>
        <v-divider class="ma-10" />
        <div class="pa-2">You have successfully logged into your project!</div>
        <v-btn color="primary" class="mb-2" @click="callForbidden()"
          >Call Forbidden</v-btn
        >
        <v-btn color="primary" class="mb-2 ml-2" @click="callHomeAdmin()"
          >Call Admin Role</v-btn
        >
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

function callForbidden() {
  useAppStore()
    .callForbidden()
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
