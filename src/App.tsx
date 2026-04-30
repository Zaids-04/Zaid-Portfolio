import { useEffect, useRef, useState, type FormEvent } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: "fa-laptop-code",
    title: "Full-Stack Web Development",
    desc: "End-to-end websites & web apps built with React, Node.js, and modern stacks. Pixel-perfect, fast, and responsive.",
  },
  {
    icon: "fa-graduation-cap",
    title: "College Projects",
    desc: "Final year projects, mini projects, and academic submissions delivered with full source code, documentation, and viva support.",
  },
  {
    icon: "fa-industry",
    title: "Industrial Projects",
    desc: "Production-grade solutions for businesses — dashboards, automation tools, and custom internal systems built to scale.",
  },
  {
    icon: "fa-mobile-screen",
    title: "Responsive UI / UX",
    desc: "Beautiful, mobile-first interfaces designed for performance and conversion across every device and screen size.",
  },
  {
    icon: "fa-server",
    title: "Backend & APIs",
    desc: "Robust REST APIs, authentication, databases (MongoDB / MySQL), payment gateways, and third-party integrations.",
  },
  {
    icon: "fa-rocket",
    title: "Freelance Services",
    desc: "Affordable, on-time delivery for startups, students, and businesses. From concept to deployment — everything done here.",
  },
];

const SKILLS_LEFT = [
  { name: "React.js / Next.js", pct: 92 },
  { name: "JavaScript / TypeScript", pct: 90 },
  { name: "HTML5 / CSS3 / Tailwind", pct: 95 },
  { name: "Java / Spring Boot", pct: 85 },
];
const SKILLS_RIGHT = [
  { name: "MySQL", pct: 82 },
  { name: "REST APIs / Auth", pct: 88 },
  { name: "Git / GitHub", pct: 90 },
  { name: "UI / UX Design", pct: 80 },
];

const PROJECTS = [
  {
   img: `${import.meta.env.BASE_URL}images/project-ecommerce.jpg`,
    title: "E-Commerce Platform",
    desc: "Full-featured online store with cart, checkout, payment gateway, admin panel and order management. Built with React + Node.js + MongoDB.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/Zaids-04",
    live: "#", 
  },
  {
    img: "/images/project-saas.jpg",
    title: "SaaS Analytics Dashboard",
    desc: "Real-time analytics dashboard with interactive charts, user roles, subscription billing and exportable reports for SaaS businesses.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Chart.js"],
    github: "https://github.com/zaids-04",
    live: "#",
  },
  {
    img: "/images/project-college.jpg",
    title: "College Management System",
    desc: "Complete student/faculty portal with attendance, marks, fees, notices and admin dashboard. A real industrial-grade college project.",
    tags: ["React", "Express", "MySQL", "JWT"],
    github: "https://github.com/zaids-04",
    live: "#",
  },
  {
    img: "/images/project-restaurant.jpg",
    title: "Restaurant Booking Web App",
    desc: "Online table reservation, digital menu, order tracking, and admin panel for restaurants. Mobile-first responsive UI.",
    tags: ["React", "Firebase", "Tailwind"],
    github: "https://github.com/zaids-04",
    live: "#",
  },
  {
    img: "/images/project-portfolio.jpg",
    title: "Animated Portfolio Builder",
    desc: "A reusable, fully-animated portfolio template generator with custom themes, particle backgrounds and EmailJS contact form.",
    tags: ["React", "Vite", "GSAP"],
    github: "https://github.com/zaids-04",
    live: "#",
  },
  {
    img: "/images/project-industrial.jpg",
    title: "Industrial IoT Dashboard",
    desc: "Real-time machine monitoring system with live charts, alerts, and historical analytics for industrial clients. WebSocket powered.",
    tags: ["React", "Socket.io", "Node.js", "MongoDB"],
    github: "https://github.com/zaids-04",
    live: "#",
  },
];

const TYPED_PHRASES = [
  "Full-Stack Web Developer ⚡",
  "Freelancer at Z-Stack Solutions 💼",
  "React & Node.js Specialist ⚛️",
  "College → Industrial Projects 🚀",
  "Building scalable web apps 🌐",
  "Pune, India 📍",
];

