import "./index.css";
import { StrictMode } from "react";
import { Router } from "./router/router";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={Router} />
      <Toaster />
    </AuthProvider>
  </StrictMode>
);
