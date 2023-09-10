import { Navbar } from "./common/Navbar";
import { CollegeGrid } from "./pages/colleges/CollegeGrid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/profile/auth/Profile";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { HashRouter } from "react-router-dom";
import TextEditor from "./pages/profile/EssayEdtior/TextEditor";
import { CreateCollege } from "./pages/colleges/CreateCollege";

function App() {
  return (
    <>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colleges" element={<CollegeGrid />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<TextEditor />} />
          <Route path="/createcollege" element={<CreateCollege />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
