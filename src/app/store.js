import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import conversations from '../features/conversations/conversationsSlice';
import messages from '../features/messages/messagesSlice';
import auth from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    conversations: conversations,
    messages: messages,
    auth: auth
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});
