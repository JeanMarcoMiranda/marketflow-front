import "./index.css";
import { StrictMode } from "react";
import { Router } from "./app/router/router";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";
import { RouterProvider } from "react-router-dom";
import { GlobalDialog } from "./shared/components/GlobalDialog";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from "./app/api/queryClient";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
      <Toaster />
      <GlobalDialog />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
