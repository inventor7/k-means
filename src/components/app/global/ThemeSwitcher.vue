<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button size="icon" variant="ghost">
        <i-radix-icons-moon
          class="rotate-0 h-12 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <i-radix-icons-sun
          height="100px"
          class="absolute h-16 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="mode = 'light'"> Light </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'"> Dark </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'"> System </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { useColorMode } from "@vueuse/core";

const mode = useColorMode({ disableTransition: false });
</script>
