import "./index.css";
import { StrictMode } from "react";
import { Router } from "./app/router/router";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./app/contexts/AuthContext";
import { GlobalDialog } from "./shared/components/GlobalDialog";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={Router} />
      <Toaster />
      <GlobalDialog/>
    </AuthProvider>
  </StrictMode>
);
