import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Meme from "./pages/meme.jsx";
import Navbar from "./components/Navbar.jsx";
function App() {
  return (
    <>
      <div className="">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Meme />} />
            {/* <Route path="/id" element={<Meme />} /> */}
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
