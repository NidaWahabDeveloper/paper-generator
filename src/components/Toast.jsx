// Chota "toast" notification — screen ke neeche-dayen corner mein
// slide ho kar aata hai aur kuch second baad khud gayab ho jata hai.
export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideIn">
      <div className="flex items-center gap-3 bg-primary text-white pl-4 pr-5 py-3 rounded-xl shadow-xl">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulseSoft"></span>
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}
