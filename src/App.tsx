import { QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "./components/ui/sonner"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "./lib/query-client"
import { GlobalDialog } from "./components/common/global-dialog"
import AppRoutes from "./router/app-routes"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <Toaster />
      <GlobalDialog />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App