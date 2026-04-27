import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Investors from "@/pages/investors";
import Pitch from "@/pages/pitch";
import Model from "@/pages/model";
import Traction from "@/pages/traction";
import PitchPDF from "@/pages/pitch-pdf";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/investors" component={Investors} />
      <Route path="/pitch" component={Pitch} />
      <Route path="/model" component={Model} />
      <Route path="/traction" component={Traction} />
      <Route path="/pitch-pdf" component={PitchPDF} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
