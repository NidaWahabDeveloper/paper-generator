import { NavLink } from "react-router-dom";

// Sidebar mein links hain, active link ko highlight karte hain
const links = [
  { to: "/", label: "🏠 Dashboard" },
  { to: "/generate", label: "📝 Generate Paper" },
  { to: "/history", label: "📜 History" },
  { to: "/settings", label: "⚙️ Settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen p-4 hidden md:block">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center font-bold
          transition-transform duration-300 hover:rotate-6 hover:scale-105">
          P
        </div>
        <div>
          <p className="font-semibold text-sm leading-tight">Paper Generator</p>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulseSoft"></span>
            AI Exam Papers
          </p>
        </div>
      </div>

      <nav className="space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-600 hover:bg-bgsoft hover:translate-x-1"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
