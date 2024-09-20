"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "../redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { ContextProvider } from "../context/context";

export default function Provider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  let persistor = persistStore(store);

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ContextProvider>
            <Toaster />
            {children}
          </ContextProvider>
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
