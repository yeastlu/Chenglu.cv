import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  Plus,
  X,
  Menu,
  Download,
} from "lucide-react";
import { content, Language } from "./content";
import "./index.css";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const targets = ["work", "practice", "experience", "contact"];
const imageDimensions: Record<string, [number, number]> = {
  portrait: [1280, 1920],
  "global-activation": [1440, 1080],
  travel: [1440, 938],
  mountains: [986, 552],
  tibet: [1440, 1080],
  adquan: [1440, 810],
  soul: [1200, 900],
};
type Preview = { src: string; alt: string };

function initialLanguage(): Language {
  const query = new URLSearchParams(window.location.search).get("lang");
  if (query === "en" || query === "zh") return query;
  try {
    return localStorage.getItem("portfolio-language") === "en" ? "en" : "zh";
  } catch {
    return "zh";
  }
}

function Photo({
  name,
  alt,
  eager = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
}: {
  name: string;
  alt: string;
  eager?: boolean;
  sizes?: string;
}) {
  const [width, height] = imageDimensions[name];
  return (
    <img
      width={width}
      height={height}
      src={asset(`images/${name}-960.webp`)}
      srcSet={[480, 960, 1440]
        .map(
          (w) => `${asset(`images/${name}-${w}.webp`)} ${Math.min(w, width)}w`,
        )
        .join(", ")}
      sizes={sizes}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
    />
  );
}

