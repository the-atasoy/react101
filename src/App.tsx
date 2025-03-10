import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AlertProvider, useAlert } from "./contexts/AlertContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Platforms from "./pages/Platforms";
import About from "./pages/About";
import Commands from "./pages/Commands";
import "./App.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./theme";

function AppContent() {
  const alert = useAlert();

  useEffect(() => {
    window.alertDispatch = (severity, message, options) => {
      switch (severity) {
        case "success":
          alert.success(message, options);
          break;
        case "info":
          alert.info(message, options);
          break;
        case "warning":
          alert.warning(message, options);
          break;
        case "error":
          alert.error(message, options);
          break;
      }
    };

    return () => {
      delete window.alertDispatch;
    };
  }, [alert]);

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/platforms" element={<Platforms />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/platforms/:platformId/commands"
              element={<Commands />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AlertProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </AlertProvider>
  );
}

export default App;
