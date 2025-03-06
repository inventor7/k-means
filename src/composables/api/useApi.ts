import { inject, computed, type Ref } from "vue";
import { type RawAxiosRequestConfig } from "axios";
import { useAxios, type UseAxiosOptions } from "@vueuse/integrations/useAxios";
import { createEventHook, whenever } from "@vueuse/core";
import { createApiInstance } from "@/services/api/createApiInstance";

export interface APIError {
  code: number;
  message: string;
  data: {
    name: string;
    debug: string;
    message: string;
    arguments: string[];
    exception_type: string;
    context: any;
  };
}

type ApiResult<T> = { result: T } | { error: APIError };

export interface ACKResponse {
  done: boolean;
}

export function useApi<T>(
  path: string = "",
  config: RawAxiosRequestConfig<any> = {},
  options: UseAxiosOptions & { initialData?: any } = {
    immediate: true,
    shallow: true,
    initialData: undefined,
  }
) {
  const instance = createApiInstance();
  const query = useAxios<ApiResult<T>>(path, config, instance, options);

  type EventCallback<V> = (value: V) => any;
  const onResultSuccess = createEventHook<EventCallback<T>>();
  const onResultError = createEventHook<EventCallback<APIError>>();
  const onErrorString = createEventHook<EventCallback<string>>();

  const result = computed<T>(() => {
    if (query.data.value && "result" in query.data.value)
      return query.data.value.result;

    return options.initialData;
  });

  const resultError = computed<APIError | undefined>(() => {
    if (query.data.value && "error" in query.data.value)
      return query.data.value.error;

    return undefined;
  });

  const errorString = computed<string | undefined>(() => {
    if (resultError.value !== undefined) return resultError.value.data.message;
    if (query.error.value !== undefined && query.error.value instanceof Error)
      return query.error.value.message;
    return undefined;
  });

  whenever(query.isFinished, () => {
    if (errorString.value !== undefined) {
      onErrorString.trigger((value: string) => errorString.value);
    }

    if (query.data.value !== undefined) {
      if ("result" in query.data.value)
        onResultSuccess.trigger((value: T) => {
          if (query.data.value && "result" in query.data.value) {
            return query.data.value.result;
          }
          return value;
        });

      if ("error" in query.data.value) {
        onResultError.trigger((error: APIError) => {
          if (query.data.value && "error" in query.data.value) {
            return query.data.value.error;
          }
          return error;
        });
      }
    }
  });

  return {
    ...query,
    result,
    resultError,
    errorString,
    onResultSuccess: onResultSuccess.on,
    onResultError: onResultError.on,
    onErrorString: onErrorString.on,
  };
}
