import {api} from './api';

export const investmentsApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    getInvestments: builder.query<any, any>({
      query: data => ({
        url: `investments/?pan_number=${data.panNumber}`,
      }),
      providesTags: (result, error, data) => [
        {type: 'Investments', id: data.panNumber},
      ],
    }),
    addInvestments: builder.mutation<any, any>({
      query: data => ({
        url: `/investments/add/`,
        method: 'POST',
        body: data.body,
      }),
      invalidatesTags: (result, error, data) => [
        {type: 'Investments', id: data.body.panNumber},
      ],
    }),
  }),
});

export const {useGetInvestmentsQuery, useAddInvestmentsMutation} =
  investmentsApi;
