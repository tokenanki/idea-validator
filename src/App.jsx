import { useState, useEffect } from "react";

const QUESTIONS = [
  {
    id: 1,
    category: "Problem Severity",
    icon: "🔥",
    question: "Is this a 'painkiller' or a 'vitamin'?",
    subtext: "Painkillers solve urgent, must-fix problems. Vitamins are nice-to-have improvements.",
    options: [
      { label: "Painkiller — people are actively frustrated today", score: 20 },
      { label: "Mostly painkiller with some nice-to-have aspects", score: 15 },
      { label: "Vitamin — improves life but isn't critical", score: 7 },
      { label: "Pure vitamin — people don't feel the pain yet", score: 2 },
    ],
  },
  {
    id: 2,
    category: "Market Frequency",
    icon: "📅",
    question: "How often do your potential customers face this problem?",
    subtext: "High frequency = high retention potential and stronger word-of-mouth.",
    options: [
      { label: "Daily — it's a constant frustration", score: 20 },
      { label: "Weekly — comes up regularly", score: 15 },
      { label: "Monthly — occasional pain point", score: 8 },
      { label: "Rarely — once a year or less", score: 2 },
    ],
  },
  {
    id: 3,
    category: "Market Reach",
    icon: "🎯",
    question: "Can you easily identify and reach 10 potential customers today?",
    subtext: "If you can't name them now, your market may be too vague or too small.",
    options: [
      { label: "Yes — I could call/message 10 people right now", score: 20 },
      { label: "Yes — with a day of research I could find them", score: 14 },
      { label: "Probably — I'd need to think about it for a week", score: 7 },
      { label: "No — I'm not sure who exactly would buy this", score: 1 },
    ],
  },
  {
    id: 4,
    category: "Willingness to Pay",
    icon: "💳",
    question: "Have you spoken to anyone who would pay for this right now?",
    subtext: "Validation without money conversations is just guessing.",
    options: [
      { label: "Yes — someone has already paid or committed to pay", score: 20 },
      { label: "Yes — I've had explicit 'I'd pay for this' conversations", score: 15 },
      { label: "Sort of — people said they 'like the idea'", score: 5 },
      { label: "No — I haven't talked to potential customers yet", score: 1 },
    ],
  },
  {
    id: 5,
    category: "Competition Signal",
    icon: "⚔️",
    question: "Are people currently spending money on a (perhaps inferior) alternative?",
    subtext: "Existing spend proves the problem is real and customers will pay.",
    options: [
      { label: "Yes — there are clear, paid competitors right now", score: 20 },
      { label: "Yes — people use DIY workarounds they'd pay to fix", score: 16 },
      { label: "Some — there are free tools but no paid solutions", score: 8 },
      { label: "No — nothing exists and people do nothing about it", score: 3 },
    ],
  },
  {
    id: 6,
    category: "Execution Ease",
    icon: "🛠",
    question: "Do you have the tools/skills to build an MVP in under 30 days?",
    subtext: "Speed to market is critical. Can you validate with something real, fast?",
    options: [
      { label: "Yes — I could ship something testable in a week", score: 20 },
      { label: "Yes — with some help I could do it in 30 days", score: 14 },
      { label: "Maybe — I'd need to learn new skills or hire", score: 7 },
      { label: "No — the MVP is complex and would take months", score: 2 },
    ],
  },
];

