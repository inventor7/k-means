<template>
  <header class="fixed top-0 right-0 flex flex-row items-center gap-4 p-6 z-20">
    <div class="relative group">
      <LanguageSwitcher class="relative text-2xl p-4" />
      <div
        class="absolute -inset-2 bg-emerald-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
      />
    </div>
    <div class="relative group">
      <ThemeSwitcher class="relative text-2xl p-4" />
      <div
        class="absolute -inset-2 bg-emerald-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { LanguageSwitcher, ThemeSwitcher } from "@/components/app/global/index";
</script>
