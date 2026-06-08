"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import StarfieldBackground from "@/components/ui/StarfieldBackground";
import { getConstellation, getPhotosByConstellation } from "@/lib/getData";

interface Constellation {
  id: string;
  slug: string;
  title: string;
  short_text: string;
  long_text: string;
  icon: string;
  cover_url?: string;
}

interface Photo {
  id: string;
  public_url: string;
  alt_text: string;
}

export default function ConstellationDetail() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const [constellation, setConstellation] = useState<Constellation | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem("universe_access");
    if (!access) { router.replace("/"); return; }
    if (!slug) return;

    const init = async () => {
      const data = await getConstellation(slug);
      setConstellation(data);
      if (data?.id) {
        const photoData = await getPhotosByConstellation(data.id);
        setPhotos(photoData);
      }
      setLoaded(true);
    };
    init();
  }, [slug]);

  if (!loaded) return <main style={{ minHeight: "100vh", backgroundColor: "#060810" }} />;

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

        <button
          onClick={() => router.push("/evren")}
          style={{ background: "none", border: "none", color: "#C9A96E", fontFamily: "Georgia, serif", fontSize: "12px", letterSpacing: "2px", cursor: "pointer", opacity: 0.6, marginBottom: "48px", padding: 0 }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
        >
          ← Yıldız Haritası
        </button>

        <div style={{ fontSize: "32px", color: "#C9A96E", marginBottom: "24px", opacity: 0.8 }}>
          {constellation.icon}
        </div>

        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(28px, 6vw, 44px)", fontWeight: 300, color: "#F0EDE6", marginBottom: "12px", letterSpacing: "1px", lineHeight: 1.3 }}>
          {constellation.title}
        </h1>

        <p style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "#C9A96E", fontStyle: "italic", marginBottom: "48px", opacity: 0.8 }}>
          {constellation.short_text}
        </p>

        <div style={{ width: "40px", height: "1px", background: "rgba(201, 169, 110, 0.3)", marginBottom: "48px" }} />

        {/* Metin */}
        <div style={{ marginBottom: photos.length > 0 ? "48px" : "0" }}>
          {constellation.long_text?.split("\n\n").map((paragraph, i) => (
            <p key={i} style={{ fontFamily: "Georgia, serif", fontSize: "clamp(15px, 2.5vw, 17px)", color: "#E8D9B5", lineHeight: 1.9, marginBottom: "24px", opacity: 0.85 }}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Fotoğraflar */}
        {photos.length > 0 && (
          <div>
            <div style={{ width: "40px", height: "1px", background: "rgba(201, 169, 110, 0.3)", marginBottom: "32px" }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "10px" }}>
              {photos.map((photo) => (
                <div key={photo.id} style={{ aspectRatio: "1/1", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(201, 169, 110, 0.1)" }}>
                  <img src={photo.public_url} alt={photo.alt_text} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}

        {photos.length === 0 && (
          <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: "8px", background: "rgba(11, 17, 32, 0.8)", border: "1px solid rgba(201, 169, 110, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ color: "#F0EDE6", fontFamily: "Georgia, serif", fontSize: "12px", opacity: 0.2, letterSpacing: "2px" }}>FOTOĞRAF ALANI</p>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "64px", color: "#C9A96E", opacity: 0.3, fontSize: "16px", letterSpacing: "8px" }}>
          ✦ ✦ ✦
        </div>

      </div>
    </main>
  );
}