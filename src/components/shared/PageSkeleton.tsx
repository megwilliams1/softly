export default function PageSkeleton() {
  const bar = (w: string, h: string, opacity = 0.18) => ({
    width: w,
    height: h,
    borderRadius: "var(--radius-full)",
    backgroundColor: "var(--color-pebble)",
    opacity,
  });

  return (
    <div
      className="animate-soft-pulse"
      style={{
        padding: "36px 32px 48px",
        backgroundColor: "var(--color-cream)",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div style={bar("72px", "10px", 0.22)} />
      <div style={bar("260px", "44px", 0.14)} />
      <div style={{ ...bar("180px", "10px"), marginBottom: "20px" }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
        }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              height: "200px",
              backgroundColor: "var(--color-pebble)",
              borderRadius: "var(--radius-xl)",
              opacity: 0.1,
            }}
          />
        ))}
      </div>
    </div>
  );
}
