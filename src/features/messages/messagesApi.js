import { apiSlice } from "../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (id) => `messages?conversationsId=${id}&_sort=timestamp&_order=desc&_page=10&_limit=1`
        })
    })
})

export const { useGetMessagesQuery } = messagesApi