<template>
  <ConfigProvider :locale="currentLanguage" :dir="direction">
    <div :dir="direction">
      <RouterView />
    </div>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from "reka-ui";
import { useLanguageStore } from "@/stores/useLanguageStore";

const languageStore = useLanguageStore();
const { direction, currentLanguage } = storeToRefs(languageStore);

onMounted(() => {
  languageStore.initializeLanguage();
});
</script>
