import { Navbar } from "./common/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/profile/auth/Profile";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { HashRouter } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { UserInfo } from "./pages/profile/UserInfo1";
import UniversityGrid from "./pages/universities/UniversityGrid";
import { Essays } from "./pages/profile/EssayEditor/Essays";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { inject } from "@vercel/analytics";

injectSpeedInsights();
inject();

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:college_id" element={<Essays />} />
        <Route path="/info" element={<UserInfo />} />
        <Route path="/universities" element={<UniversityGrid />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
