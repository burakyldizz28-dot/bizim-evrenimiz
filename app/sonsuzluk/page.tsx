"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StarfieldBackground from "@/components/ui/StarfieldBackground";
import { getInfinityNote, getSiteConfig } from "@/lib/getData";

export default function InfinityPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [siteTitle, setSiteTitle] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem("universe_access");
    if (!access) { router.replace("/"); return; }

    const init = async () => {
      const [note, config] = await Promise.all([getInfinityNote(), getSiteConfig()]);
      setContent(note?.content || "Seninle her yer evren.");
      setPartnerName(config?.partner_name || "");
      setSiteTitle(config?.site_title || "Bizim Evrenimiz");
      setLoaded(true);
      setTimeout(() => setVisible(true), 100);
    };
    init();
  }, []);

  if (!loaded) return <main style={{ minHeight: "100vh", backgroundColor: "#060810" }} />;

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#060810", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <StarfieldBackground />
      <div style={{ position: "relative", zIndex: 1, padding: "48px 24px", maxWidth: "560px", textAlign: "center", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 1.2s ease, transform 1.2s ease" }}>

        <div style={{ fontSize: "11px", color: "#C9A96E", letterSpacing: "10px", marginBottom: "56px", opacity: 0.35 }}>✦ ✦ ✦</div>

        {partnerName && (
          <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "#C9A96E", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "32px", opacity: 0.6 }}>
            {partnerName} için
          </p>
        )}

        <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(24px, 5vw, 38px)", fontWeight: 300, color: "#F0EDE6", lineHeight: 1.8, fontStyle: "italic", marginBottom: "56px", opacity: 0.92 }}>
          {content}
        </p>

        <div style={{ width: "48px", height: "1px", background: "rgba(201, 169, 110, 0.35)", margin: "0 auto 56px" }} />

        <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "#E8D9B5", letterSpacing: "3px", opacity: 0.35, marginBottom: "48px" }}>
          {siteTitle}
        </p>

        <span
          onClick={() => router.push("/evren")}
          style={{ fontFamily: "Georgia, serif", fontSize: "11px", color: "#C9A96E", letterSpacing: "3px", textTransform: "uppercase", opacity: 0.3, cursor: "pointer", transition: "opacity 0.3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.3")}
        >
          ← Yıldız Haritası
        </span>
      </div>
    </main>
  );
}