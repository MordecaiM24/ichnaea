import { Navbar } from "./common/Navbar";
import { CollegeGrid } from "./pages/colleges/CollegeGrid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/profile/auth/Profile";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colleges" element={<CollegeGrid />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
