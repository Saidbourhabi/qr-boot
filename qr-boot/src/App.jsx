import { Route, Routes } from "react-router-dom";
import { ToastProvider } from "./components/ToastProvider";
import Home from "./pages/home/home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <ToastProvider />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
