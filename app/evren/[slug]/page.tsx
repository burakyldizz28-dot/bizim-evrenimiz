"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import StarfieldBackground from "@/components/ui/StarfieldBackground";
import { demoConstellations } from "@/data/demo";

export default function ConstellationDetail() {
  const router = useRouter();
  const params = useParams();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem("universe_access");
    if (!access) {
      router.replace("/");
      return;
    }
    setLoaded(true);
  }, [router]);

  const slug = params?.slug as string;
  const constellation = demoConstellations.find((c) => c.slug === slug);

  if (!loaded) return null;

  if (!constellation) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#060810", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <StarfieldBackground />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <p style={{ color: "#C9A96E", fontFamily: "Georgia, serif", fontSize: "14px" }}>Bu yıldız bulunamadı.</p>
          <button onClick={() => router.push("/evren")} style={{ marginTop: "24px", color: "#F0EDE6", fontFamily: "Georgia, serif", fontSize: "13px", background: "none", border: "none", cursor: "pointer", opacity: 0.6 }}>
            ← Yıldız Haritasına Dön
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#060810", position: "relative" }}>
      <StarfieldBackground />

      <div style={{ position: "relative", zIndex: 1, padding: "48px 24px 80px", maxWidth: "680px", margin: "0 auto" }}>

        {/* Geri butonu */}
        <button
          onClick={() => router.push("/evren")}
          style={{ background: "none", border: "none", color: "#C9A96E", fontFamily: "Georgia, serif", fontSize: "12px", letterSpacing: "2px", cursor: "pointer", opacity: 0.6, marginBottom: "48px", padding: 0, transition: "opacity 0.3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
        >
          ← Yıldız Haritası
        </button>

        {/* İkon */}
        <div style={{ fontSize: "32px", color: "#C9A96E", marginBottom: "24px", opacity: 0.8 }}>
          {constellation.icon}
        </div>

        {/* Başlık */}
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(28px, 6vw, 44px)", fontWeight: 300, color: "#F0EDE6", marginBottom: "12px", letterSpacing: "1px", lineHeight: 1.3 }}>
          {constellation.title}
        </h1>

        {/* Kısa metin */}
        <p style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "#C9A96E", fontStyle: "italic", marginBottom: "48px", opacity: 0.8 }}>
          {constellation.shortText}
        </p>

        {/* Ayırıcı */}
        <div style={{ width: "40px", height: "1px", background: "rgba(201, 169, 110, 0.3)", marginBottom: "48px" }} />

        {/* Fotoğraf placeholder */}
        <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: "8px", marginBottom: "48px", background: "rgba(11, 17, 32, 0.8)", border: "1px solid rgba(201, 169, 110, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "#F0EDE6", fontFamily: "Georgia, serif", fontSize: "12px", opacity: 0.2, letterSpacing: "2px" }}>
            FOTOĞRAF ALANI
          </p>
        </div>

        {/* Uzun metin */}
        <div>
          {constellation.longText.split("\n\n").map((paragraph, i) => (
            <p key={i} style={{ fontFamily: "Georgia, serif", fontSize: "clamp(15px, 2.5vw, 17px)", color: "#E8D9B5", lineHeight: 1.9, marginBottom: "24px", opacity: 0.85 }}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Alt sembol */}
        <div style={{ textAlign: "center", marginTop: "64px", color: "#C9A96E", opacity: 0.3, fontSize: "16px", letterSpacing: "8px" }}>
          ✦ ✦ ✦
        </div>

      </div>
    </main>
  );
}