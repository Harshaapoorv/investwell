import type {BaseQueryFn} from '@reduxjs/toolkit/query';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  },
);

export const customBaseQuery =
  (
    {baseUrl}: {baseUrl: string} = {baseUrl: ''},
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      body?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({url, method, body, params, headers}) => {
    try {
      const result = await axiosApiInstance({
        url: baseUrl + url,
        method,
        data: body,
        params,
        headers,
      });
      return {data: result.data};
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data,
        },
      };
    }
  };
