"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StarfieldBackground from "@/components/ui/StarfieldBackground";
import { demoPhotos } from "@/data/demo";

const PAGE_SIZE = 24;

export default function HiddenStars() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const access = localStorage.getItem("universe_access");
    if (!access) {
      router.replace("/");
      return;
    }
    setLoaded(true);
  }, [router]);

  if (!loaded) return null;

  const visiblePhotos = demoPhotos.slice(0, visibleCount);
  const hasMore = visibleCount < demoPhotos.length;

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#060810", position: "relative" }}>
      <StarfieldBackground />

      <div style={{ position: "relative", zIndex: 1, padding: "48px 24px 80px", maxWidth: "900px", margin: "0 auto" }}>

        {/* Geri butonu */}
        <button
          onClick={() => router.push("/evren")}
          style={{ background: "none", border: "none", color: "#C9A96E", fontFamily: "Georgia, serif", fontSize: "12px", letterSpacing: "2px", cursor: "pointer", opacity: 0.6, marginBottom: "48px", padding: 0 }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
        >
          ← Yıldız Haritası
        </button>

        {/* Başlık */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ color: "#C9A96E", fontFamily: "Georgia, serif", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "16px", opacity: 0.8 }}>
            ✦ Arşiv ✦
          </p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 300, color: "#F0EDE6", letterSpacing: "1px" }}>
            Saklı Yıldızlar
          </h1>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "14px", color: "#E8D9B5", fontStyle: "italic", marginTop: "12px", opacity: 0.6 }}>
            Birlikte yaşadığımız her an, burada saklı.
          </p>
        </div>

        {/* Fotoğraf grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
          {visiblePhotos.map((photo) => (
            <div
              key={photo.id}
              style={{ aspectRatio: "1/1", borderRadius: "6px", overflow: "hidden", background: "rgba(11, 17, 32, 0.8)", border: "1px solid rgba(201, 169, 110, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", transition: "border 0.3s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.border = "1px solid rgba(201, 169, 110, 0.3)")}
              onMouseLeave={(e) => (e.currentTarget.style.border = "1px solid rgba(201, 169, 110, 0.08)")}
            >
              {photo.url ? (
                <img src={photo.url} alt={photo.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#C9A96E", fontSize: "18px", marginBottom: "8px", opacity: 0.3 }}>✦</div>
                  <p style={{ color: "#F0EDE6", fontFamily: "Georgia, serif", fontSize: "10px", opacity: 0.15, letterSpacing: "1px" }}>
                    {photo.alt}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Daha fazla butonu */}
        {hasMore && (
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <button
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              style={{ padding: "14px 40px", background: "rgba(201, 169, 110, 0.08)", border: "1px solid rgba(201, 169, 110, 0.25)", borderRadius: "4px", color: "#C9A96E", fontFamily: "Georgia, serif", fontSize: "13px", letterSpacing: "2px", cursor: "pointer", transition: "all 0.3s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201, 169, 110, 0.15)"; e.currentTarget.style.border = "1px solid rgba(201, 169, 110, 0.5)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(201, 169, 110, 0.08)"; e.currentTarget.style.border = "1px solid rgba(201, 169, 110, 0.25)"; }}
            >
              Daha fazla yıldız göster
            </button>
            <p style={{ color: "#F0EDE6", fontFamily: "Georgia, serif", fontSize: "11px", marginTop: "12px", opacity: 0.25 }}>
              {visibleCount} / {demoPhotos.length}
            </p>
          </div>
        )}

        {/* Alt sembol */}
        <div style={{ textAlign: "center", marginTop: "64px", color: "#C9A96E", opacity: 0.2, fontSize: "14px", letterSpacing: "8px" }}>
          ✦ ✦ ✦
        </div>

      </div>
    </main>
  );
}