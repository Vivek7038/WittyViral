import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Meme from "./pages/meme.jsx";
import Navbar from "./components/Navbar.jsx";
import CreateMeme from "./pages/CreateMeme.jsx"
function App() {
  return (
    <>
      <div className="">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Meme />} />
            <Route path="/meme/:id" element={<CreateMeme />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
