import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SkyMapPage from "./pages/SkyMapPage";
import NotFound from "./pages/NotFound";
import AstronautTrainingPage from "./pages/AstronautTrainingPage";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Games from "./pages/Games";
import WeightConverter from "./pages/WeightConverter";
import ZodiacSign from "./pages/ZodiacSign";
import AstronomicalEvents from "./pages/AstronomicalEvents";
import ISSTrackerPage from "./pages/ISSTrackerPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sky-map" element={<SkyMapPage />} />
      <Route path="/astronaut-training" element={<AstronautTrainingPage />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:id" element={<ArticleDetail />} />
      <Route path="/games" element={<Games />} />
      <Route path="/weight-converter" element={<WeightConverter />} />
      <Route path="/zodiac-sign" element={<ZodiacSign />} />
      <Route path="/astronomical-events" element={<AstronomicalEvents />} />
      <Route path="/iss-tracker" element={<ISSTrackerPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 