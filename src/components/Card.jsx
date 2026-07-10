// Ek simple card wrapper — white background, rounded corners, soft shadow.
// Hover par thora upar uthta hai aur shadow gehri ho jati hai (smooth feel ke liye).
export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6
        transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
