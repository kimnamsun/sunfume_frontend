import { API } from './api.config';

interface Params {
  model_name?: string;
  q?: {
    s?: string | string[];
    [key: string]: any;
  };
  [key: string]: any;
}

export const ApiService = <ModelType = any, ResponseType = any>(resourceName) => {
  const query =
    <T = ModelType>(params: Params) =>
    async () => {
      const { data } = await API.get<T>(`/${resourceName}`, { params });
      return data;
    };

  const infiniteQuery =
    <T = ModelType>(params: Params) =>
    async ({ pageParam = 1 }) => {
      const { data } = await API.get<T>(`/${resourceName}?cursor=${pageParam}`, { params });
      return data;
    };

  const get =
    <T = ModelType>(id, { params }: Params) =>
    async () => {
      const { data } = await API.get<T>(`/${resourceName}/${id}`, { params });
      return data;
    };

  const create =
    <T = ModelType>(params: Params) =>
    async (newObj?: any) => {
      const { data } = await API.post<T>(`/${resourceName}`, { ...newObj, ...params });
      return data;
    };

  const update =
    <T = ModelType>(id, params: Params) =>
    async (obj?: any) => {
      const { data } = await API.patch<T>(`/${resourceName}/${id}`, { ...obj, ...params });
      return data;
    };

  const destroy =
    <T = ResponseType>(id, { params }: Params) =>
    async () => {
      const { data } = await API.delete<T>(`/${resourceName}/${id}`, { params });
      return data;
    };

  return {
    query,
    infiniteQuery,
    get,
    create,
    update,
    destroy,
  };
};
