<template>
  <div class="h-full w-full">
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useLanguageStore } from "@/stores/useLanguageStore";
const languageStore = useLanguageStore();

onMounted(() => {
  languageStore.initializeLanguage();
});
</script>
