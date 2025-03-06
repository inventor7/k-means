import { ref, onMounted, computed } from "vue";

export function useMouseCursor() {
  // State
  const mouseX = ref(0);
  const mouseY = ref(0);
  const cursorOpacity = ref(1);
  const container = ref<HTMLElement | null>(null);

  // Event handlers
  const handleMouseEnter = () => (cursorOpacity.value = 0);
  const handleMouseLeave = () => (cursorOpacity.value = 1);

  const handleMouseMove = (event: MouseEvent) => {
    if (!container.value) return;
    mouseX.value = event.clientX - 24;
    mouseY.value = event.clientY - 24;
  };

  // Computed
  const glowStyles = computed(() => ({
    background: `
      radial-gradient(
        circle at center,
        rgba(16, 185, 129, 0.4) 0%,
        rgba(16, 185, 129, 0.2) 40%,
        rgba(16, 185, 129, 0.1) 60%,
        rgba(16, 185, 129, 0) 100%
      )
    `,
    transform: "scale(1.5)",
    opacity: 0.8,
  }));

  // Lifecycle
  onMounted(() => {
    if (!container.value) return;

    // Initialize cursor position
    const rect = container.value.getBoundingClientRect();
    mouseX.value = rect.width / 4;
    mouseY.value = rect.height / 4;

    // Setup interactive elements hover effect
    const interactiveElements = document.querySelectorAll(
      'button, a, [role="button"]'
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });
  });

  return {
    mouseX,
    mouseY,
    cursorOpacity,
    container,
    handleMouseMove,
    glowStyles,
  };
}
