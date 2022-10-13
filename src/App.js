import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hastalar from "./pages/Hastalar";
import Randevular from "./pages/Randevular";
import HastaEkle from "./pages/HastaEkle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hastalar" element={<Hastalar />} />
        <Route path="/randevular" element={<Randevular />} />
        <Route path="/hasta-ekle" element={<HastaEkle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
