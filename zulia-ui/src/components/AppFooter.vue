<template>
  <v-footer height="40" app>
    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2 social-link"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-icon
        :icon="item.icon"
        :size="item.icon === 'mdi-alpha-z-box' ? 18 : 16"
      />
    </a>
    <v-switch
      v-model="darkToggle"
      color="primary"
      label="Dark"
      class="mt-6 ml-4"
      @update:model-value="toggleTheme"
    />

    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px"
    >
      &copy; 2014-{{ new Date().getFullYear() }}
      <a
        class="d-none d-sm-inline-block"
        href="https://ascend-tech.us"
        rel="noopener noreferrer"
        target="_blank"
        >Ascendant Software Technology, LLC</a
      >
      —
      <a
        class="text-decoration-none on-surface"
        href="https://www.apache.org/licenses/LICENSE-2.0"
        rel="noopener noreferrer"
        target="_blank"
      >
        Apache 2.0 License
      </a>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
import { ref } from "vue";

const darkToggle = ref(true);

const items = [
  {
    title: "Zulia Documentation",
    icon: `mdi-alpha-z-box`,
    href: "https://github.com/zuliaio/zuliasearch/wiki",
  },
  {
    title: "Zulia GitHub",
    icon: `mdi-github`,
    href: "https://github.com/zuliaio/zuliasearch",
  },
  {
    title: "AST LinkedIn",
    icon: `mdi-linkedin`,
    href: "https://www.linkedin.com/company/ascendant-software-technology-llc/",
  },
];

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  darkToggle.value = theme.global.current.value.dark;
}
</script>

<style scoped lang="sass">
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>
