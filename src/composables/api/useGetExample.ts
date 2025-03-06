import { useApi } from "./useApi";

interface exampleBody {
  id: number;
}

interface exampleRes {
  res: string;
}

export function useGraphicTrackingGetActorInfo() {
  const q = useApi<exampleRes>(
    `v1/exampleRoute`,
    { method: "GET" },
    { immediate: false, initialData: undefined }
  );

  const execute = async (data: exampleBody) => {
    return await q.execute({
      params: data,
    });
  };

  return {
    ...q,
    execute,
  };
}
