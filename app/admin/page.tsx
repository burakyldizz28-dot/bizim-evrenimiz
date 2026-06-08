"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("E-posta veya şifre hatalı.");
      setLoading(false);
    } else {
      router.push("/admin/panel");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f1117",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "360px",
          background: "#1a1d27",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          padding: "40px 32px",
        }}
      >
        <h1
          style={{
            color: "#F0EDE6",
            fontFamily: "system-ui, sans-serif",
            fontSize: "20px",
            fontWeight: 600,
            marginBottom: "8px",
          }}
        >
          Admin Girişi
        </h1>
        <p
          style={{
            color: "rgba(240,237,230,0.4)",
            fontFamily: "system-ui, sans-serif",
            fontSize: "13px",
            marginBottom: "32px",
          }}
        >
          Bizim Evrenimiz yönetim paneli
        </p>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "12px 16px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#F0EDE6",
              fontFamily: "system-ui, sans-serif",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "12px 16px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#F0EDE6",
              fontFamily: "system-ui, sans-serif",
              fontSize: "14px",
              outline: "none",
            }}
          />

          {error && (
            <p style={{ color: "#ff6b6b", fontSize: "13px", fontFamily: "system-ui" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              background: "#C9A96E",
              border: "none",
              borderRadius: "8px",
              color: "#060810",
              fontFamily: "system-ui, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </main>
  );
}