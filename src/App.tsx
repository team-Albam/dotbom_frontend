import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { SettingsProvider } from "./contexts/SettingsContext";
import SettingsModal from "./components/SettingsModal";
import GlobalStylesWrapper from "./components/GlobalStyles";
import Home from "./pages/Home";
import Service from "./pages/Service";
import Viewer from "./pages/Viewer";
import Game from "./pages/Game";
import DifficultySelection from "./pages/DifficultySelection";
import Quiz from "./pages/Quiz";
import QuizResults from "./pages/QuizResults";
import QuizReview from "./pages/QuizReview";

function App() {
  return (
    <SettingsProvider>
      <GlobalStylesWrapper />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/viewer" element={<Viewer />} />
          <Route path="/game" element={<Game />} />
          <Route path="/difficulty" element={<DifficultySelection />} />
          <Route path="/quiz/:difficulty" element={<Quiz />} />
          <Route path="/results" element={<QuizResults />} />
          <Route path="/review" element={<QuizReview />} />
        </Routes>
        <SettingsModal />
      </Router>
    </SettingsProvider>
  );
}

export default App;
