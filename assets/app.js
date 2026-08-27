import { content } from "./content.js";
import { contact, site } from "./config.js";
import { projects } from "./projects.js";

const locale = document.body.dataset.locale === "ar" ? "ar" : "en";
const c = content[locale];
const otherLocale = locale === "ar" ? "en" : "ar";
const app = document.querySelector("#app");
const icon = (name) => `<span class="icon icon-${name}" aria-hidden="true"></span>`;
const logoAssets = {
  en: { dark: "../assets/logos/caprice-en-on-dark.svg", light: "../assets/logos/caprice-en-on-light.svg" },
  ar: { dark: "../assets/logos/caprice-ar-on-dark.svg", light: "../assets/logos/caprice-ar-on-light.svg" },
};
const logoLockup = (className) => `<span class="logo-lockup ${className}" aria-hidden="true"><img class="logo-on-dark" src="${logoAssets[locale].dark}" alt="" width="1580" height="470" /><img class="logo-on-light" src="${logoAssets[locale].light}" alt="" width="1580" height="470" /></span>`;
const lines = (values) => values.map((line) => `<span>${line}</span>`).join("");
const paragraphs = (values) => values.map((value) => `<p>${value}</p>`).join("");
const navLinks = Object.entries(c.nav).map(([id, label]) => `<a href="#${id}">${label}</a>`).join("");
const mobileNavLinks = Object.entries(c.nav).map(([id, label], index) => `<a href="#${id}"><span>0${index + 1}</span><strong>${label}</strong>${icon("arrow")}</a>`).join("");

function sectionHead(label, title, intro = "") {
  const heading = Array.isArray(title) ? lines(title) : title;
  return `<div class="section-head reveal"><p class="section-label"><span></span>${label}</p><h2>${heading}</h2>${intro ? `<p class="section-intro">${intro}</p>` : ""}</div>`;
}