function App() {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [preview, setPreview] = useState<Preview | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const c = content[language];

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = c.meta;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", c.description);
    try {
      localStorage.setItem("portfolio-language", language);
    } catch {
      /* Language still works without storage. */
    }
    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    window.history.replaceState(null, "", url);
  }, [language, c]);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    elements.forEach((el) => {
      el.classList.add("will-reveal");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!preview) return;
    const previousOverflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [preview]);

  const openPhoto = (name: string, alt: string) =>
    setPreview({ src: asset(`images/${name}-1440.webp`), alt });
  const closePreview = () => {
    dialog.current?.close();
    setPreview(null);
  };

  return (
    <>
      <a className="skip-link" href="#main">
        {c.skip}
      </a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Cheng Lu · Home">
          cheng lu<span className="brand-dot">.</span>
          <span className="wordmark-cn">程璐</span>
        </a>
        <nav
          className="desktop-nav"
          aria-label={language === "zh" ? "主导航" : "Main navigation"}
        >
          {c.nav.map((label, i) => (
            <a key={targets[i]} href={`#${targets[i]}`}>
              {label}
              {i === 3 && <ArrowUpRight size={14} />}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <div
            className="language-switch"
            aria-label={language === "zh" ? "语言" : "Language"}
          >
            <button
              lang="zh-CN"
              aria-pressed={language === "zh"}
              onClick={() => setLanguage("zh")}
            >
              中
            </button>
            <span>/</span>
            <button
              lang="en"
              aria-pressed={language === "en"}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>
          <button
            className="menu-toggle icon-button"
            aria-label={menuOpen ? c.close : c.menu}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <nav
          id="mobile-nav"
          className="mobile-nav"
          hidden={!menuOpen}
          aria-label={c.menu}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setMenuOpen(false);
              document
                .querySelector<HTMLButtonElement>(".menu-toggle")
                ?.focus();
            }
          }}
        >
          {c.nav.map((label, i) => (
            <a
              key={targets[i]}
              href={`#${targets[i]}`}
              onClick={() => setMenuOpen(false)}
            >
              <span>0{i + 1}</span>
              {label}
              <ArrowUpRight size={20} />
            </a>
          ))}
        </nav>
      </header>

      <main id="main">
        <section id="top" className="hero page-width">
          <div className="hero-copy">
            <p className="eyebrow hero-enter">{c.eyebrow}</p>
            <h1 className="hero-enter">
              {c.headline[0]}
              <br />
              <span>{c.headline[1]}</span>
            </h1>
            <p className="hero-intro hero-enter">{c.intro}</p>
            <p className="hero-bio hero-enter">{c.bio}</p>
            <div className="hero-links hero-enter">
              <a className="button button-dark" href="#work">
                {c.explore}
                <ArrowDown size={17} />
              </a>
              <a
                className="text-link"
                href={asset("downloads/Cheng-Lu-Resume-CN.pdf")}
                download
              >
                {c.resume}
                <Download size={16} />
              </a>
            </div>
            <div className="hero-tags hero-enter">
              {c.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <figure className="portrait hero-enter">
            <div className="portrait-image">
              <Photo
                name="portrait"
                alt={c.portrait}
                eager
                sizes="(max-width: 700px) 90vw, (max-width: 1100px) 38vw, 420px"
              />
              <span className="portrait-mark" aria-hidden="true">
                cl.
              </span>
            </div>
            <figcaption>
              <span>{c.portraitNote}</span>
              <span className="handwritten">Cheng Lu</span>
            </figcaption>
          </figure>
          <div className="hero-bottom">
            <span className="eyebrow">{c.location}</span>
            <span className="eyebrow">BRANDS. PEOPLE. POSSIBILITIES.</span>
          </div>
        </section>
        <div className="stats page-width reveal">
          {c.stats.map(([number, label]) => (
            <div key={number}>
              <strong>{number}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <section className="focus-section section-space" id="focus">
          <div className="page-width">
            <div className="section-heading reveal">
              <p className="eyebrow">{c.focusLabel}</p>
              <span className="status">
                <i />
                {c.focusYear}
              </span>
            </div>
            <div className="focus-layout">
              <figure className="focus-photo reveal">
                <button
                  className="image-button"
                  onClick={() => openPhoto("global-activation", c.focusAlt)}
                  aria-label={`${c.enlarge}: ${c.focusAlt}`}
                >
                  <Photo name="global-activation" alt={c.focusAlt} />
                  <span className="expand-icon">
                    <ArrowUpRight size={20} />
                  </span>
                </button>
                <figcaption>{c.focusCaption}</figcaption>
              </figure>
              <div className="focus-copy reveal">
                <h2>
                  {c.focusTitle[0]}
                  <br />
                  <em>{c.focusTitle[1]}</em>
                </h2>
                <p>{c.focusIntro}</p>
                <div className="focus-services">
                  {c.focusSteps.map(([title, description], i) => (
                    <div key={title}>
                      <span className="service-number">0{i + 1}</span>
                      <div>
                        <h3>{title}</h3>
                        <p>{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="work-section section-space page-width">
          <div className="section-intro reveal">
            <p className="eyebrow">{c.workLabel}</p>
            <h2>{c.workTitle}</h2>
            <p>{c.workIntro}</p>
          </div>
          <div className="project-grid">
            {c.projects.map((project, i) => (
              <article
                className={`project reveal project-${project.id}`}
                id={`project-${project.id}`}
                key={project.id}
              >
                {project.image ? (
                  <button
                    className="project-image image-button"
                    aria-label={`${c.enlarge}: ${project.alt}`}
                    onClick={() => openPhoto(project.image, project.alt)}
                  >
                    <Photo name={project.image} alt={project.alt} />
                    <span className="image-index">
                      0{i + 1} / {project.client}
                    </span>
                    <span className="expand-icon">
                      <ArrowUpRight size={20} />
                    </span>
                  </button>
                ) : (
                  <div
                    className="campaign-art"
                    role="img"
                    aria-label={
                      language === "zh"
                        ? "和路雪案例数据排版：100+ 达人，4 类内容，1000 万+品牌话题曝光"
                        : "Wall’s campaign: 100+ creators, 4 categories, 10M+ brand-topic views"
                    }
                  >
                    <span className="image-index">02 / {project.client}</span>
                    <span className="campaign-label">
                      THE POWER OF A<br />
                      BETTER STORY.
                    </span>
                    <strong>
                      10M<span>+</span>
                    </strong>
                    <div className="campaign-bottom">
                      <span>100+ CREATORS</span>
                      <span>4 CATEGORIES</span>
                      <ArrowUpRight size={30} />
                    </div>
                  </div>
                )}
                <div className="project-meta">
                  <span>{project.category}</span>
                  <span>0{i + 1}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-result">
                  <strong>{project.metric}</strong>
                  <span>{project.metricLabel}</span>
                </div>
                <details className="project-details">
                  <summary>
                    {c.projectDetail}
                    <Plus size={18} />
                  </summary>
                  <p>{project.detail}</p>
                </details>
              </article>
            ))}
          </div>
        </section>

        <section className="practice-section section-space" id="practice">
          <div className="page-width practice-layout">
            <div className="practice-copy reveal">
              <p className="eyebrow">{c.aiLabel}</p>
              <h2>
                {c.aiTitle[0]}
                <br />
                <em>{c.aiTitle[1]}</em>
              </h2>
              <p className="practice-intro">{c.aiIntro}</p>
              <ol className="practice-steps">
                {c.aiSteps.map(([title, description], i) => (
                  <li key={title}>
                    <span>0{i + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="notebook reveal">
              <div className="notebook-header">
                <span className="eyebrow">{c.notebook}</span>
                <span aria-hidden="true">↗</span>
              </div>
              <h3>{c.question}</h3>
              <p>{c.notebookIntro}</p>
              <div className="product-flow">
                {c.flow.map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <p>{value}</p>
                  </div>
                ))}
              </div>
              <p className="notebook-note">{c.aiNote}</p>
              <a className="text-link" href="#project-travel">
                {c.aiLink}
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>

        <section
          id="experience"
          className="section-space page-width experience-section"
        >
          <div className="section-intro reveal">
            <p className="eyebrow">{c.experienceLabel}</p>
            <h2>{c.experienceTitle}</h2>
            <p>{c.experienceIntro}</p>
          </div>
          <div className="career-layout">
            <div className="career-list">
              {c.experience.map(([date, org, role, description], i) => (
                <details
                  className="career-row reveal"
                  key={org}
                  open={i === 0 ? true : undefined}
                >
                  <summary>
                    <span className="career-date">{date}</span>
                    <span className="career-heading">
                      <strong>{org}</strong>
                      <span>{role}</span>
                    </span>
                    <Plus size={20} />
                  </summary>
                  <p>{description}</p>
                </details>
              ))}
            </div>
            <aside className="education reveal">
              <p className="eyebrow">{c.educationLabel}</p>
              {c.education.map(([date, school, degree, description]) => (
                <div className="education-item" key={school}>
                  <span>{date}</span>
                  <h3>{school}</h3>
                  <p>{degree}</p>
                  {description && (
                    <p className="education-note">{description}</p>
                  )}
                </div>
              ))}
              <div className="about-note">
                <span aria-hidden="true">✳</span>
                <h3>{c.aboutTitle}</h3>
                <p>{c.about}</p>
              </div>
            </aside>
          </div>
        </section>

        <footer id="contact" className="contact-section">
          <div className="page-width">
            <p className="eyebrow reveal">{c.contactLabel}</p>
            <div className="contact-layout">
              <div className="reveal">
                <h2>
                  {c.contactTitle[0]}
                  <br />
                  <em>{c.contactTitle[1]}</em>
                </h2>
                <p>{c.contactIntro}</p>
              </div>
              <a
                className="contact-arrow"
                href="mailto:louise9406@163.com"
                aria-label={c.email}
              >
                <ArrowUpRight strokeWidth={1} />
              </a>
            </div>
            <div className="contact-links">
              <a href="mailto:louise9406@163.com">
                louise9406@163.com
                <ArrowUpRight size={18} />
              </a>
              <a href="tel:+8615601728406">
                +86 156 0172 8406
                <ArrowUpRight size={18} />
              </a>
              <button
                onClick={() =>
                  setPreview({
                    src: asset("images/wechat-600.webp"),
                    alt: c.wechatAlt,
                  })
                }
              >
                {c.wechat}
                <ArrowUpRight size={18} />
              </button>
              <a href={asset("downloads/Cheng-Lu-Resume-CN.pdf")} download>
                {c.resume}
                <Download size={17} />
              </a>
            </div>
            <div className="footer-bottom">
              <a className="wordmark" href="#top">
                cheng lu<span className="brand-dot">.</span>
              </a>
              <span>© 2026 CHENG LU · {c.footer}</span>
              <a href="#top">
                {c.top}
                <ArrowUp size={15} />
              </a>
            </div>
          </div>
        </footer>
      </main>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={preview?.alt}
        onClose={() => setPreview(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closePreview();
        }}
      >
        {preview && (
          <div className="lightbox-content">
            <button
              className="lightbox-close icon-button"
              onClick={closePreview}
              aria-label={c.close}
              autoFocus
            >
              <X />
            </button>
            <img src={preview.src} alt={preview.alt} />
            <p>{preview.alt}</p>
          </div>
        )}
      </dialog>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
