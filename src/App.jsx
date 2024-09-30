import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Recording from "./pages/Recording";
import Notes from "./pages/Notes";
import History from "./pages/History";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = window.innerWidth < 768;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={isMobile ? <Navigate to="/recording" replace /> : <Dashboard />} />
              <Route path="recording" element={<Recording />} />
              <Route path="notes" element={<Notes />} />
              <Route path="history" element={<History />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;