import {createApi} from '@reduxjs/toolkit/query/react';
import {customBaseQuery} from './customBaseQuery';
import {Platform} from 'react-native';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery({
    baseUrl:
      Platform.OS === 'android'
        ? 'http://10.0.2.2:8000/'
        : 'http://127.0.0.1:8000/',
  }),
  tagTypes: ['Investments'],
  keepUnusedDataFor: 60,
  endpoints: () => ({}),
});
