<template>
  <transition name="fade">
    <div
      v-if="isVisible"
      class="progress-bar bg-primary"
      :style="{ width: `${progress}%` }"
    />
  </transition>
</template>

<script setup lang="ts">
import { useGlobalLoading } from "@/stores/app/useGlobalLoadingStore";
import { ref, watch } from "vue";

const globalLoadingStore = useGlobalLoading();
const { isGlobalLoading } = storeToRefs(globalLoadingStore);

const progress = ref(0);
const isVisible = ref(false);
let progressInterval: number | undefined;

watch(isGlobalLoading, (newValue) => {
  if (newValue) {
    startProgress();
  } else {
    completeProgress();
  }
});

function startProgress() {
  isVisible.value = true;
  progress.value = 0;
  progressInterval = window.setInterval(() => {
    if (progress.value < 90) {
      const remaining = 100 - progress.value;
      const increment = remaining * (Math.random() * 0.1);
      progress.value = Math.min(progress.value + increment, 90);
    }
  }, 200);
}

function completeProgress() {
  clearInterval(progressInterval);
  progress.value = 100;
  setTimeout(() => {
    isVisible.value = false;
  }, 400);
}
</script>

<style scoped>
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: rgb(var(--v-theme-primary));
  transition: width 200ms ease-out;
  z-index: 9999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
