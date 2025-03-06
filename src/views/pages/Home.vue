<template>
  <div
    class="h-screen text-white relative overflow-hidden"
    @mousemove="handleMouseMove"
    ref="container"
  >
    <BackgroundLayers />

    <CustomCursor
      :x="mouseX"
      :y="mouseY"
      :opacity="cursorOpacity"
      :glow-styles="glowStyles"
    />

    <TheHeader />

    <main
      class="max-w-4xl mx-auto text-center fixed inset-0 flex flex-col items-center justify-center p-4 z-10"
    >
      <Badge class="mb-6"> Version 1.0 🎉 </Badge>
      <h1 class="text-4xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-8">
        <span
          class="bg-gradient-to-r from-zinc-50 to-zinc-400 text-transparent bg-clip-text"
        >
          The Modern Vue.js
          <br class="hidden sm:block" />
          Starter Template
        </span>
      </h1>

      <p class="text-base md:text-xl text-zinc-400 mb-8 md:mb-12 max-w-2xl">
        A feature-rich template powered by
        <span class="text-emerald-500 font-medium">Vue 3</span>,
        <span class="text-emerald-500 font-medium">TypeScript</span>, and
        <span class="text-emerald-500 font-medium">TailwindCSS</span>.
        <br class="hidden sm:block" />
        Start your next project with all the batteries included!
      </p>

      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
      >
        <ActionButton variant="primary" :loading="copied" @click="copy(source)">
          <template #icon>
            <i-carbon-copy v-if="!copied" />
            <i-carbon-checkmark v-else />
          </template>
          {{ copied ? "Copied!" : "Clone Repository" }}
        </ActionButton>

        <ActionButton
          variant="secondary"
          href="https://github.com/inventor7/vueta"
          external
        >
          <template #icon-right>
            <i-carbon-arrow-right
              class="transform group-hover:translate-x-1 transition-transform"
            />
          </template>
          View on GitHub
        </ActionButton>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useMouseCursor } from "@/composables/useMouseCursor";
import { BackgroundLayers, TheHeader, ActionButton } from "@/components/home";
import { useLanguageStore } from "../../stores/useLanguageStore";

const {
  mouseX,
  mouseY,
  cursorOpacity,
  container,
  handleMouseMove,
  glowStyles,
} = useMouseCursor();

const source = ref("https://github.com/inventor7/vueta.git");
const { copy, copied } = useClipboard({ source });
const { direction } = useLanguageStore();
</script>

<style>
::-webkit-scrollbar {
  @apply w-2;
}

::-webkit-scrollbar-track {
  @apply bg-zinc-900/50;
}

::-webkit-scrollbar-thumb {
  @apply bg-zinc-700/50 rounded;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-zinc-600/50;
}
</style>
