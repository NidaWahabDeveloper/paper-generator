import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import GeneratePaper from "./pages/GeneratePaper";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Ye saare pages Sidebar + Navbar wale Layout ke andar aate hain */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/generate" element={<GeneratePaper />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
