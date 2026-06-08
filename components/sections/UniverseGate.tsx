"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Config {
  site_title?: string;
  welcome_text?: string;
  gate_password?: string;
  tagline?: string;
}

export default function UniverseGate({ config }: { config: Config | null }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  const siteTitle = config?.site_title || "Bizim Evrenimiz";
  const welcomeText = config?.welcome_text || "Bu evren herkese kapalı.";
  const gatePassword = config?.gate_password || "yildizlar2015";

  useEffect(() => {
    const entered = localStorage.getItem("universe_access");
    if (entered === "true") {
      router.replace("/evren");
    } else {
      setChecking(false);
    }
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === gatePassword) {
      localStorage.setItem("universe_access", "true");
      router.push("/evren");
    } else {
      setError(true);
      setShake(true);
      setPassword("");
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setError(false), 3000);
    }
  }

  if (checking) return null;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative", zIndex: 1 }}>
      <div style={{ fontSize: "28px", color: "#C9A96E", marginBottom: "32px", opacity: 0.8 }}>✦</div>

      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 300, color: "#F0EDE6", textAlign: "center", marginBottom: "12px", letterSpacing: "2px" }}>
        {siteTitle}
      </h1>

      <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(13px, 3vw, 16px)", color: "#E8D9B5", textAlign: "center", maxWidth: "320px", lineHeight: 1.7, opacity: 0.65, fontStyle: "italic", marginBottom: "48px" }}>
        {welcomeText}
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", width: "100%", maxWidth: "280px", animation: shake ? "shake 0.5s ease" : "none" }}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifreni gir..."
          autoComplete="off"
          style={{ width: "100%", padding: "14px 20px", background: "rgba(11, 17, 32, 0.7)", border: error ? "1px solid rgba(220, 100, 100, 0.5)" : "1px solid rgba(201, 169, 110, 0.25)", borderRadius: "4px", color: "#F0EDE6", fontFamily: "Georgia, serif", fontSize: "15px", textAlign: "center", letterSpacing: "3px", outline: "none", backdropFilter: "blur(8px)" }}
        />

        {error && (
          <p style={{ color: "rgba(220, 150, 150, 0.9)", fontFamily: "Georgia, serif", fontSize: "13px", fontStyle: "italic", textAlign: "center" }}>
            Bu evrenin kapısı farklı bir anahtarla açılır.
          </p>
        )}

        <button
          type="submit"
          style={{ width: "100%", padding: "14px", background: "rgba(201, 169, 110, 0.12)", border: "1px solid rgba(201, 169, 110, 0.35)", borderRadius: "4px", color: "#C9A96E", fontFamily: "Georgia, serif", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", cursor: "pointer" }}
        >
          Evrene Gir
        </button>
      </form>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}