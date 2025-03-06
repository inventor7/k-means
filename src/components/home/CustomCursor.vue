<template>
  <div
    class="fixed w-12 h-12 pointer-events-none z-50"
    :style="{
      transform: `translate(${x}px, ${y}px)`,
      transition: 'all 0.1s ease-out',
      opacity,
    }"
  >
    <div
      class="absolute -inset-4 bg-emerald-500/30 blur-xl rounded-full transition-opacity"
      :style="glowStyles"
    />
    <img
      src="/src/assets/me.webp"
      alt="Cursor"
      class="relative w-full h-full rounded-full object-cover shadow-lg z-10 transition-opacity"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  x: number;
  y: number;
  opacity: number;
  glowStyles: {
    background: string;
    transform: string;
    opacity: number;
  };
}

defineProps<Props>();
</script>
