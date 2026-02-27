import MoodCheckin from "@/components/sanctuary/MoodCheckin";
import GratitudeJournal from "@/components/sanctuary/GratitudeJournal";

export default function SanctuaryPage() {
  return (
    <main
      className="min-h-screen px-6 py-10"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <h1 className="text-4xl mb-1">The Sanctuary</h1>
      <p style={{ color: "var(--color-stone)", marginBottom: "32px" }}>
        Your personal space lives here.
      </p>

      <section style={{ marginBottom: "48px" }}>
        <h2 className="text-2xl mb-2">How are you feeling?</h2>
        <MoodCheckin />
      </section>

      <section>
        <h2 className="text-2xl mb-1">Gratitude</h2>
        <p style={{ color: "var(--color-stone)", fontSize: "0.9rem", marginBottom: "20px" }}>
          Three things, however small.
        </p>
        <GratitudeJournal />
      </section>
    </main>
  );
}
