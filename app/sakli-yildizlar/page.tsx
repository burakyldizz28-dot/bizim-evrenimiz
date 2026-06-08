"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StarfieldBackground from "@/components/ui/StarfieldBackground";
import { supabase } from "@/lib/supabase";

const PAGE_SIZE = 24;

interface Photo {
  id: string;
  public_url: string;
  alt_text: string;
}

export default function HiddenStars() {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [total, setTotal] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem("universe_access");
    if (!access) { router.replace("/"); return; }
    loadPhotos(0, true);
  }, []);

  async function loadPhotos(offset: number, initial = false) {
    if (initial) setLoaded(false);
    else setLoadingMore(true);

    const { data, count } = await supabase
      .from("photos")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);

    if (initial) {
      setPhotos(data || []);
    } else {
      setPhotos(prev => [...prev, ...(data || [])]);
    }
    setTotal(count || 0);
    setLoaded(true);
    setLoadingMore(false);
  }

  if (!loaded) return (
    <main style={{ minHeight: "100vh", backgroundColor: "#060810", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <StarfieldBackground />
      <p style={{ position: "relative", zIndex: 1, color: "#C9A96E", fontFamily: "Georgia, serif", fontSize: "14px", opacity: 0.6 }}>Yükleniyor...</p>
    </main>
  );

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#060810", position: "relative" }}>
      <StarfieldBackground />
      <div style={{ position: "relative", zIndex: 1, padding: "48px 24px 80px", maxWidth: "900px", margin: "0 auto" }}>

        <button
          onClick={() => router.push("/evren")}
          style={{ background: "none", border: "none", color: "#C9A96E", fontFamily: "Georgia, serif", fontSize: "12px", letterSpacing: "2px", cursor: "pointer", opacity: 0.6, marginBottom: "48px", padding: 0 }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
        >
          ← Yıldız Haritası
        </button>

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

        {photos.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <p style={{ color: "#F0EDE6", fontFamily: "Georgia, serif", fontSize: "14px", opacity: 0.3 }}>
              Henüz hiç yıldız eklenmemiş.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
            {photos.map((photo) => (
              <div
                key={photo.id}
                style={{ aspectRatio: "1/1", borderRadius: "6px", overflow: "hidden", background: "rgba(11, 17, 32, 0.8)", border: "1px solid rgba(201, 169, 110, 0.08)", transition: "border 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.border = "1px solid rgba(201, 169, 110, 0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.border = "1px solid rgba(201, 169, 110, 0.08)")}
              >
                <img
                  src={photo.public_url}
                  alt={photo.alt_text}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {photos.length < total && (
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <button
              onClick={() => loadPhotos(photos.length)}
              disabled={loadingMore}
              style={{ padding: "14px 40px", background: "rgba(201, 169, 110, 0.08)", border: "1px solid rgba(201, 169, 110, 0.25)", borderRadius: "4px", color: "#C9A96E", fontFamily: "Georgia, serif", fontSize: "13px", letterSpacing: "2px", cursor: loadingMore ? "not-allowed" : "pointer", transition: "all 0.3s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201, 169, 110, 0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(201, 169, 110, 0.08)"; }}
            >
              {loadingMore ? "Yükleniyor..." : "Daha fazla yıldız göster"}
            </button>
            <p style={{ color: "#F0EDE6", fontFamily: "Georgia, serif", fontSize: "11px", marginTop: "12px", opacity: 0.25 }}>
              {photos.length} / {total}
            </p>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "64px", color: "#C9A96E", opacity: 0.2, fontSize: "14px", letterSpacing: "8px" }}>
          ✦ ✦ ✦
        </div>

      </div>
    </main>
  );
}