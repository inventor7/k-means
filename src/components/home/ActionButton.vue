<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener' : undefined"
    class="relative group min-w-[200px]"
    :class="[
      variant === 'primary' ? 'text-white' : 'text-white',
      loading ? 'pointer-events-none' : '',
    ]"
    @click="$emit('click')"
  >
    <!-- Glow effect -->
    <div
      class="absolute -inset-1 blur-lg opacity-30 group-hover:opacity-70 transition duration-300"
      :class="[variant === 'primary' ? 'bg-emerald-500' : 'bg-zinc-700']"
    />

    <!-- Content -->
    <div
      class="relative px-8 py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2"
      :class="[
        variant === 'primary'
          ? 'bg-emerald-500 hover:bg-emerald-600'
          : 'bg-zinc-800 hover:bg-zinc-700',
      ]"
    >
      <slot name="icon" />
      <slot />
      <slot name="icon-right" />
    </div>
  </component>
</template>

<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary";
  href?: string;
  external?: boolean;
  loading?: boolean;
}

defineProps<Props>();
defineEmits<{
  (e: "click"): void;
}>();
</script>
