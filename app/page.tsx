import StarfieldBackground from "@/components/ui/StarfieldBackground";
import UniverseGate from "@/components/sections/UniverseGate";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#060810" }}>
      <StarfieldBackground />
      <UniverseGate />
    </main>
  );
}