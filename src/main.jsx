import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { DictionaryProvider } from "./contexts/DictionaryContext.jsx";
import Home from "./Routes/Home/Home.jsx";
import Recents from "./Routes/Recents/Recents.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DictionaryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route index element={<Home/>}/>
          <Route path="recent" element={<Recents/>}/>
        </Routes>
      </BrowserRouter>
    </DictionaryProvider>
  </StrictMode>
);
