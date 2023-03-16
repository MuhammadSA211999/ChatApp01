import { apiSlice } from "../api/apiSlice";
import { userLoggin, userRegister } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    localStorage.setItem('auth', JSON.stringify({
                        accessToken: result?.data?.accessToken,
                        user: result?.data?.user
                    })
                    )
                    dispatch(userRegister({ accessToken: result.data.accessToken, user: result?.data?.user }))
                }
                catch (error) {
                    console.log('error in register endpoints', error);

                }
            }

        }),

        loggin: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    localStorage.setItem('auth', JSON.stringify({
                        accessToken: result?.data?.accessToken,
                        user: result?.data?.user
                    })
                    )
                    dispatch(userRegister({ accessToken: result.data.accessToken, user: result?.data?.user }))
                }
                catch (error) {
                    console.log('error in register endpoints', error);

                }
            }

        })
    })
})
export const { useRegisterMutation, useLogginMutation } = authApi