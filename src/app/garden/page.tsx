import MealGrid from "@/components/garden/MealGrid";
import ActivityScheduler from "@/components/garden/ActivityScheduler";

export default function GardenPage() {
  return (
    <main
      className="min-h-screen px-6 py-10"
      style={{ backgroundColor: "var(--color-mist)" }}
    >
      <h1 className="text-4xl mb-1">The Garden</h1>
      <p style={{ color: "var(--color-stone)", marginBottom: "32px" }}>
        Family planning lives here.
      </p>

      <section style={{ marginBottom: "48px" }}>
        <h2 className="text-2xl mb-6">Meal Planner</h2>
        <MealGrid />
      </section>

      <section>
        <h2 className="text-2xl mb-6">Kids' Activities</h2>
        <ActivityScheduler />
      </section>
    </main>
  );
}
