"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StarfieldBackground from "@/components/ui/StarfieldBackground";
import { demoLetter, demoConfig } from "@/data/demo";

export default function LetterPage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem("universe_access");
    if (!access) {
      router.replace("/");
      return;
    }
    setLoaded(true);
  }, [router]);

  if (!loaded) return null;

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#060810", position: "relative" }}>
      <StarfieldBackground />

      <div style={{ position: "relative", zIndex: 1, padding: "48px 24px 80px", maxWidth: "620px", margin: "0 auto" }}>

        {/* Geri butonu */}
        <button
          onClick={() => router.push("/evren")}
          style={{ background: "none", border: "none", color: "#C9A96E", fontFamily: "Georgia, serif", fontSize: "12px", letterSpacing: "2px", cursor: "pointer", opacity: 0.6, marginBottom: "48px", padding: 0, transition: "opacity 0.3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
        >
          ← Yıldız Haritası
        </button>

        {/* Üst sembol */}
        <div style={{ fontSize: "22px", color: "#C9A96E", marginBottom: "32px", opacity: 0.7 }}>
          ✉
        </div>

        {/* Başlık */}
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 300, color: "#F0EDE6", marginBottom: "8px", letterSpacing: "1px" }}>
          Sana Yazdığım Yıldız
        </h1>

        <p style={{ fontFamily: "Georgia, serif", fontSize: "14px", color: "#C9A96E", fontStyle: "italic", marginBottom: "48px", opacity: 0.7 }}>
          {demoConfig.partnerName} için
        </p>

        {/* Ayırıcı */}
        <div style={{ width: "40px", height: "1px", background: "rgba(201, 169, 110, 0.3)", marginBottom: "48px" }} />

        {/* Mektup içeriği */}
        <div>
          {demoLetter.content.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              style={{ fontFamily: "Georgia, serif", fontSize: "clamp(15px, 2.5vw, 18px)", color: "#E8D9B5", lineHeight: 2, marginBottom: "28px", opacity: 0.88, fontStyle: i === demoLetter.content.split("\n\n").length - 1 ? "italic" : "normal" }}
            >
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