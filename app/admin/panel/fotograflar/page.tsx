"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Photo {
  id: string;
  public_url: string;
  alt_text: string;
  constellation_id: string | null;
}

interface Constellation {
  id: string;
  title: string;
}

export default function FotograflarPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [constellations, setConstellations] = useState<Constellation[]>([]);
  const [selectedConstellation, setSelectedConstellation] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState("");
  const [filterBy, setFilterBy] = useState<string>("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const init = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) { router.replace("/admin"); return; }

      const { data: cons } = await supabase.from("constellations").select("id, title").order("order_index");
      if (cons) setConstellations(cons);

      await loadPhotos();
      setLoaded(true);
    };
    init();
  }, []);

  async function loadPhotos() {
    const { data } = await supabase
      .from("photos")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setPhotos(data);
  }

  async function compressImage(file: File): Promise<Blob> {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        let { width, height } = img;
        const maxSize = 1920;
        if (width > maxSize || height > maxSize) {
          if (width > height) { height = Math.round((height * maxSize) / width); width = maxSize; }
          else { width = Math.round((width * maxSize) / height); height = maxSize; }
        }
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        canvas.toBlob((blob) => resolve(blob!), "image/webp", 0.82);
      };
      img.src = url;
    });
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    const fileArray = Array.from(files);

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      setProgress(`${i + 1} / ${fileArray.length} yükleniyor...`);
      try {
        const compressed = await compressImage(file);
        const fileName = `${Date.now()}-${i}.webp`;
        const filePath = `photos/${fileName}`;
        const { error: uploadError } = await supabase.storage.from("photos").upload(filePath, compressed, { contentType: "image/webp" });
        if (uploadError) { console.error(uploadError); continue; }
        const { data: urlData } = supabase.storage.from("photos").getPublicUrl(filePath);
        await supabase.from("photos").insert({
          storage_path: filePath,
          public_url: urlData.publicUrl,
          alt_text: file.name,
          constellation_id: selectedConstellation || null,
        });
      } catch (err) { console.error(err); }
    }

    await loadPhotos();
    setUploading(false);
    setProgress("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleDelete(photo: Photo) {
    if (!confirm("Bu fotoğrafı silmek istediğine emin misin?")) return;
    const path = photo.public_url.split("/photos/photos/")[1] || photo.public_url.split("/photos/")[1];
    await supabase.storage.from("photos").remove([`photos/${path}`]);
    await supabase.from("photos").delete().eq("id", photo.id);
    setPhotos(prev => prev.filter(p => p.id !== photo.id));
  }

  const filteredPhotos = filterBy === "all"
    ? photos
    : filterBy === "none"
    ? photos.filter(p => !p.constellation_id)
    : photos.filter(p => p.constellation_id === filterBy);

  if (!loaded) return <main style={{ minHeight: "100vh", backgroundColor: "#0f1117" }} />;

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0f1117", padding: "32px 24px" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>

        <button onClick={() => router.push("/admin/panel")} style={{ background: "none", border: "none", color: "rgba(240,237,230,0.4)", fontFamily: "system-ui", fontSize: "13px", cursor: "pointer", marginBottom: "24px", padding: 0 }}>
          ← Panele Dön
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ color: "#F0EDE6", fontFamily: "system-ui", fontSize: "20px", fontWeight: 600 }}>Fotoğraflar</h1>
            <p style={{ color: "rgba(240,237,230,0.4)", fontFamily: "system-ui", fontSize: "13px", marginTop: "4px" }}>{photos.length} fotoğraf</p>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <select
              value={selectedConstellation}
              onChange={(e) => setSelectedConstellation(e.target.value)}
              style={{ padding: "10px 14px", background: "#1a1d27", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#F0EDE6", fontFamily: "system-ui", fontSize: "13px", outline: "none" }}
            >
              <option value="">Genel Arşiv (kart yok)</option>
              {constellations.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>

            <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleUpload} style={{ display: "none" }} />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              style={{ padding: "10px 20px", background: "#C9A96E", border: "none", borderRadius: "8px", color: "#060810", fontFamily: "system-ui", fontSize: "13px", fontWeight: 600, cursor: uploading ? "not-allowed" : "pointer", opacity: uploading ? 0.7 : 1 }}
            >
              {uploading ? progress || "Yükleniyor..." : "+ Fotoğraf Yükle"}
            </button>
          </div>
        </div>

        {/* Filtre */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
          <button onClick={() => setFilterBy("all")} style={{ padding: "6px 14px", background: filterBy === "all" ? "rgba(201,169,110,0.2)" : "rgba(255,255,255,0.05)", border: filterBy === "all" ? "1px solid rgba(201,169,110,0.4)" : "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", color: "#F0EDE6", fontFamily: "system-ui", fontSize: "12px", cursor: "pointer" }}>
            Tümü ({photos.length})
          </button>
          <button onClick={() => setFilterBy("none")} style={{ padding: "6px 14px", background: filterBy === "none" ? "rgba(201,169,110,0.2)" : "rgba(255,255,255,0.05)", border: filterBy === "none" ? "1px solid rgba(201,169,110,0.4)" : "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", color: "#F0EDE6", fontFamily: "system-ui", fontSize: "12px", cursor: "pointer" }}>
            Genel Arşiv
          </button>
          {constellations.map(c => (
            <button key={c.id} onClick={() => setFilterBy(c.id)} style={{ padding: "6px 14px", background: filterBy === c.id ? "rgba(201,169,110,0.2)" : "rgba(255,255,255,0.05)", border: filterBy === c.id ? "1px solid rgba(201,169,110,0.4)" : "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", color: "#F0EDE6", fontFamily: "system-ui", fontSize: "12px", cursor: "pointer" }}>
              {c.title} ({photos.filter(p => p.constellation_id === c.id).length})
            </button>
          ))}
        </div>

        {filteredPhotos.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "12px" }}>
            <p style={{ color: "rgba(240,237,230,0.3)", fontFamily: "system-ui", fontSize: "14px" }}>Henüz fotoğraf yüklenmedi.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "10px" }}>
            {filteredPhotos.map((photo) => (
              <div key={photo.id} style={{ position: "relative", aspectRatio: "1/1", borderRadius: "8px", overflow: "hidden", background: "#1a1d27" }}>
                <img src={photo.public_url} alt={photo.alt_text} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button
                  onClick={() => handleDelete(photo)}
                  style={{ position: "absolute", top: "6px", right: "6px", background: "rgba(0,0,0,0.7)", border: "none", borderRadius: "50%", width: "26px", height: "26px", color: "white", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  ×
                </button>
                {photo.constellation_id && (
                  <div style={{ position: "absolute", bottom: "0", left: "0", right: "0", background: "rgba(0,0,0,0.6)", padding: "4px 8px" }}>
                    <p style={{ color: "#C9A96E", fontFamily: "system-ui", fontSize: "10px", margin: 0 }}>
                      {constellations.find(c => c.id === photo.constellation_id)?.title || ""}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}