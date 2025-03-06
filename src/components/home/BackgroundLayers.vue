<template>
  <div class="absolute inset-0 -z-20 pointer-events-none">
    <div class="absolute inset-0 opacity-20">
      <img
        src="/src/assets/globe.jpg"
        alt="Globe"
        class="w-full h-full object-cover dark:mix-blend-lighten hue-rotate-[220deg] saturate-[1.2] select-none"
      />
    </div>
    <div
      class="absolute inset-0 opacity-30 select-none"
      style="
        background-image: url('/grid-bg.png');
        background-size: cover;
        background-position: center;
      "
    />
  </div>
</template>

<script setup lang="ts">
// Static component for background layers
</script>
