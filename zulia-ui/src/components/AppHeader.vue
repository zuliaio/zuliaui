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
  </v-toolbar>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style scoped lang="sass"></style>
