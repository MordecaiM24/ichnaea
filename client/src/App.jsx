import { Navbar } from "./common/Navbar";
import { CollegeGrid } from "./pages/colleges/CollegeGrid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/profile/auth/Profile";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { HashRouter } from "react-router-dom";
import TextEditor from "./pages/profile/EssayEditor/TextEditor";
import { CreateCollege } from "./pages/colleges/CreateCollege";
import { createClient } from "@supabase/supabase-js";
import { UserInfo } from "./pages/profile/UserInfo";
import UniversityGrid from "./pages/universities/UniversityGrid";
import { NextUIProvider } from "@nextui-org/react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  return (
    <>
      <NextUIProvider>
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/colleges" element={<CollegeGrid />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<TextEditor />} />
            <Route path="/createcollege" element={<CreateCollege />} />
            <Route path="/info" element={<UserInfo />} />
            <Route path="/universities" element={<UniversityGrid />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </HashRouter>
      </NextUIProvider>
    </>
  );
}

export default App;
