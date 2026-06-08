"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Constellation {
  id: string;
  slug: string;
  title: string;
  short_text: string;
  long_text: string;
  icon: string;
  order_index: number;
}

export default function KartlarPage() {
  const router = useRouter();
  const [constellations, setConstellations] = useState<Constellation[]>([]);
  const [selected, setSelected] = useState<Constellation | null>(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) { router.replace("/admin"); return; }

      const { data } = await supabase.from("constellations").select("*").order("order_index");
      if (data) setConstellations(data);
      setLoaded(true);
    };
    init();
  }, []);

  async function handleSave() {
    if (!selected) return;
    setSaving(true);

    await supabase.from("constellations").update({
      title: selected.title,
      short_text: selected.short_text,
      long_text: selected.long_text,
      icon: selected.icon,
      updated_at: new Date().toISOString(),
    }).eq("id", selected.id);

    setConstellations(prev => prev.map(c => c.id === selected.id ? selected : c));
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  }

  if (!loaded) return <main style={{ minHeight: "100vh", backgroundColor: "#0f1117" }} />;

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    color: "#F0EDE6",
    fontFamily: "system-ui, sans-serif",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0f1117", padding: "32px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: selected ? "1fr 1.5fr" : "1fr", gap: "24px" }}>

        {/* Sol — kart listesi */}
        <div>
          <button onClick={() => router.push("/admin/panel")} style={{ background: "none", border: "none", color: "rgba(240,237,230,0.4)", fontFamily: "system-ui", fontSize: "13px", cursor: "pointer", marginBottom: "24px", padding: 0 }}>
            ← Panele Dön
          </button>

          <h1 style={{ color: "#F0EDE6", fontFamily: "system-ui", fontSize: "20px", fontWeight: 600, marginBottom: "24px" }}>
            Yıldız Kartları
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {constellations.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelected({ ...c })}
                style={{ padding: "16px", background: selected?.id === c.id ? "rgba(201,169,110,0.1)" : "#1a1d27", border: selected?.id === c.id ? "1px solid rgba(201,169,110,0.4)" : "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "18px", color: "#C9A96E" }}>{c.icon}</span>
                  <div>
                    <p style={{ color: "#F0EDE6", fontFamily: "system-ui", fontSize: "14px", fontWeight: 500 }}>{c.title}</p>
                    <p style={{ color: "rgba(240,237,230,0.4)", fontFamily: "system-ui", fontSize: "12px", marginTop: "2px" }}>{c.short_text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ — editör */}
        {selected && (
          <div>
            <h2 style={{ color: "#F0EDE6", fontFamily: "system-ui", fontSize: "16px", fontWeight: 600, marginBottom: "24px", marginTop: "48px" }}>
              Düzenle: {selected.title}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              <div>
                <label style={{ color: "rgba(240,237,230,0.6)", fontFamily: "system-ui", fontSize: "12px", marginBottom: "8px", display: "block", textTransform: "uppercase", letterSpacing: "1px" }}>Başlık</label>
                <input style={inputStyle} value={selected.title} onChange={(e) => setSelected({ ...selected, title: e.target.value })} />
              </div>

              <div>
                <label style={{ color: "rgba(240,237,230,0.6)", fontFamily: "system-ui", fontSize: "12px", marginBottom: "8px", display: "block", textTransform: "uppercase", letterSpacing: "1px" }}>Kısa Açıklama</label>
                <input style={inputStyle} value={selected.short_text} onChange={(e) => setSelected({ ...selected, short_text: e.target.value })} />
              </div>

              <div>
                <label style={{ color: "rgba(240,237,230,0.6)", fontFamily: "system-ui", fontSize: "12px", marginBottom: "8px", display: "block", textTransform: "uppercase", letterSpacing: "1px" }}>İkon</label>
                <input style={{ ...inputStyle, width: "80px" }} value={selected.icon} onChange={(e) => setSelected({ ...selected, icon: e.target.value })} />
              </div>

              <div>
                <label style={{ color: "rgba(240,237,230,0.6)", fontFamily: "system-ui", fontSize: "12px", marginBottom: "8px", display: "block", textTransform: "uppercase", letterSpacing: "1px" }}>Hikâye Metni</label>
                <textarea
                  style={{ ...inputStyle, minHeight: "200px", resize: "vertical", lineHeight: 1.6 }}
                  value={selected.long_text}
                  onChange={(e) => setSelected({ ...selected, long_text: e.target.value })}
                />
                <p style={{ color: "rgba(240,237,230,0.3)", fontFamily: "system-ui", fontSize: "11px", marginTop: "6px" }}>
                  Paragraf aralarına boş satır bırak.
                </p>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                style={{ padding: "14px", background: "#C9A96E", border: "none", borderRadius: "8px", color: "#060810", fontFamily: "system-ui", fontSize: "14px", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}
              >
                {saving ? "Kaydediliyor..." : "Kaydet"}
              </button>

              {success && (
                <p style={{ color: "#6fcf97", fontFamily: "system-ui", fontSize: "14px", textAlign: "center" }}>✓ Kaydedildi!</p>
              )}

            </div>
          </div>
        )}

      </div>
    </main>
  );
}