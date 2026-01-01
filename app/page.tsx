"use client";

import React, { useEffect, useState, useRef } from "react";

type Theme = "light" | "dark";
type SkillCategory = "languages" | "frameworks" | "databases" | "tools" | "other";

export default function HomePage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [navOpen, setNavOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("languages");
  const [headerVisible, setHeaderVisible] = useState(true);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const lastScrollY = useRef(0);

  useEffect(() => {
    const stored =
      (typeof window !== "undefined" &&
        (window.localStorage.getItem("theme") as Theme | null)) ||
      null;
    const preferred: Theme =
      stored ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark");

    document.documentElement.setAttribute("data-theme", preferred);
    setTheme(preferred);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setHeaderVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setHeaderVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setHeaderVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("theme", next);
  };

  const closeNav = () => setNavOpen(false);

  return (
    <>
      <header className={`site-header ${headerVisible ? "visible" : "hidden"}`}>
        <div className="container header-inner">
          <a href="#hero" className="logo" aria-label="Go to top">
            <span className="logo-mark">SV</span>
            <span className="logo-text">
              Srinath<span> Venkataraman</span>
            </span>
          </a>

          <button
            className={`nav-toggle ${navOpen ? "nav-toggle--open" : ""}`}
            aria-label="Toggle navigation"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((o) => !o)}
          >
            <span />
            <span />
          </button>

          <nav
            className={`nav ${navOpen ? "nav--open" : ""}`}
            aria-label="Main navigation"
          >
            <ul onClick={closeNav}>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#skills">Skills</a>
              </li>
              <li>
                <a href="#experience">Experience</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#education">Education</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li className="theme-toggle-wrapper">
                <button
                  className="theme-toggle"
                  type="button"
                  aria-label="Toggle dark and light mode"
                  onClick={toggleTheme}
                >
                  <span className="theme-toggle-icon" aria-hidden="true">
                    {theme === "light" ? "☀" : "🌙"}
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="hero" className="section hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <h1>
                 <span className="accent">Srinath Venkataraman</span>
                
                <br />
                
              </h1>
              <p className="hero-subtitle">
                I build reliable software with a focus on simplicity and scale.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="btn btn-primary">
                  View projects
                </a>
                <a href="#contact" className="btn btn-ghost">
                  Contact me
                </a>
                <a
                  href="https://docs.google.com/document/d/17g95-5fZSwa6BCIcBTw7OCh4XtK8a1yJ/edit?usp=sharing"
                  className="btn btn-ghost btn-icon"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Resume</span>
                </a>
              </div>
            </div>

            <div className="hero-card">
              <div className="hero-tag">AT A GLANCE</div>
              <h2>Software Developer</h2>
              
              <ul className="hero-meta">
                <li>
                  <span className="meta-label">Experience</span>
                  <span className="meta-value">1.5+ years</span>
                </li>
                <li>
                  <span className="meta-label">Based in</span>
                  <span className="meta-value">Chennai, India</span>
                </li>
                <li>
                  <span className="meta-label">Interested in</span>
                  <span className="meta-value">
                    Web Development · AI · Cybersecurity
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <div className="container two-column">
            <div className="animate-on-scroll">
              <h2>About</h2>
              <p>
                I&apos;m a <strong>Software Developer</strong> who transforms complex challenges into
                elegant, scalable solutions. With hands-on experience building
                high-performance backends, RESTful APIs, and immersive web
                experiences, I bridge the gap between robust server-side logic
                and intuitive user interfaces.
              </p>
              <p>
                From optimizing data-heavy enterprise systems to crafting
                cutting-edge XR experiences, I thrive on pushing boundaries.
                Whether it&apos;s improving query performance or reducing
                manual operations, I&apos;m driven by measurable impact
                and clean, maintainable code.
              </p>
              
              {/* <div className="social-links">
                <a
                  href="https://github.com/srinathren"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  aria-label="GitHub"
                >
                  <span className="social-icon">🐙</span>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://leetcode.com/u/srinathren"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  aria-label="LeetCode"
                >
                  <span className="social-icon">⚡</span>
                  <span>LeetCode</span>
                </a>
                <a
                  href="mailto:srinathvenkataraman15@gmail.com"
                  className="social-link"
                  aria-label="Email"
                >
                  <span className="social-icon">✉️</span>
                  <span>Email</span>
                </a>
              </div> */}
            </div>
            <div className="about-highlight animate-on-scroll">
              <h3>What I bring</h3>
              <ul className="list-check">
                <li><strong>Microservices expertise</strong> — Designing scalable, distributed systems</li>
                <li><strong>Performance optimization</strong> — Delivering fast, efficient solutions</li>
                <li><strong>CI/CD mastery</strong> — Streamlining deployment workflows</li>
                <li><strong>XR innovation</strong> — Exploring the future of immersive web experiences</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section section-alt">
          <div className="container">
            <div className="animate-on-scroll">
              <h2>Technical Skills</h2>
              <p className="skills-subtitle">
                My expertise across various technologies and tools
              </p>
            </div>

            <div className="skills-tabs animate-on-scroll">
              <button
                className={`skill-tab ${activeCategory === "languages" ? "active" : ""}`}
                onClick={() => setActiveCategory("languages")}
              >
                Languages
              </button>
              <button
                className={`skill-tab ${activeCategory === "frameworks" ? "active" : ""}`}
                onClick={() => setActiveCategory("frameworks")}
              >
                Frameworks/Libraries
              </button>
              <button
                className={`skill-tab ${activeCategory === "databases" ? "active" : ""}`}
                onClick={() => setActiveCategory("databases")}
              >
                Databases
              </button>
              <button
                className={`skill-tab ${activeCategory === "tools" ? "active" : ""}`}
                onClick={() => setActiveCategory("tools")}
              >
                Tools &amp; Practices
              </button>
              <button
                className={`skill-tab ${activeCategory === "other" ? "active" : ""}`}
                onClick={() => setActiveCategory("other")}
              >
                Other
              </button>
            </div>

            <div className="skills-content animate-on-scroll">
              {activeCategory === "languages" && (
                <div className="skills-grid">
                  <div className="skill-item">
                    <span className="skill-icon">☕</span>
                    <span className="skill-name">Java</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-icon">🐍</span>
                    <span className="skill-name">Python</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-icon">📜</span>
                    <span className="skill-name">JavaScript</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-icon">📘</span>
                    <span className="skill-name">TypeScript</span>
                  </div>
                </div>
              )}

              {activeCategory === "frameworks" && (
                <div className="skills-grid">
                  <div className="skill-item">
                    <span className="skill-icon">🌱</span>
                    <span className="skill-name">Spring Boot</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-icon">🔷</span>
                    <span className="skill-name">Node.js</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-icon">🎨</span>
                    <span className="skill-name">Three.js</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-icon">🥽</span>
                    <span className="skill-name">WebXR</span>
                  </div>                  
                  <div className="skill-item">
                    <span className="skill-icon">🔗</span>
                    <span className="skill-name">Microservices</span>
                  </div>
                </div>
              )}

              {activeCategory === "databases" && (
                <div className="skills-grid">
                  <div className="skill-item">
                    <span className="skill-icon">🐘</span>
                    <span className="skill-name">PostgreSQL</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-icon">🍃</span>
                    <span className="skill-name">MongoDB</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-icon">🗄️</span>
                    <span className="skill-name">RDBMS</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-icon">📊</span>
                    <span className="skill-name">SQL</span>
                  </div>
                </div>
              )}

              {activeCategory === "tools" && (
                <div className="skills-grid">
                  <div className="skill-item">
                    <span className="skill-icon">🔀</span>
                    <span className="skill-name">Git</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-icon">📋</span>
                    <span className="skill-name">Jira</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-icon">📚</span>
                    <span className="skill-name">Confluence</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-icon">🔄</span>
                    <span className="skill-name">CI/CD</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-icon">🏃</span>
                    <span className="skill-name">Agile</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-icon">✅</span>
                    <span className="skill-name">Unit Testing</span>
                  </div>
                </div>
              )}


              {activeCategory === "other" && (
                <div className="skills-grid">
                  <div className="skill-item">
                    <span className="skill-icon">🔄</span>
                    <span className="skill-name">ETL Pipelines</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-icon">🤖</span>
                    <span className="skill-name">AI</span>
                  </div>
                  <div className="skill-item">
                    <span className="skill-icon">🔐</span>
                    <span className="skill-name">Cyber Security</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section">
          <div className="container">
            <h2 className="animate-on-scroll">Experience</h2>
            <div className="timeline">
              <article className="timeline-item animate-on-scroll">
                <header>
                  <div>
                    <h3>Software Development Engineer 1</h3>
                    <p className="timeline-meta">
                      Four Junctions · Chennai · Apr 2025 – Jun 2025
                    </p>
                  </div>
                </header>
                <p className="timeline-tags">
                  Node.js · Hub365 · MongoDB · ETL
                </p>
                <ul>
                  <li>
                    Built <strong>scalable Graph APIs</strong> using Node.js on the Hub365
                    low‑code platform, leveraging MongoDB aggregation pipelines to
                    accelerate product development and reduce delivery time.
                  </li>
                  <li>
                    Engineered <strong>robust ETL pipelines</strong> in Node.js with custom
                    transformations, automating CSV exports, database loads, and
                    email of manual data operations.
                  </li>
                </ul>
              </article>

              <article className="timeline-item">
                <header>
                  <div>
                    <h3>Software Analyst</h3>
                    <p className="timeline-meta">
                      Bounteous x Accolite · Chennai · Jun 2023 – Jul 2024
                    </p>
                  </div>
                </header>
                <p className="timeline-tags">
                  Spring Boot · PostgreSQL · CI/CD · Agile
                </p>
                <ul>
                  <li>
                    Built and optimized <strong>high-performance backend services</strong> and
                    PostgreSQL databases, contributing to CI/CD pipelines that improved team productivity.
                  </li>
                  <li>
                    Championed <strong>Agile methodologies</strong> across multiple projects,
                    establishing best practices that increased development velocity
                    and streamlined delivery processes.
                  </li>
                </ul>
              </article>

              <article className="timeline-item">
                <header>
                  <div>
                    <h3>Software Trainee</h3>
                    <p className="timeline-meta">
                      Bounteous x Accolite · Chennai · Jan 2023 – May 2023
                    </p>
                  </div>
                </header>
                <p className="timeline-tags">
                  React.js · Spring Boot · Node.js · Testing
                </p>
                <ul>
                  <li>
                    Contributed to <strong>React.js and Spring Boot</strong> projects with a
                    laser focus on comprehensive unit testing, reducing
                    post‑deployment issues and establishing a culture of
                    quality-first development.
                  </li>
                  <li>
                    Designed and implemented the <strong>complete backend infrastructure</strong>
                    for a travel planner application in Node.js, creating
                    well-tested APIs that improved response times
                    and enhanced user experience.
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section section-alt">
          <div className="container">
            <h2 className="animate-on-scroll">Projects</h2>
            <div className="card-grid">
              <article className="card project-card animate-on-scroll">
                <div className="card-header">
                  <h3>Sidara, Dar Group</h3>
                  <p className="badge">Node Js · MongoDB · Hub365</p>
                </div>
                <p>
                  <strong>Performance-driven architecture:</strong> Designed and optimized Graph APIs
                  using Node.js on the Hub365 platform, achieving faster 
                  query resolution speed through intelligent MongoDB aggregation pipelines.
                </p>
                <p>
                  <strong>Automation excellence:</strong> Built modular ETL flows with automated
                  CSV exports and email reports, dramatically reducing manual
                  data operations and improving developer productivity.
                </p>
              </article>

              <article className="card project-card animate-on-scroll">
                <div className="card-header">
                  <h3>Estimation Tool</h3>
                  <p className="badge">Spring Boot · PostgreSQL · NodeJs</p>
                </div>
                <p>
                  <strong>API optimization:</strong> Created and enhanced REST APIs for an
                  enterprise estimation platform, improving response times and scalability.
                </p>
                <p>
                  <strong>Quality leadership:</strong> Implemented comprehensive auditing with Hibernate Envers and spearheaded refactoring initiatives that boosted unit test coverage, ensuring long-term maintainability.
                </p>
              </article>

              <article className="card project-card animate-on-scroll">
                <div className="card-header">
                  <h3>Cavalry</h3>
                  <p className="badge">Three.js · Node Js · WebXR</p>
                </div>
                <p>
                  <strong>3D rendering mastery:</strong> Rendered highly optimized 3D models in
                  the browser, fine-tuning lighting, texturing, and materials
                  with Three.js to create stunning visual experiences.
                </p>
                <p>
                  <strong>Immersive innovation:</strong> Delivered cross-platform interactive VR
                  experiences that work seamlessly across multiple web browsers
                  and VR headsets, pushing the boundaries of WebXR technology.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="section">
          <div className="container">
            <h2 className="animate-on-scroll">Education</h2>
            <article className="education-card animate-on-scroll">
              <h3>Bachelor of Engineering</h3>
              <p className="education-meta">
                Thiagarajar College of Engineering · Madurai, Tamil Nadu
              </p>
              <p className="education-meta">2019 – 2023 · Computer Science and Engineering</p>
            </article>
            <article className="education-card animate-on-scroll">
            <h3> SSLC · HSC</h3>
            <p className="education-meta">
              CEOA · Madurai, Tamil Nadu
            </p>
            <p className="education-meta">2016 – 2019 · PCMC</p>
          </article>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section section-alt">
          <div className="container two-column">
            <div className="animate-on-scroll">
              <h2>Contact</h2>
              <p>
                 Always happy to chat about tech, share ideas,
                or just say hello!
              </p>
            </div>
            {/* <div className="contact-actions">
              <a
                className="contact-link"
                href="mailto:srinathvenkataraman15@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <span>Email</span>
                <span className="contact-link-sub">
                  srinathvenkataraman15@gmail.com
                </span>
              </a>
              <div className="contact-grid">
                <a
                  className="contact-pill"
                  href="https://github.com/srinathren"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                >
                  <span>GitHub</span>
                  <span className="contact-pill-sub">
                    github.com/srinathren
                  </span>
                </a>
              </div>
            </div> */}
            <div className="social-links">
                <a
                  href="https://github.com/srinathren"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  aria-label="GitHub"
                >
                  <span className="social-icon">🐙</span>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://leetcode.com/u/Srinath_Venkataraman/"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  aria-label="LeetCode"
                >
                  <span className="social-icon">⚡</span>
                  <span>LeetCode</span>
                </a>
                <a
                  className="social-link"
                  aria-label="Email"
                >
                  <span className="social-icon">✉️</span>
                  <span>Email</span> srinathvenkataraman15@gmail.com
                </a>
              </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>
            © {new Date().getFullYear()} Srinath Venkataraman.
          </p>
          
        </div>
      </footer>
    </>
  );
}


