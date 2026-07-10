"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, Mail, User, ShieldCheck } from "lucide-react";
import { loginUser, registerUser } from "@/data/api";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isLogin) {
        // Login Flow
        const res = await loginUser({ email: formData.email, password: formData.password });
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.message || "Failed to sign in. Please check credentials.");
        }
        
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        setSuccess("Signed in successfully!");
        setTimeout(() => {
          router.push("/shop");
        }, 1000);
      } else {
        // Registration Flow
        const res = await registerUser(formData);
        const data = await res.json();

        if (!res.ok) {
          if (data.errors) {
            const errors = Object.values(data.errors).flat().join(" ");
            throw new Error(errors);
          }
          throw new Error(data.message || "Registration failed.");
        }

        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setSuccess("Account created successfully!");
        setTimeout(() => {
          router.push("/shop");
        }, 1000);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-parchment-base min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-6 bg-parchment-light border-[1.5px] border-gold-antique p-8 relative shadow-xl">
        <div className="absolute inset-1.5 border border-gold-antique/30 pointer-events-none" />
        
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-gold-dark hover:text-maroon-royal transition-colors mb-6 font-sans text-xs uppercase tracking-wider font-semibold relative z-20">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-maroon-royal uppercase tracking-wider mb-2">
            {isLogin ? "Sign In" : "Register"}
          </h1>
          <p className="font-sans text-xs text-text-muted uppercase tracking-widest">
            {isLogin ? "Welcome back to Palace Boutique" : "Join the Kashmir Heritage Circle"}
          </p>
        </div>

        {error && (
          <div className="bg-maroon-royal/5 border border-maroon-royal/30 text-maroon-royal p-3.5 text-xs font-sans mb-6 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-forest-green/5 border border-forest-green/30 text-forest-green p-3.5 text-xs font-sans mb-6 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 font-sans relative z-20">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gold-dark">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gold-antique/50 pl-10 pr-4 py-3 outline-none focus:border-maroon-royal transition-colors text-sm"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gold-dark">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white border border-gold-antique/50 pl-10 pr-4 py-3 outline-none focus:border-maroon-royal transition-colors text-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gold-dark">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-white border border-gold-antique/50 pl-10 pr-4 py-3 outline-none focus:border-maroon-royal transition-colors text-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-maroon-royal text-text-white font-sans text-xs font-semibold uppercase tracking-[0.15em] border-[1.5px] border-gold-antique hover:bg-maroon-dark hover:border-gold-light hover:text-gold-light transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            {loading ? "PROCESSING..." : isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-gold-antique/20 font-sans text-xs">
          <p className="text-text-muted">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-gold-dark hover:text-maroon-royal font-bold underline uppercase ml-1 transition-colors"
            >
              {isLogin ? "Register Now" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
