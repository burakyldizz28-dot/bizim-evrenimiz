import StarfieldBackground from "@/components/ui/StarfieldBackground";
import UniverseGate from "@/components/sections/UniverseGate";
import { getSiteConfig } from "@/lib/getData";

export default async function Home() {
  const config = await getSiteConfig();

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#060810" }}>
      <StarfieldBackground />
      <UniverseGate config={config} />
    </main>
  );
}