const getVerdict = (score) => {
  if (score >= 80)
    return {
      label: "High Potential 🚀",
      color: "#22c55e",
      bg: "rgba(34,197,94,0.1)",
      border: "rgba(34,197,94,0.3)",
      advice: [
        "Move fast — schedule customer discovery calls this week and build your MVP immediately before window closes.",
        "Document your unfair advantage: what makes YOU the right person to solve this specific problem right now?",
        "Set a 30-day goal: ship something real to at least 5 paying beta users and capture every piece of feedback.",
      ],
    };
  if (score >= 55)
    return {
      label: "Promising, But Needs Work 🔧",
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.1)",
      border: "rgba(245,158,11,0.3)",
      advice: [
        "Run 10 structured customer interviews in the next 2 weeks — focus on uncovering the real depth of the pain.",
        "Find proof of payment: locate where potential customers currently spend money on related problems.",
        "Identify the single weakest signal in your answers above and design one experiment to strengthen it.",
      ],
    };
  return {
    label: "High Risk — Pivot Required ⚠️",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.3)",
    advice: [
      "Do NOT build yet. Spend 2 weeks solely on problem discovery — talk to 20 people about the space, not your solution.",
      "Search for an adjacent problem: often the real opportunity is one or two pivots away from your original idea.",
      "Re-evaluate if this is a problem YOU personally experience. Founder-problem fit is the strongest early signal.",
    ],
  };
};

