"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Ayarlar() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({
    site_title: "",
    partner_name: "",
    gate_password: "",
    welcome_text: "",
    tagline: "",
  });

  useEffect(() => {
    const init = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) { router.replace("/admin"); return; }

      const { data } = await supabase.from("site_config").select("*");
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((row: { key: string; value: string }) => { map[row.key] = row.value; });
        setValues({
          site_title: map.site_title || "",
          partner_name: map.partner_name || "",
          gate_password: map.gate_password || "",
          welcome_text: map.welcome_text || "",
          tagline: map.tagline || "",
        });
      }
      setLoading(false);
    };
    init();
  }, []);

  async function handleSave() {
    setSaving(true);
    const updates = Object.entries(values).map(([key, value]) => ({
      key,
      value,
      updated_at: new Date().toISOString(),
    }));

    for (const update of updates) {
      await supabase.from("site_config").upsert(update, { onConflict: "key" });
    }

    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  }

  if (loading) return <main style={{ minHeight: "100vh", backgroundColor: "#0f1117" }} />;

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

  const labelStyle = {
    color: "rgba(240,237,230,0.6)",
    fontFamily: "system-ui, sans-serif",
    fontSize: "12px",
    marginBottom: "8px",
    display: "block",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0f1117", padding: "32px 24px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>

        <button
          onClick={() => router.push("/admin/panel")}
          style={{ background: "none", border: "none", color: "rgba(240,237,230,0.4)", fontFamily: "system-ui", fontSize: "13px", cursor: "pointer", marginBottom: "24px", padding: 0 }}
        >
          ← Panele Dön
        </button>

        <h1 style={{ color: "#F0EDE6", fontFamily: "system-ui", fontSize: "20px", fontWeight: 600, marginBottom: "32px" }}>
          Genel Ayarlar
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          <div>
            <label style={labelStyle}>Site Başlığı</label>
            <input style={inputStyle} value={values.site_title} onChange={(e) => setValues({ ...values, site_title: e.target.value })} />
          </div>

          <div>
            <label style={labelStyle}>Eşinin Adı</label>
            <input style={inputStyle} value={values.partner_name} onChange={(e) => setValues({ ...values, partner_name: e.target.value })} />
          </div>

          <div>
            <label style={labelStyle}>Giriş Şifresi (Public)</label>
            <input style={inputStyle} value={values.gate_password} onChange={(e) => setValues({ ...values, gate_password: e.target.value })} />
          </div>

          <div>
            <label style={labelStyle}>Alt Başlık</label>
            <input style={inputStyle} value={values.tagline} onChange={(e) => setValues({ ...values, tagline: e.target.value })} />
          </div>

          <div>
            <label style={labelStyle}>Karşılama Metni</label>
            <textarea
              style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
              value={values.welcome_text}
              onChange={(e) => setValues({ ...values, welcome_text: e.target.value })}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            style={{ padding: "14px", background: "#C9A96E", border: "none", borderRadius: "8px", color: "#060810", fontFamily: "system-ui", fontSize: "14px", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>

          {success && (
            <p style={{ color: "#6fcf97", fontFamily: "system-ui", fontSize: "14px", textAlign: "center" }}>
              ✓ Kaydedildi!
            </p>
          )}

        </div>
      </div>
    </main>
  );
}