function render() {
  const socialLinks = [
    [contact.instagramUrl, c.footer.social.instagram, "instagram"],
    [`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`, c.footer.social.whatsapp, "whatsapp"],
    [`mailto:${contact.email}`, c.footer.social.email, "email"],
    ...(contact.facebookUrl ? [[contact.facebookUrl, c.footer.social.facebook, "facebook"]] : []),
  ];

  app.innerHTML = `
    <div class="grain" aria-hidden="true"></div>
    <div class="intro" data-intro aria-hidden="true">
      <button class="intro-skip" type="button" data-skip-intro>${c.ui.skipIntro}</button>
      <div class="intro-mark"><img class="intro-symbol" src="../assets/logos/caprice-mark-dark.svg" alt="" width="900" height="960" /><i></i><em>${c.intro.line}</em></div>
    </div>
    <header class="site-header" data-header>
      <a class="brand" href="#top" aria-label="${c.brand}">${logoLockup("header-logo")}</a>
      <nav class="desktop-nav" aria-label="${c.ui.menu}">${navLinks}</nav>
      <div class="header-tools">
        <a class="language-link" href="../${otherLocale}/${location.hash}" data-language>${c.otherLocale}</a>
        <button class="icon-button" type="button" data-theme-toggle aria-label="${c.ui.theme}">${icon("theme")}</button>
        <button class="menu-button" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu"><span>${c.ui.menu}</span>${icon("menu")}</button>
      </div>
    </header>
    <div class="mobile-menu" id="mobile-menu" data-mobile-menu hidden>
      <img class="mobile-menu-art" src="../assets/logos/caprice-mark-dark.svg" alt="" width="900" height="960" aria-hidden="true" />
      <div class="mobile-menu-top">${logoLockup("menu-logo")}<button class="icon-button" type="button" data-menu-close aria-label="${c.ui.close}">${icon("close")}</button></div>
      <p class="mobile-menu-label">${c.ui.menu}</p>
      <nav aria-label="${c.ui.menu}">${mobileNavLinks}</nav>
      <div class="mobile-menu-bottom">
        <a class="button button-primary" href="#contact">${c.hero.secondary}${icon("arrow")}</a>
        <p class="mobile-menu-note">${c.intro.line}</p>
        <div class="mobile-menu-tools">
          <a href="../${otherLocale}/${location.hash}" data-language>${c.otherLocale}</a>
          <button type="button" data-theme-toggle>${icon("theme")}<span>${c.ui.theme}</span></button>
        </div>
      </div>
    </div>

    <main id="main">
      <section class="hero" id="top" aria-labelledby="hero-title">
        <div class="hero-glow" aria-hidden="true"></div>
        <div class="hero-grid" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
        <div class="hero-content">
          <p class="eyebrow reveal">${c.hero.eyebrow}</p>
          <h1 id="hero-title" class="reveal">${lines(c.hero.title)}</h1>
          <p class="hero-copy reveal">${c.hero.body}</p>
          <div class="hero-actions reveal"><a class="button button-primary" href="#house">${c.hero.primary}${icon("arrow")}</a><a class="button button-ghost" href="#contact">${c.hero.secondary}</a></div>
        </div>
        <a class="scroll-cue" href="#house"><span>${c.hero.scroll}</span><i></i></a>
      </section>

      <section class="section house" id="house">
        ${sectionHead(c.house.label, c.house.title)}
        <div class="house-body reveal"><div class="prose">${paragraphs(c.house.body)}</div><blockquote>${c.house.quote}</blockquote></div>
      </section>

      <section class="section why" id="why">
        ${sectionHead(c.why.label, c.why.title, c.why.intro)}
        <div class="duality">
          ${c.why.sides.map((side, index) => `<article class="dual-card reveal"><p class="card-index">0${index + 1} / ${side.kicker}</p><h3>${side.title}</h3><p>${side.body}</p><ul aria-label="${side.title}">${side.keywords.map((word) => `<li>${word}</li>`).join("")}</ul></article>`).join("")}
        </div>
        <blockquote class="wide-quote reveal">${c.why.closing}</blockquote>
      </section>

      <section class="section capabilities" id="capabilities">
        ${sectionHead(c.capabilities.label, c.capabilities.title, c.capabilities.intro)}
        <div class="capability-list">
          ${c.capabilities.items.map((item, index) => `<article class="capability reveal"><span class="number">0${index + 1}</span><div><h3>${item.title}</h3><p>${item.body}</p><ul>${item.includes.map((entry) => `<li>${entry}</li>`).join("")}</ul></div></article>`).join("")}
        </div>
        <p class="closing-line reveal">${c.capabilities.closing}</p>
      </section>

      <section class="section philosophy" id="philosophy">
        ${sectionHead(c.philosophy.label, c.philosophy.title, c.philosophy.intro)}
        <ol class="process">
          ${c.philosophy.steps.map((step, index) => `<li class="reveal"><span class="process-node"><i></i>0${index + 1}</span><div><h3>${step.title}</h3><p>${step.body}</p></div></li>`).join("")}
        </ol>
        <blockquote class="wide-quote reveal">${c.philosophy.quote}</blockquote>
      </section>

      <section class="section archive" id="archive">
        <div class="archive-frame reveal">
          <div class="archive-status"><span class="pulse"></span>${c.archive.status}</div>
          ${sectionHead(c.archive.label, c.archive.title)}
          <div class="archive-copy">${paragraphs(c.archive.body)}</div>
          <a class="text-link" href="${contact.instagramUrl}" target="_blank" rel="noopener noreferrer">${c.archive.cta}${icon("arrow")}</a>
          <div class="archive-count" aria-hidden="true">${String(projects.length).padStart(2, "0")}</div>
        </div>
      </section>

      <section class="section vision" id="vision">
        ${sectionHead(c.vision.label, c.vision.title)}
        <p class="vision-lead reveal">${c.vision.lead}</p>
        <div class="vision-body reveal">${paragraphs(c.vision.body)}</div>
        <blockquote class="vision-closing reveal">${lines(c.vision.closing)}</blockquote>
      </section>

      <section class="section contact" id="contact">
        <div class="contact-intro">
          ${sectionHead(c.contact.label, c.contact.title, c.contact.body)}
          <a class="button button-primary" href="https://wa.me/${contact.whatsapp.replace(/\D/g, "")}" target="_blank" rel="noopener noreferrer">${c.contact.whatsapp}${icon("arrow")}</a>
          <div class="direct-contact"><a href="tel:${contact.whatsapp}">${contact.phoneDisplay}</a><a href="mailto:${contact.email}">${contact.email}</a><a href="${contact.instagramUrl}" target="_blank" rel="noopener noreferrer">${contact.instagramHandle}</a></div>
        </div>
        <form class="project-form reveal" data-contact-form novalidate>
          <h3>${c.contact.formTitle}</h3>
          <p class="form-note">${c.ui.emailFallback}</p>
          <div class="field"><label for="name">${c.contact.fields.name} <span>${c.ui.required}</span></label><input id="name" name="name" autocomplete="name" required /></div>
          <div class="field"><label for="brand">${c.contact.fields.brand} <span>${c.ui.optional}</span></label><input id="brand" name="brand" autocomplete="organization" /></div>
          <div class="field"><label for="reply">${c.contact.fields.contact} <span>${c.ui.required}</span></label><input id="reply" name="reply" autocomplete="email" required /></div>
          <div class="field"><label for="need">${c.contact.fields.need} <span>${c.ui.required}</span></label><select id="need" name="need" required><option value=""></option>${c.contact.needs.map((v) => `<option>${v}</option>`).join("")}</select></div>
          <div class="field field-wide"><label for="details">${c.contact.fields.details} <span>${c.ui.required}</span></label><textarea id="details" name="details" rows="5" required></textarea></div>
          <fieldset class="field-wide"><legend>${c.contact.fields.preferred}</legend><div class="radio-row">${c.contact.preferences.map((v, i) => `<label><input type="radio" name="preferred" value="${v}" ${i === 0 ? "checked" : ""}/><span>${v}</span></label>`).join("")}</div></fieldset>
          <button class="button button-primary field-wide" type="submit">${c.contact.submit}${icon("arrow")}</button>
          <p class="form-status field-wide" data-form-status role="status" aria-live="polite"></p>
        </form>
      </section>
    </main>

    <footer class="footer">
      <div class="footer-brand">${logoLockup("footer-logo")}<p>${c.footer.line}</p></div>
      <nav aria-label="${c.ui.menu}">${navLinks}</nav>
      <div class="footer-social">${socialLinks.map(([url, label]) => `<a href="${url}" ${url.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}>${label}</a>`).join("")}</div>
      <div class="footer-bottom"><p>© <span data-year></span> ${c.brand}. ${c.footer.rights}</p><div><a href="../${otherLocale}/" data-language>${c.otherLocale}</a><button type="button" data-theme-toggle>${c.ui.theme}</button></div></div>
    </footer>`;
}

