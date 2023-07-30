import { Navbar } from "./common/Navbar";
import { CollegeGrid } from "./pages/colleges/CollegeGrid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<div>HOME PAGE</div>} />
          <Route path="/colleges" element={<CollegeGrid />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