const AnimatedGauge = ({ score }) => {
  const [displayed, setDisplayed] = useState(0);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!animated) return;
    let start = 0;
    const duration = 1400;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(ease * score));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [animated, score]);

  const verdict = getVerdict(score);
  const radius = 80;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const arc = circumference * 0.75;
  const offset = arc - (displayed / 100) * arc;
  const scoreColor = score >= 80 ? "#22c55e" : score >= 55 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      <div style={{ position: "relative", width: "200px", height: "160px" }}>
        <svg width="200" height="160" style={{ overflow: "visible" }}>
          <circle cx="100" cy="130" r={normalizedRadius} fill="none"
            stroke="rgba(255,255,255,0.06)" strokeWidth={stroke}
            strokeDasharray={`${arc} ${circumference}`} strokeLinecap="round"
            transform="rotate(135 100 130)" />
          <circle cx="100" cy="130" r={normalizedRadius} fill="none"
            stroke={scoreColor} strokeWidth={stroke}
            strokeDasharray={`${arc} ${circumference}`} strokeDashoffset={offset}
            strokeLinecap="round" transform="rotate(135 100 130)"
            style={{ transition: "stroke-dashoffset 0.05s linear", filter: `drop-shadow(0 0 8px ${scoreColor})` }} />
        </svg>
        <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "52px", fontWeight: "700", lineHeight: 1, color: scoreColor, textShadow: `0 0 20px ${scoreColor}60` }}>
            {displayed}
          </div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", letterSpacing: "2px", marginTop: "2px" }}>
            OUT OF 100
          </div>
        </div>
      </div>
      <div style={{ padding: "10px 24px", borderRadius: "100px", background: verdict.bg, border: `1px solid ${verdict.border}`, color: verdict.color, fontWeight: "700", fontSize: "15px", letterSpacing: "0.5px" }}>
        {verdict.label}
      </div>
    </div>
  );
};

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [ideaName, setIdeaName] = useState("");
  const [ideaDesc, setIdeaDesc] = useState("");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxPossible = QUESTIONS.length * 20;
  const finalScore = Math.round((totalScore / maxPossible) * 100);
  const verdict = getVerdict(finalScore);

  const handleStart = () => {
    if (!ideaName.trim()) return;
    setScreen("quiz");
    setCurrent(0);
    setAnswers({});
    setSelected(null);
  };

  const handleSelect = (score) => setSelected(score);

  const handleNext = () => {
    if (selected === null) return;
    setTransitioning(true);
    setTimeout(() => {
      setAnswers((prev) => ({ ...prev, [current]: selected }));
      if (current + 1 < QUESTIONS.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        setScreen("results");
      }
      setTransitioning(false);
    }, 300);
  };

  const handleReset = () => {
    setScreen("landing");
    setIdeaName("");
    setIdeaDesc("");
    setCurrent(0);
    setAnswers({});
    setSelected(null);
  };

  const q = QUESTIONS[current];

  const styles = {
    root: {
      minHeight: "100vh",
      background: "#0a0a0f",
      backgroundImage: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(251,191,36,0.08) 0%, transparent 60%)",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      color: "#e8e8e8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    },
    card: {
      width: "100%",
      maxWidth: "620px",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "24px",
      padding: "clamp(28px, 5vw, 48px)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
    },
    logo: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px" },
    logoIcon: { width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #fbbf24, #f59e0b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" },
    logoText: { fontSize: "13px", fontWeight: "600", letterSpacing: "2px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" },
    h1: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(26px, 5vw, 40px)", fontWeight: "700", lineHeight: 1.15, marginBottom: "16px", background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    subtitle: { fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: "36px" },
    label: { display: "block", fontSize: "12px", fontWeight: "600", letterSpacing: "1.5px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "8px" },
    input: { width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#e8e8e8", fontSize: "15px", outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
    textarea: { width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#e8e8e8", fontSize: "15px", outline: "none", resize: "vertical", minHeight: "90px", lineHeight: 1.6, boxSizing: "border-box", fontFamily: "inherit" },
    btnPrimary: { width: "100%", padding: "16px", background: "linear-gradient(135deg, #fbbf24, #f59e0b)", border: "none", borderRadius: "12px", color: "#0a0a0f", fontSize: "15px", fontWeight: "700", cursor: "pointer", letterSpacing: "0.3px", boxShadow: "0 8px 24px rgba(251,191,36,0.25)", fontFamily: "inherit" },
    categoryTag: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "100px", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", color: "#fbbf24", fontSize: "12px", fontWeight: "600", letterSpacing: "0.5px", marginBottom: "20px" },
    question: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", fontWeight: "700", lineHeight: 1.35, marginBottom: "8px", color: "#fff" },
    subtext: { fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, marginBottom: "28px" },
    optionBtn: (isSelected) => ({ width: "100%", padding: "16px 20px", background: isSelected ? "rgba(251,191,36,0.12)" : "rgba(255,255,255,0.03)", border: `1px solid ${isSelected ? "rgba(251,191,36,0.4)" : "rgba(255,255,255,0.07)"}`, borderRadius: "12px", color: isSelected ? "#fbbf24" : "rgba(255,255,255,0.75)", fontSize: "14px", fontWeight: isSelected ? "600" : "400", textAlign: "left", cursor: "pointer", marginBottom: "10px", display: "flex", alignItems: "center", gap: "12px", boxShadow: isSelected ? "0 0 16px rgba(251,191,36,0.1)" : "none", fontFamily: "inherit" }),
    radioCircle: (isSelected) => ({ width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0, border: `2px solid ${isSelected ? "#fbbf24" : "rgba(255,255,255,0.2)"}`, background: isSelected ? "#fbbf24" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }),
    divider: { height: "1px", background: "rgba(255,255,255,0.06)", margin: "32px 0" },
    adviceItem: { display: "flex", gap: "12px", alignItems: "flex-start", padding: "16px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: "10px" },
    adviceNum: { width: "22px", height: "22px", borderRadius: "6px", background: verdict.bg, border: `1px solid ${verdict.border}`, color: verdict.color, fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" },
    stepRow: { display: "flex", gap: "6px", marginBottom: "28px" },
    stepDot: (done, active) => ({ flex: 1, height: "4px", borderRadius: "2px", background: done ? "rgba(251,191,36,0.8)" : active ? "rgba(251,191,36,0.4)" : "rgba(255,255,255,0.08)" }),
  };

  if (screen === "landing") {
    return (
      <div style={styles.root}>
        <div style={styles.card}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>💡</div>
            <span style={styles.logoText}>Idea Validator</span>
          </div>
          <h1 style={styles.h1}>Is your business idea worth building?</h1>
          <p style={styles.subtitle}>
            Answer 6 questions based on Lean Startup & Product-Market Fit frameworks. Get a score, a verdict, and concrete next steps in under 3 minutes.
          </p>
          <div style={{ marginBottom: "20px" }}>
            <label style={styles.label}>Your Business Idea Name</label>
            <input style={styles.input} placeholder="e.g. AI-powered resume screener for SMBs"
              value={ideaName} onChange={(e) => setIdeaName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleStart()} />
          </div>
          <div style={{ marginBottom: "32px" }}>
            <label style={styles.label}>Brief Description <span style={{ color: "rgba(255,255,255,0.25)" }}>(optional)</span></label>
            <textarea style={styles.textarea} placeholder="What does it do? Who is it for?"
              value={ideaDesc} onChange={(e) => setIdeaDesc(e.target.value)} />
          </div>
          <button style={{ ...styles.btnPrimary, opacity: ideaName.trim() ? 1 : 0.4 }} onClick={handleStart}>
            Start Validation →
          </button>
          <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
            {["6 questions", "~3 minutes", "Actionable score"].map((t) => (
              <span key={t} style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>✓ {t}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (screen === "quiz") {
    return (
      <div style={styles.root}>
        <div style={styles.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div style={styles.logo}>
              <div style={styles.logoIcon}>💡</div>
              <span style={styles.logoText}>Idea Validator</span>
            </div>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
              {current + 1} / {QUESTIONS.length}
            </span>
          </div>
          <div style={styles.stepRow}>
            {QUESTIONS.map((_, i) => (
              <div key={i} style={styles.stepDot(i < current, i === current)} />
            ))}
          </div>
          <div style={{ opacity: transitioning ? 0 : 1, transition: "opacity 0.3s", transform: transitioning ? "translateY(8px)" : "translateY(0)" }}>
            <div style={styles.categoryTag}>
              <span>{q.icon}</span>
              <span>{q.category}</span>
            </div>
            <h2 style={styles.question}>{q.question}</h2>
            <p style={styles.subtext}>{q.subtext}</p>
            <div>
              {q.options.map((opt) => (
                <button key={opt.score} style={styles.optionBtn(selected === opt.score)} onClick={() => handleSelect(opt.score)}>
                  <div style={styles.radioCircle(selected === opt.score)}>
                    {selected === opt.score && (
                      <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#0a0a0f" }} />
                    )}
                  </div>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginTop: "24px" }}>
            <button style={{ ...styles.btnPrimary, opacity: selected !== null ? 1 : 0.3 }}
              onClick={handleNext} disabled={selected === null}>
              {current + 1 < QUESTIONS.length ? "Next Question →" : "See My Results →"}
            </button>
          </div>
          <div style={{ marginTop: "16px", textAlign: "center" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>
              Validating: <span style={{ color: "rgba(255,255,255,0.4)" }}>{ideaName}</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.root}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>💡</div>
          <span style={styles.logoText}>Idea Validator</span>
        </div>
        <h2 style={{ ...styles.h1, fontSize: "18px", marginBottom: "4px" }}>Results for</h2>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(20px,4vw,28px)", fontWeight: "700", color: "#fbbf24", marginBottom: "32px", lineHeight: 1.2 }}>
          "{ideaName}"
        </div>
        <AnimatedGauge score={finalScore} />
        <div style={styles.divider} />
        <h3 style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "2px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "14px" }}>
          Your Next 3 Moves
        </h3>
        {verdict.advice.map((tip, i) => (
          <div key={i} style={styles.adviceItem}>
            <div style={styles.adviceNum}>{i + 1}</div>
            <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.7)" }}>{tip}</p>
          </div>
        ))}
        <div style={styles.divider} />
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "2px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: "14px" }}>
            Score Breakdown
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {QUESTIONS.map((q, i) => {
              const s = answers[i] ?? 0;
              const pct = (s / 20) * 100;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", width: "130px", flexShrink: 0 }}>
                    {q.icon} {q.category}
                  </span>
                  <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: "3px", width: `${pct}%`, background: pct >= 75 ? "#22c55e" : pct >= 50 ? "#f59e0b" : "#ef4444", transition: "width 1s 0.3s ease" }} />
                  </div>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", width: "36px", textAlign: "right" }}>
                    {s}/20
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <button style={styles.btnPrimary} onClick={handleReset}>
          Validate Another Idea →
        </button>
      </div>
    </div>
  );
}
