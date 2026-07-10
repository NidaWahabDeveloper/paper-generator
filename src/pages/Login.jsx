import { Link } from "react-router-dom";
import Button from "../components/Button";

// Ye sirf UI hai — abhi real login/authentication nahi hai
export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bgsoft">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
        <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold mb-4">
          P
        </div>
        <h2 className="text-lg font-semibold mb-1">Welcome back</h2>
        <p className="text-sm text-gray-400 mb-6">Log in to AI Paper Generator</p>

        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email</label>
        <input className="input mb-4" placeholder="teacher@school.com" />

        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Password</label>
        <input type="password" className="input mb-6" placeholder="••••••••" />

        <Link to="/">
          <Button type="button">Log In</Button>
        </Link>
      </div>
    </div>
  );
}
