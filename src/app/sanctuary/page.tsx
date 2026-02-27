import MoodCheckin from "@/components/sanctuary/MoodCheckin";

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

      <section>
        <h2 className="text-2xl mb-2">How are you feeling?</h2>
        <MoodCheckin />
      </section>
    </main>
  );
}
