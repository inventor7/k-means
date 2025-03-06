import axios from "axios";
import { useGlobalLoading } from "@/stores/app/useGlobalLoadingStore";
import { useToast } from "@/components/ui/toast";
import { storeToRefs } from "pinia";

export function createApiInstance() {
  const globalLoadingStore = useGlobalLoading();
  const { isGlobalLoading } = storeToRefs(globalLoadingStore);
  const { toast } = useToast();

  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      isGlobalLoading.value = true;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      isGlobalLoading.value = false;
      if (response.data.error) {
        toast({
          title: "Error",
          variant: "destructive",
          description: response.data.error,
        });
      }
      return response;
    },
    (error) => {
      isGlobalLoading.value = false;
      return Promise.reject(error);
    }
  );

  return instance;
}
