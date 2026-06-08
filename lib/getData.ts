import { supabase } from "./supabase";

export async function getSiteConfig() {
  const { data } = await supabase.from("site_config").select("*");
  if (!data) return null;
  const map: Record<string, string> = {};
  data.forEach((row: { key: string; value: string }) => {
    map[row.key] = row.value;
  });
  return map;
}

export async function getConstellations() {
  const { data } = await supabase
    .from("constellations")
    .select("*")
    .eq("is_active", true)
    .order("order_index");
  return data || [];
}

export async function getConstellation(slug: string) {
  const { data } = await supabase
    .from("constellations")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function getLetter() {
  const { data } = await supabase
    .from("letter")
    .select("*")
    .single();
  return data;
}

export async function getInfinityNote() {
  const { data } = await supabase
    .from("infinity_note")
    .select("*")
    .single();
  return data;
}

export async function getPhotos(limit: number, offset: number) {
  const { data, count } = await supabase
    .from("photos")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
  return { photos: data || [], total: count || 0 };
}
export async function getPhotosByConstellation(constellationId: string) {
  const { data } = await supabase
    .from("photos")
    .select("*")
    .eq("constellation_id", constellationId)
    .order("created_at", { ascending: false });
  return data || [];
}