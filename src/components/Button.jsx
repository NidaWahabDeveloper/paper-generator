// Ek reusable button — variant="primary" (filled) ya "secondary" (outline)
// Animation: hover par thora upar uthta hai aur shadow deep hoti hai,
// click par thora chota (scale down) hota hai — isse button "zinda" lagta hai.
export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base =
    "w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold " +
    "transition-all duration-200 ease-out " +
    "hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] " +
    "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none";
  const styles = {
    primary: "bg-primary text-white hover:bg-primaryDark",
    secondary: "border border-primary text-primary hover:bg-primary/5",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
