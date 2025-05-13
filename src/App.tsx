import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Games from "./pages/Games";
import AsteroidDefender from "./games/AsteroidDefender";
import SpaceTrivia from "./games/SpaceTrivia";
import PlanetMatcher from "./games/PlanetMatcher";
import WeightConverter from "./pages/WeightConverter";
import ZodiacSign from "./pages/ZodiacSign";
import AstronomicalEvents from "./pages/AstronomicalEvents";
import ISSTrackerPage from "./pages/ISSTrackerPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Analytics />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/asteroid-defender" element={<AsteroidDefender />} />
          <Route path="/games/space-trivia" element={<SpaceTrivia />} />
          <Route path="/games/planet-matcher" element={<PlanetMatcher />} />
          <Route path="/weight-converter" element={<WeightConverter />} />
          <Route path="/zodiac-sign" element={<ZodiacSign />} />
          <Route path="/astronomical-events" element={<AstronomicalEvents />} />
          <Route path="/iss-tracker" element={<ISSTrackerPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
