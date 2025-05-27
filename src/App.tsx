import { QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "./components/ui/sonner"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "./lib/queryClient"
import { GlobalDialog } from "./components/common/GlobalDialog"
import AppRoutes from "./router/AppRoutes"

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