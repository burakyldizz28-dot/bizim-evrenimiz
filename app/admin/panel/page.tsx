"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/admin");
      } else {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin");
  }

  if (loading) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#0f1117", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "rgba(240,237,230,0.4)", fontFamily: "system-ui", fontSize: "14px" }}>Yükleniyor...</p>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0f1117", padding: "32px 24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <div>
            <h1 style={{ color: "#F0EDE6", fontFamily: "system-ui", fontSize: "22px", fontWeight: 600 }}>
              Yönetim Paneli
            </h1>
            <p style={{ color: "rgba(240,237,230,0.4)", fontFamily: "system-ui", fontSize: "13px", marginTop: "4px" }}>
              Bizim Evrenimiz
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{ padding: "8px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "rgba(240,237,230,0.6)", fontFamily: "system-ui", fontSize: "13px", cursor: "pointer" }}
          >
            Çıkış
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
          {[
            { title: "Genel Ayarlar", desc: "İsim, şifre, başlık", icon: "⚙️", href: "/admin/panel/ayarlar" },
            { title: "Yıldız Kartları", desc: "6 kartın içeriği", icon: "✦", href: "/admin/panel/kartlar" },
            { title: "Mektup", desc: "Sana Yazdığım Yıldız", icon: "✉️", href: "/admin/panel/mektup" },
            { title: "Sonsuzluk Notu", desc: "Kapanış metni", icon: "◐", href: "/admin/panel/not" },
            { title: "Fotoğraflar", desc: "Yükle ve yönet", icon: "🖼️", href: "/admin/panel/fotograflar" },
          ].map((item) => (
            <div
              key={item.href}
              onClick={() => router.push(item.href)}
              style={{ background: "#1a1d27", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "24px", cursor: "pointer", transition: "border 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.border = "1px solid rgba(201,169,110,0.4)")}
              onMouseLeave={(e) => (e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)")}
            >
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>{item.icon}</div>
              <h2 style={{ color: "#F0EDE6", fontFamily: "system-ui", fontSize: "16px", fontWeight: 600, marginBottom: "6px" }}>{item.title}</h2>
              <p style={{ color: "rgba(240,237,230,0.4)", fontFamily: "system-ui", fontSize: "13px" }}>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}