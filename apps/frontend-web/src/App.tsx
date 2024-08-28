import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "./components/ui/tooltip";
import { Home } from "./modules/Home";
import "./styles/global.css";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Home />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
