import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import BlogPage from "./pages/BlogPage";
import Admin from "./pages/Admin";



function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/blog/:slug" element={<BlogPage />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;