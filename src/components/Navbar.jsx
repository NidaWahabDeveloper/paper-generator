export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold">AI Paper Generator</h1>
        <p className="text-xs text-gray-400">Frontend Demo — MERN Stack Mid-Term Project</p>
      </div>
      <div className="w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-bold
        transition-transform duration-200 hover:scale-110 cursor-pointer">
        T
      </div>
    </header>
  );
}
