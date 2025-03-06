<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <Brain class="h-8 w-8 text-blue-500" />
            <h1 class="text-2xl font-bold text-gray-900">
              K-means Clustering Visualization
            </h1>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <RouterView />
    </main>

    <footer class="bg-white border-t mt-12">
      <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <p class="text-center text-gray-500 text-sm">
          Interactive K-means Clustering Visualization - Built with Vue and
          Canvas
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Brain } from "lucide-vue-next";
import LanguageSwitcher from "@/components/app/global/LanguageSwitcher.vue";
</script>
