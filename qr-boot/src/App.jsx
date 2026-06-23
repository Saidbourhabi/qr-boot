import { useEffect } from 'react'; // add this import
import { Route, Routes } from "react-router-dom";
import { ToastProvider } from "./components/ToastProvider";
import Home from "./pages/home/home";
import NotFound from "./pages/NotFound";
import { init } from '@plausible-analytics/tracker'; 

function App() {
  useEffect(() => {
    init({
      domain: 'qr-boot.vercel.app',
    });
  }, []); 
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