// ─── COMPONENTS ───────────────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top = my + "px";
      }
    };
    const animate = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      raf = requestAnimationFrame(animate);
    };
    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    const onEnter = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "54px";
        ringRef.current.style.height = "54px";
        ringRef.current.style.borderColor = "var(--accent3)";
      }
      if (dotRef.current) dotRef.current.style.transform = "translate(-50%,-50%) scale(1.8)";
    };
    const onLeave = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "36px";
        ringRef.current.style.height = "36px";
        ringRef.current.style.borderColor = "var(--accent)";
      }
      if (dotRef.current) dotRef.current.style.transform = "translate(-50%,-50%) scale(1)";
    };

    const attach = () => {
      const els = document.querySelectorAll(
        "a, button, .project-card, .service-card, .stat-box, input, textarea, select"
      );
      els.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
      return els;
    };
    const els = attach();
    // Re-attach when DOM changes (new nodes via React)
    const mo = new MutationObserver(() => {
      attach();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      mo.disconnect();
    };
  }, []);

  return (
    <div id="cursor">
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </div>
  );
}

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, raf = 0;
    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let particles: P[] = [];

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    const make = (): P => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      a: Math.random() * 0.5 + 0.15,
    });
    resize();
    window.addEventListener("resize", resize);
    particles = Array.from({ length: 110 }, make);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const isLight = document.body.classList.contains("light-mode");
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? `rgba(0,80,200,${p.a * 0.4})`
          : `rgba(0,245,255,${p.a})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.strokeStyle = isLight
              ? `rgba(0,80,200,${0.04 * (1 - d / 110)})`
              : `rgba(0,245,255,${0.08 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas id="particles-canvas" ref={canvasRef} />;
}

function Typed({ phrases }: { phrases: string[] }) {
  const [text, setText] = useState("");
  const idxRef = useRef({ pi: 0, ci: 0, del: false });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const cur = phrases[idxRef.current.pi];
      if (!idxRef.current.del) {
        setText(cur.substring(0, idxRef.current.ci + 1));
        idxRef.current.ci++;
        if (idxRef.current.ci === cur.length) {
          idxRef.current.del = true;
          timer = setTimeout(tick, 1800);
          return;
        }
        timer = setTimeout(tick, 70);
      } else {
        setText(cur.substring(0, idxRef.current.ci - 1));
        idxRef.current.ci--;
        if (idxRef.current.ci === 0) {
          idxRef.current.del = false;
          idxRef.current.pi = (idxRef.current.pi + 1) % phrases.length;
        }
        timer = setTimeout(tick, 35);
      }
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [phrases]);

  return <span className="typed-text">{text}</span>;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useSkillBars() {
  useEffect(() => {
    const section = document.getElementById("skills");
    if (!section) return;
    let done = false;
    let timer: ReturnType<typeof setTimeout>;

    const animateBars = () => {
      document.querySelectorAll<HTMLElement>(".skill-bar-fill").forEach((bar) => {
        const w = bar.dataset.w;
        if (w) {
          // Force reset then animate
          bar.style.transition = "none";
          bar.style.width = "0%";
          // Force reflow
          bar.offsetHeight;
          bar.style.transition = "width 1.4s cubic-bezier(0.4, 0, 0.2, 1)";
          bar.style.width = w + "%";
        }
      });
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !done) {
            done = true;
            // Small delay to let reveal animation start first
            timer = setTimeout(animateBars, 300);
          }
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(section);
    return () => {
      obs.disconnect();
      clearTimeout(timer);
    };
  }, []);
}

// ─── QUICK CONNECT MODAL ──────────────────────────────────────────────
function QuickConnect({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Full-Stack Website Development",
    message: "",
  });

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/zaidsayyed1408@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `🚀 New Quick Connect Request from ${form.name}`,
          _template: "table",
          _captcha: "false",
          Name: form.name,
          Email: form.email,
          Phone: form.phone,
          "Service Requested": form.service,
          "Project Details": form.message,
          Source: "Z-Stack Solutions Portfolio — Quick Connect",
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", service: "Full-Stack Website Development", message: "" });
        setTimeout(() => {
          setStatus("idle");
          onClose();
        }, 2500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="qc-modal-backdrop" onClick={onClose}>
      <div className="qc-modal-wrap" onClick={(e) => e.stopPropagation()}>
        <div className="qc-modal">
          <button className="qc-close" onClick={onClose} aria-label="Close">
            <i className="fa fa-times" />
          </button>
          <h3>⚡ QUICK CONNECT</h3>
          <p className="qc-sub">Tell me about your project — I'll get back to you within 24 hours.</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              required
              type="text"
              placeholder="Your Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              required
              type="email"
              placeholder="Email Address *"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              required
              type="tel"
              placeholder="Phone / WhatsApp *"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
            >
              <option>Full-Stack Website Development</option>
              <option>College Project</option>
              <option>Industrial Project</option>
              <option>UI / UX Design</option>
              <option>Backend / API Development</option>
              <option>Other Freelance Work</option>
            </select>
            <textarea
              required
              placeholder="Briefly describe your project / requirement *"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            {status === "success" && (
              <div className="form-status success">✓ MESSAGE SENT — I'LL REPLY SOON!</div>
            )}
            {status === "error" && (
              <div className="form-status error">✗ FAILED. EMAIL ME DIRECTLY: zaidsayyed1408@gmail.com</div>
            )}
            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "SENDING..." : "SEND REQUEST →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [light, setLight] = useState(false);
  const [qcOpen, setQcOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useReveal();
  useSkillBars();

  useEffect(() => {
    if (light) document.body.classList.add("light-mode");
    else document.body.classList.remove("light-mode");
  }, [light]);

  const closeMenu = () => setMenuOpen(false);

  const handleContact = async (e: FormEvent) => {
    e.preventDefault();
    setContactStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/zaidsayyed1408@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `📩 Portfolio Contact — ${contactForm.subject || "New Message"}`,
          _template: "table",
          _captcha: "false",
          Name: contactForm.name,
          Email: contactForm.email,
          Phone: contactForm.phone,
          Subject: contactForm.subject,
          Message: contactForm.message,
          Source: "Z-Stack Solutions Portfolio — Contact Form",
        }),
      });
      if (res.ok) {
        setContactStatus("success");
        setContactForm({ name: "", email: "", phone: "", subject: "", message: "" });
        setTimeout(() => setContactStatus("idle"), 4000);
      } else {
        setContactStatus("error");
      }
    } catch {
      setContactStatus("error");
    }
  };

  return (
    <>
      <Cursor />
      <Particles />

      {/* NAV */}
      <nav className="zs-nav">
        <a href="#home" className="nav-logo" onClick={closeMenu}>
          <span className="logo-mark">ZS</span> Z-STACK
        </a>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><a href="#about" onClick={closeMenu}>About</a></li>
          <li><a href="#services" onClick={closeMenu}>Services</a></li>
          <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
          <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        </ul>
        <div className="nav-right">
          <button id="dark-toggle" onClick={() => setLight((v) => !v)}>
            {light ? "🌙 DARK" : "☀ LIGHT"}
          </button>
          <button className="hamburger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home">
        <div className="hero-badge">💼 FREELANCER · FULL-STACK DEVELOPER · PUNE</div>

        <div className="hero-photo-wrap float">
          <img src="/images/zaid-avatar.jpg" alt="Zaid T Sayyed - Z-Stack Solutions" />
        </div>

        <div className="hero-company">Z-Stack Solutions</div>
       { /*<h1 className="hero-name">ZAID T SAYYED</h1>*/}
        <p className="hero-title">Full-Stack Developer · Freelancer · Problem Solver</p>
        <Typed phrases={TYPED_PHRASES} />

        <div className="hero-btns">
          <a href="#projects" className="btn-primary">VIEW MY WORK</a>
          <button className="btn-outline" onClick={() => setQcOpen(true)}>
            QUICK CONNECT ⚡
          </button>
        </div>

        <div className="social-row">
          <a href="mailto:zaidsayyed1408@gmail.com" title="Email"><i className="fa fa-envelope" /></a>
          <a href="tel:+917744898605" title="Call"><i className="fa fa-phone" /></a>
          <a href="https://wa.me/917744898605" target="_blank" rel="noreferrer" title="WhatsApp"><i className="fab fa-whatsapp" /></a>
          <a href="https://github.com/zaids-04" target="_blank" rel="noreferrer" title="GitHub"><i className="fab fa-github" /></a>
          <a href="https://linkedin.com/in/zaidsayyed1408" target="_blank" rel="noreferrer" title="LinkedIn"><i className="fab fa-linkedin-in" /></a>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer" title="Instagram"><i className="fab fa-instagram" /></a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="section-wrap">
          <p className="section-label reveal"></p>
         { /*<h2 className="section-title reveal">Who Is <span>Zaid?</span></h2>*/}
          <h2 className="section-title reveal">Z -<span>Stack</span></h2>
          <div className="section-line reveal" />

          <div className="about-grid reveal">
            <div className="glass-card">
              <div className="about-info">
                <h3>📌 INTRODUCTION</h3>
                <p>
                  Hi, I'm <strong>Zaid Sayyed</strong> — the founder & lead developer at{" "}
                  <strong>Z-Stack Solutions</strong>, a freelance development studio based in{" "}
                  <strong>Pune, India</strong>. I specialize in building modern, scalable, and
                  beautifully animated <strong>full-stack web applications</strong>.
                </p>
                <p>
                  From <strong>college academic projects</strong> to{" "}
                  <strong>industrial-grade business solutions</strong>, I deliver end-to-end —
                  design, development, deployment, and support.{" "}
                  <em style={{ color: "var(--accent)" }}>Everything is done here.</em>
                </p>
                <div className="tag-cloud">
                  <span className="tag">React</span>
                  <span className="tag">Rest Api</span>
                  <span className="tag">SpringBoot</span>
                  <span className="tag">MySql</span>
                  <span className="tag">TypeScript</span>
                  <span className="tag">Tailwind</span>
                  <span className="tag">Freelancer</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <div className="glass-card">
                <div className="about-info">
                  <h3>💼 WHAT I OFFER</h3>
                  <p>
                    🌐 <strong>Full-Stack Website Development</strong> — From landing pages to
                    complex web apps.
                  </p>
                  <p>
                    🎓 <strong>College → Industrial Projects</strong> — Source code, docs, viva
                    support, and production deployment.
                  </p>
                  <p>
                    ⚡ <strong>Freelance Services</strong> — Reliable, affordable, and on-time
                    delivery.
                  </p>
                </div>
              </div>

              <div className="glass-card">
                <div className="about-info">
                  <h3>💪 WHY CHOOSE ME</h3>
                  <div className="tag-cloud">
                    <span className="tag">⚡ Fast Delivery</span>
                    <span className="tag">💯 Quality Code</span>
                    <span className="tag">🛠 Full Support</span>
                    <span className="tag">💬 24/7 Communication</span>
                    <span className="tag">💸 Affordable</span>
                    <span className="tag">🚀 Modern Stack</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-row reveal">
            <div className="stat-box">
              <div className="stat-num">3+</div>
              <div className="stat-label">Projects Done</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">3+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">1</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-box">
              <div className="stat-num">100%</div>
              <div className="stat-label">On-Time Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ background: "var(--bg2)" }}>
        <div className="section-wrap">
          <p className="section-label reveal"></p>
          <h2 className="section-title reveal">What I <span>Build</span></h2>
          <div className="section-line reveal" />

          <div className="services-grid">
            {SERVICES.map((s) => (
              <div className="service-card reveal" key={s.title}>
                <div className="service-icon">
                  <i className={`fa-solid ${s.icon}`} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-wrap">
          <p className="section-label reveal"></p>
          <h2 className="section-title reveal">My <span>Arsenal</span></h2>
          <div className="section-line reveal" />

          <div className="skills-grid reveal">
            <div className="glass-card">
              <h3 style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.9rem", color: "var(--accent)", marginBottom: "1.5rem", letterSpacing: "2px" }}>
                FRONTEND
              </h3>
              {SKILLS_LEFT.map((s) => (
                <div className="skill-item" key={s.name}>
                  <div className="skill-header">
                    <span className="skill-name">{s.name}</span>
                    <span className="skill-pct">{s.pct}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" data-w={s.pct} />
                  </div>
                </div>
              ))}
            </div>
            <div className="glass-card">
              <h3 style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.9rem", color: "var(--accent2)", marginBottom: "1.5rem", letterSpacing: "2px" }}>
                BACKEND & TOOLS
              </h3>
              {SKILLS_RIGHT.map((s) => (
                <div className="skill-item" key={s.name}>
                  <div className="skill-header">
                    <span className="skill-name">{s.name}</span>
                    <span className="skill-pct">{s.pct}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div
                      className="skill-bar-fill"
                      data-w={s.pct}
                      style={{ background: "linear-gradient(90deg, var(--accent2), var(--accent3))" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ background: "var(--bg2)" }}>
        <div className="section-wrap">
          <p className="section-label reveal"></p>
          <h2 className="section-title reveal">Featured <span>Projects</span></h2>
          <div className="section-line reveal" />

          <div className="projects-grid">
            {PROJECTS.map((p) => (
              <div className="project-card reveal" key={p.title}>
                <div className="project-img">
                  <img src={p.img} alt={p.title} loading="lazy" />
                </div>
                <div className="project-body">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="project-tags">
                    {p.tags.map((t) => (
                      <span className="ptag" key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
                      <i className="fab fa-github" /> GitHub
                    </a>
                    <a href={p.live} target="_blank" rel="noreferrer" className="project-link">
                      <i className="fa fa-arrow-up-right-from-square" /> Live
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="section-wrap">
          <p className="section-label reveal"></p>
          <h2 className="section-title reveal">Let's <span>Build Together</span></h2>
          <div className="section-line reveal" />

          <div className="contact-grid reveal">
            <div className="contact-info">
              <a href="mailto:zaidsayyed1408@gmail.com" className="contact-item">
                <div className="contact-icon"><i className="fa fa-envelope" /></div>
                <div>
                  <h4>Email</h4>
                  <span className="ci-val">zaidsayyed1408@gmail.com</span>
                </div>
              </a>
              <a href="tel:+917744898605" className="contact-item">
                <div className="contact-icon"><i className="fa fa-phone" /></div>
                <div>
                  <h4>Phone</h4>
                  <span className="ci-val">+91 77448 98605</span>
                </div>
              </a>
              <a href="https://wa.me/917744898605" target="_blank" rel="noreferrer" className="contact-item">
                <div className="contact-icon"><i className="fab fa-whatsapp" /></div>
                <div>
                  <h4>WhatsApp</h4>
                  <span className="ci-val">+91 77448 98605</span>
                </div>
              </a>
              <a href="https://github.com/zaids-04" target="_blank" rel="noreferrer" className="contact-item">
                <div className="contact-icon"><i className="fab fa-github" /></div>
                <div>
                  <h4>GitHub</h4>
                  <span className="ci-val">github.com/zaidsayyed1408</span>
                </div>
              </a>
              <div className="contact-item">
                <div className="contact-icon"><i className="fa fa-map-marker-alt" /></div>
                <div>
                  <h4>Location</h4>
                  <span className="ci-val">Pune, Maharashtra, India</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><i className="fa fa-briefcase" /></div>
                <div>
                  <h4>Studio</h4>
                  <span className="ci-val">Z-Stack Solutions-We Are Here to Help You </span>
                </div>
              </div>
            </div>

            <div>
              <div className="glass-card">
                <h3 style={{ fontFamily: "Orbitron, sans-serif", fontSize: "0.95rem", color: "var(--accent)", marginBottom: "1rem", letterSpacing: "2px" }}>
                  📩 SEND A MESSAGE
                </h3>
                <p style={{ color: "var(--text-dim)", fontSize: "0.9rem", marginBottom: "1.2rem" }}>
                  Fill the form & I'll get back to you within 24 hours.
                </p>
                <form className="contact-form" onSubmit={handleContact}>
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  />
                  <input
                    required
                    type="text"
                    placeholder="Subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  />
                  <textarea
                    required
                    placeholder="Tell me about your project / requirement..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                  {contactStatus === "success" && (
                    <div className="form-status success">✓ MESSAGE SENT SUCCESSFULLY!</div>
                  )}
                  {contactStatus === "error" && (
                    <div className="form-status error">✗ SOMETHING WENT WRONG. EMAIL DIRECTLY.</div>
                  )}
                  <button type="submit" disabled={contactStatus === "sending"}>
                    {contactStatus === "sending" ? "SENDING..." : "SEND MESSAGE →"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="zs-footer">
        <div style={{ fontFamily: "Orbitron, sans-serif", fontSize: "1.3rem", marginBottom: "0.6rem", color: "var(--accent)", letterSpacing: "3px" }}>
          Z-STACK SOLUTIONS
        </div>
        <p>Zaid Sayyed · Full-Stack Developer · Freelancer · Pune, India</p>
        <p style={{ marginTop: "0.6rem" }}>
          Crafted with <span className="accent">♥</span> ·{" "}
          <a href="mailto:zaidsayyed1408@gmail.com">zaidsayyed1408@gmail.com</a> ·{" "}
          <a href="tel:+917744898605">+91 77448 98605</a>
        </p>
        <p style={{ marginTop: "0.6rem", fontSize: "0.75rem", opacity: 0.7 }}>
          © {new Date().getFullYear()} Z-Stack Solutions ·
        </p>
      </footer>

      {/* QUICK CONNECT FAB */}
      {/* <button
        className="quick-connect-fab"
        onClick={() => setQcOpen(true)}
        title="Quick Connect"
        aria-label="Quick Connect"
      >
        <i className="fa fa-bolt" />
      </button> */}
      {/* WHATSAPP QUICK CONNECT FAB */}
<button
  className="quick-connect-fab"
  onClick={() =>
    window.open(
      "https://wa.me/917744898605?text=Hello%20Zaid,%20I%20visited%20your%20portfolio",
      "_blank"
    )
  }
  title="Chat on WhatsApp"
  aria-label="Chat on WhatsApp"
>
  <img
    src="images/whatsapp.jpg"
    alt="WhatsApp"
    className="whatsapp-icon"
  />
</button>
      <QuickConnect open={qcOpen} onClose={() => setQcOpen(false)} />
    </>
  );
}
