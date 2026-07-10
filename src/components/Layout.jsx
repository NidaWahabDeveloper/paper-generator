import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

// Layout har page ke around Sidebar + Navbar dikhata hai.
// <Outlet /> ki jagah par actual page (Dashboard/GeneratePaper/etc) aati hai.
export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Navbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
