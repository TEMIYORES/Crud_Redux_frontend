import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  //   if accessToken has expired
  if (result?.error?.status === 403) {
    console.log("sending refresh token");
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      // store new accessToken
      api.dispatch(setCredentials({ ...refreshResult.data }));
      //   Retry original query with new accessToken
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithRefreshAuth,
  endpoints: () => ({}),
});
