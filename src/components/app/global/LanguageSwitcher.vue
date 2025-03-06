<script setup lang="ts">
import { useTextDirection } from "@vueuse/core";
import { useLanguageStore } from "@/stores/useLanguageStore";
import type { LanguageCode } from "@/plugins/i18n";

const languageStore = useLanguageStore();
const textDirection = useTextDirection();

const switchLanguage = async (locale: LanguageCode) => {
  textDirection.value = languageStore.languages[locale].dir;
  await languageStore.setLanguage(locale);
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button size="icon" variant="ghost">
        <i-lucide-languages font-size="80" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem
        v-for="(lang, code) in languageStore.languages"
        :key="code"
        @click="switchLanguage(code as LanguageCode)"
        class="cursor-pointer"
      >
        <span class="text-lg mr-2">{{ lang.flag }}</span>
        <span>{{ lang.name }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
