// Add to your page <head> (or import in your CSS):
// <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;800&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">

const colors = {
  green: "#1F3A34",
  ink: "#1B2B27",
  chalk: "#F4F6F1",
  mist: "#E6ECE4",
  muted: "#44544F",
  line: "#B9C6BC",
  accent: "#F2C94C",
};

const display = "'Bricolage Grotesque', Arial, sans-serif";

const perks = [
  {
    title: "10% off with student ID",
    text: "Show your card at the counter, every visit.",
  },
  {
    title: "Wi-Fi and power",
    text: "Fast internet and a socket at nearly every table.",
  },
  {
    title: "Free refill hour",
    text: "Cheap filter coffee top-ups to keep you going.",
  },
];

const menu = [
  { name: "Cold brew", note: "Slow steeped, over ice", price: "[PRICE]" },
  { name: "Masala chai", note: "Brewed strong, served hot", price: "[PRICE]" },
  { name: "Cappuccino", note: "Double shot, silky milk", price: "[PRICE]" },
  {
    name: "Grilled cheese sandwich",
    note: "With tomato soup on the side",
    price: "[PRICE]",
  },
  {
    name: "All-nighter combo",
    note: "Any coffee plus a snack",
    price: "[PRICE]",
  },
  { name: "Brownie", note: "Fudgy, baked daily", price: "[PRICE]" },
];

const h2 = { fontFamily: display, fontSize: 40, margin: "0 0 32px" };
const wrap = { maxWidth: 1100, margin: "0 auto" };

export default function HomePage() {
  return (
    <div
      style={{
        fontFamily: "'DM Sans', Arial, sans-serif",
        color: colors.ink,
        background: colors.chalk,
      }}
    >
      {/* Nav */}
      <header
        style={{
          background: colors.green,
          color: colors.chalk,
          padding: "20px 6vw",
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 24 }}>
          Margin Café
        </div>
        <nav
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            fontWeight: 500,
          }}
        >
          {[
            ["#perks", "Student perks"],
            ["#menu", "Menu"],
            ["#visit", "Visit"],
            ["/login", "Login"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <section
        style={{
          background: colors.green,
          color: colors.chalk,
          padding: "72px 6vw 96px",
        }}
      >
        <div style={wrap}>
          <div
            style={{
              display: "inline-block",
              background: colors.accent,
              color: colors.ink,
              fontWeight: 700,
              padding: "6px 14px",
              borderRadius: 999,
              fontSize: 14,
            }}
          >
            Open late for exam season
          </div>
          <h1
            style={{
              fontFamily: display,
              fontWeight: 800,
              fontSize: "clamp(44px, 8vw, 96px)",
              lineHeight: 1,
              margin: "24px 0 0",
              maxWidth: 900,
            }}
          >
            Good coffee. Quiet corners. Student prices.
          </h1>
          <p
            style={{
              fontSize: 20,
              lineHeight: 1.5,
              maxWidth: 620,
              margin: "24px 0 0",
              color: "#D5DDD6",
            }}
          >
            Your study spot between lectures, with fast Wi-Fi, a plug at every
            seat, and a cup that won't empty your wallet.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              marginTop: 40,
            }}
          >
            <a
              href="#menu"
              style={{
                background: colors.accent,
                color: colors.ink,
                fontWeight: 700,
                padding: "16px 28px",
                borderRadius: 10,
                textDecoration: "none",
              }}
            >
              See the menu
            </a>
            <a
              href="#visit"
              style={{
                border: `2px solid ${colors.chalk}`,
                color: colors.chalk,
                fontWeight: 700,
                padding: "14px 28px",
                borderRadius: 10,
                textDecoration: "none",
              }}
            >
              Find us
            </a>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section id="perks" style={{ padding: "80px 6vw" }}>
        <div style={wrap}>
          <h2 style={h2}>Made for study sessions</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24,
            }}
          >
            {perks.map((p) => (
              <div
                key={p.title}
                style={{ background: "#fff", borderRadius: 16, padding: 28 }}
              >
                <div style={{ fontWeight: 700, fontSize: 20 }}>{p.title}</div>
                <p
                  style={{
                    margin: "10px 0 0",
                    lineHeight: 1.5,
                    color: colors.muted,
                  }}
                >
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section
        id="menu"
        style={{ padding: "80px 6vw", background: colors.mist }}
      >
        <div style={wrap}>
          <h2 style={h2}>Student favourites</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "16px 48px",
            }}
          >
            {menu.map((item) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  borderBottom: `1px solid ${colors.line}`,
                  padding: "14px 0",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>{item.name}</div>
                  <div style={{ color: colors.muted }}>{item.note}</div>
                </div>
                <div style={{ fontWeight: 700 }}>{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" style={{ padding: "80px 6vw" }}>
        <div
          style={{
            ...wrap,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 40,
          }}
        >
          <div>
            <h2 style={{ ...h2, margin: "0 0 16px" }}>Come study with us</h2>
            <p style={{ lineHeight: 1.6, color: colors.muted, margin: 0 }}>
              Walk-ins welcome. Grab a table, plug in, and stay as long as you
              like.
            </p>
          </div>
          <div
            style={{
              background: colors.green,
              color: colors.chalk,
              borderRadius: 16,
              padding: 32,
              lineHeight: 1.7,
            }}
          >
            {[
              ["Address", "[ADDRESS]"],
              ["Hours", "[OPENING HOURS]"],
              ["Contact", "[PHONE] · [EMAIL]"],
            ].map(([label, value], i) => (
              <div key={label} style={{ marginTop: i ? 16 : 0 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: colors.accent,
                  }}
                >
                  {label}
                </div>
                <div>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: colors.ink,
          color: colors.line,
          padding: "32px 6vw",
          textAlign: "center",
        }}
      >
        Margin Café · Made for students · [YEAR]
      </footer>
    </div>
  );
}
