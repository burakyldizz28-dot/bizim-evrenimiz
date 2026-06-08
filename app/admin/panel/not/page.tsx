"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NotPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) { router.replace("/admin"); return; }

      const { data } = await supabase.from("infinity_note").select("*").single();
      if (data) setContent(data.content || "");
      setLoaded(true);
    };
    init();
  }, []);

  async function handleSave() {
    setSaving(true);
    const { data } = await supabase.from("infinity_note").select("id").single();

    if (data) {
      await supabase.from("infinity_note").update({ content, updated_at: new Date().toISOString() }).eq("id", data.id);
    } else {
      await supabase.from("infinity_note").insert({ content });
    }

    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  }

  if (!loaded) return <main style={{ minHeight: "100vh", backgroundColor: "#0f1117" }} />;

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0f1117", padding: "32px 24px" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>

        <button onClick={() => router.push("/admin/panel")} style={{ background: "none", border: "none", color: "rgba(240,237,230,0.4)", fontFamily: "system-ui", fontSize: "13px", cursor: "pointer", marginBottom: "24px", padding: 0 }}>
          ← Panele Dön
        </button>

        <h1 style={{ color: "#F0EDE6", fontFamily: "system-ui", fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
          Sonsuzluk Notu
        </h1>
        <p style={{ color: "rgba(240,237,230,0.4)", fontFamily: "system-ui", fontSize: "13px", marginBottom: "32px" }}>
          Kapanış sayfasındaki kısa ve güçlü metin.
        </p>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: "100%", minHeight: "150px", padding: "16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#F0EDE6", fontFamily: "Georgia, serif", fontSize: "15px", outline: "none", resize: "vertical", lineHeight: 1.8, boxSizing: "border-box" }}
        />

        <button
          onClick={handleSave}
          disabled={saving}
          style={{ marginTop: "16px", width: "100%", padding: "14px", background: "#C9A96E", border: "none", borderRadius: "8px", color: "#060810", fontFamily: "system-ui", fontSize: "14px", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}
        >
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>

        {success && (
          <p style={{ color: "#6fcf97", fontFamily: "system-ui", fontSize: "14px", textAlign: "center", marginTop: "12px" }}>✓ Kaydedildi!</p>
        )}
      </div>
    </main>
  );
}