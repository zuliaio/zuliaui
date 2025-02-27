<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">
      <div class="text-center">
        <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
        <h1 class="text-h2 font-weight-bold">Zulia UI!</h1>
        <v-divider class="ma-10" />
        <div class="pa-2">
          <v-text-field v-model="username" label="Username" variant="solo" />
          <v-text-field
            v-model="password"
            label="Password"
            variant="solo"
            @keyup.enter="login()"
          />
        </div>
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

/** emits **/
const emit = defineEmits<{
  (e: ""): void;
}>();

/** props **/
const props = defineProps();

/** refs **/
const username = ref();
const password = ref();

/** computed values **/

/** stores and constants **/
const router = useRouter();

/** hooks **/

/** methods **/
function login(): void {
  useAuthStore()
    .login({ username: username.value, password: password.value })
    .then(() => router.push({ name: "Home" }));
}

/** watchers **/
</script>

<style lang="scss" scoped></style>
