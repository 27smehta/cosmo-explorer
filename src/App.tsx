import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Games from "./pages/Games";
import WeightConverter from "./pages/WeightConverter";
import ZodiacSign from "./pages/ZodiacSign";
import AstronomicalEvents from "./pages/AstronomicalEvents";
import ISSTrackerPage from "./pages/ISSTrackerPage";
import SkyMapPage from "./pages/SkyMapPage";
import SpaceTrivia from "./games/SpaceTrivia";
import PlanetMatcher from "./games/PlanetMatcher";
import ReflexTest from "./games/ReflexTest";
import VerificationSuccess from "./pages/verification-success";
import UnsubscribeSuccess from "./pages/unsubscribe-success";
import CareerExplorer from "./pages/CareerExplorer";
import FilteredArticles from "./pages/FilteredArticles";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/games" element={<Games />} />
        <Route path="/weight-converter" element={<WeightConverter />} />
        <Route path="/zodiac-sign" element={<ZodiacSign />} />
        <Route path="/astronomical-events" element={<AstronomicalEvents />} />
        <Route path="/iss-tracker" element={<ISSTrackerPage />} />
        <Route path="/sky-map" element={<SkyMapPage />} />
        <Route path="/career-explorer" element={<CareerExplorer />} />
        <Route path="/games/space-trivia" element={<SpaceTrivia />} />
        <Route path="/games/planet-matcher" element={<PlanetMatcher />} />
        <Route path="/games/reflex-test" element={<ReflexTest />} />
        <Route path="/verification-success" element={<VerificationSuccess />} />
        <Route path="/unsubscribe-success" element={<UnsubscribeSuccess />} />
        <Route path="/filtered-articles" element={<FilteredArticles />} />
      </Routes>
    </Router>
  );
}

export default App;