function initTheme() {
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => button.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("caprice-theme", next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#151617" : "#F1EDE3");
  }));
}

function initMenu() {
  const menu = document.querySelector("[data-mobile-menu]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const close = document.querySelector("[data-menu-close]");
  let previousFocus;
  let closeTimer;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const setOpen = (open) => {
    clearTimeout(closeTimer);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
    if (open) {
      previousFocus = document.activeElement;
      menu.hidden = false;
      requestAnimationFrame(() => {
        menu.classList.add("is-open");
        close.focus({ preventScroll: true });
      });
    } else {
      menu.classList.remove("is-open");
      previousFocus?.focus({ preventScroll: true });
      closeTimer = setTimeout(() => { menu.hidden = true; }, reducedMotion ? 0 : 620);
    }
  };
  toggle.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
  close.addEventListener("click", () => setOpen(false));
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (event) => {
    if (menu.hidden || !menu.classList.contains("is-open")) return;
    if (event.key === "Escape") setOpen(false);
    if (event.key !== "Tab") return;
    const focusable = [...menu.querySelectorAll("a, button")];
    const first = focusable[0]; const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
}

function initIntro() {
  const intro = document.querySelector("[data-intro]");
  if (sessionStorage.getItem("caprice-intro") || matchMedia("(prefers-reduced-motion: reduce)").matches) { intro.remove(); return; }
  intro.setAttribute("aria-hidden", "false");
  const dismiss = () => { intro.classList.add("is-done"); sessionStorage.setItem("caprice-intro", "seen"); setTimeout(() => intro.remove(), 700); };
  intro.querySelector("[data-skip-intro]").addEventListener("click", dismiss);
  setTimeout(dismiss, 2200);
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) { items.forEach((el) => el.classList.add("is-visible")); return; }
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.08, rootMargin: "0px 0px -8%" });
  items.forEach((item) => observer.observe(item));
}

function initForm() {
  const form = document.querySelector("[data-contact-form]");
  const status = form.querySelector("[data-form-status]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); status.textContent = c.ui.invalid; return; }
    const data = new FormData(form);
    const body = [c.contact.formTitle, "", ...["name", "brand", "reply", "need", "details", "preferred"].map((key) => `${form.elements[key]?.labels?.[0]?.textContent?.trim() || key}: ${data.get(key) || "—"}`)].join("\n");
    status.textContent = c.contact.success;
    location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`${c.contact.formTitle} — ${data.get("name")}`)}&body=${encodeURIComponent(body)}`;
  });
}

function initLanguageLinks() {
  document.querySelectorAll("[data-language]").forEach((link) => link.addEventListener("click", () => { link.href = `../${otherLocale}/${location.hash}`; }));
}

render();
document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
initTheme(); initMenu(); initIntro(); initReveal(); initForm(); initLanguageLinks();

if (location.hash) {
  const restoreSection = () => {
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    document.querySelector(location.hash)?.scrollIntoView({ block: "start" });
    document.documentElement.style.scrollBehavior = previous;
  };
  requestAnimationFrame(restoreSection);
  document.fonts?.ready.then(restoreSection);
}

if (site.productionOrigin) {
  const canonical = document.createElement("link");
  canonical.rel = "canonical";
  canonical.href = `${site.productionOrigin}/${locale}/`;
  document.head.append(canonical);
}
