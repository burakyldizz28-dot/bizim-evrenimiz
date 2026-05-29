"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import StarfieldBackground from "@/components/ui/StarfieldBackground";
import { demoConstellations, demoConfig } from "@/data/demo";

export default function StarMap() {
  const router = useRouter();

  useEffect(() => {
    const access = localStorage.getItem("universe_access");
    if (!access) router.replace("/");
  }, [router]);

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#060810", position: "relative" }}>
      <StarfieldBackground />
      <div style={{ position: "relative", zIndex: 1, padding: "48px 24px 80px", maxWidth: "900px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ color: "#C9A96E", fontFamily: "Georgia, serif", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "16px", opacity: 0.8 }}>
            ✦ Yıldız Haritası ✦
          </p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 300, color: "#F0EDE6", letterSpacing: "2px" }}>
            {demoConfig.siteTitle}
          </h1>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "14px", color: "#E8D9B5", fontStyle: "italic", marginTop: "12px", opacity: 0.6 }}>
            {demoConfig.tagline}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>

          {demoConstellations.map((c) => (
            <div
              key={c.slug}
              onClick={() => {
              if (c.slug === "sana-yazdigim-yildiz") {
              router.push("/mektup");
              } else {
              router.push(`/evren/${c.slug}`);
              }
              }}
              style={{ background: "rgba(11, 17, 32, 0.65)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(201, 169, 110, 0.15)", borderRadius: "8px", padding: "32px 24px", cursor: "pointer", transition: "all 0.3s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.border = "1px solid rgba(201, 169, 110, 0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.border = "1px solid rgba(201, 169, 110, 0.15)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: "22px", color: "#C9A96E", marginBottom: "16px" }}>{c.icon}</div>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "18px", fontWeight: 400, color: "#F0EDE6", marginBottom: "10px" }}>{c.title}</h2>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "#E8D9B5", fontStyle: "italic", lineHeight: 1.6, opacity: 0.7 }}>{c.shortText}</p>
              <div style={{ marginTop: "24px", color: "#C9A96E", fontSize: "11px", opacity: 0.5 }}>✦</div>
            </div>
          ))}

          <div
            onClick={() => router.push("/sakli-yildizlar")}
            style={{ background: "rgba(11, 17, 32, 0.65)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(201, 169, 110, 0.15)", borderRadius: "8px", padding: "32px 24px", cursor: "pointer", transition: "all 0.3s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.border = "1px solid rgba(201, 169, 110, 0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.border = "1px solid rgba(201, 169, 110, 0.15)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ fontSize: "22px", color: "#C9A96E", marginBottom: "16px" }}>◎</div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "18px", fontWeight: 400, color: "#F0EDE6", marginBottom: "10px" }}>Saklı Yıldızlar</h2>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "#E8D9B5", fontStyle: "italic", lineHeight: 1.6, opacity: 0.7 }}>Birlikte yaşadığımız her an.</p>
            <div style={{ marginTop: "24px", color: "#C9A96E", fontSize: "11px", opacity: 0.5 }}>✦</div>
          </div>

        </div>

        <div style={{ textAlign: "center", marginTop: "64px" }}>
  <div
    onClick={() => router.push("/sonsuzluk")}
    style={{ display: "inline-block", padding: "14px 32px", background: "rgba(201, 169, 110, 0.08)", border: "1px solid rgba(201, 169, 110, 0.25)", borderRadius: "4px", fontFamily: "Georgia, serif", fontSize: "13px", color: "#C9A96E", letterSpacing: "3px", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s ease" }}
    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201, 169, 110, 0.15)"; e.currentTarget.style.border = "1px solid rgba(201, 169, 110, 0.5)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(201, 169, 110, 0.08)"; e.currentTarget.style.border = "1px solid rgba(201, 169, 110, 0.25)"; }}
  >
    ✦ Sonsuzluk Notu ✦
  </div>
</div>

      </div>
    </main>
  );
}