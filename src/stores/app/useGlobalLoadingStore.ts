export const useGlobalLoading = defineStore("globalLoading", () => {
  const isGlobalLoading = ref(false);

  return { isGlobalLoading };
});
