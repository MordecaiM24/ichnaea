import { Navbar } from "./common/Navbar";
import { CollegeGrid } from "./pages/colleges/CollegeGrid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/profile/auth/Profile";
import { useCookies } from "react-cookie";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<div>HOME PAGE</div>} />
          <Route path="/colleges" element={<CollegeGrid />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
