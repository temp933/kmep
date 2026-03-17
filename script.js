class KmepHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<style>
  /* ── Scoped reset ───────────────────────────────────── */
  kmep-header *, kmep-header *::before, kmep-header *::after {
    box-sizing: border-box; margin: 0; padding: 0;
  }

  /* ── Tokens ─────────────────────────────────────────── */
  :root {
    --kh-navy:   #0c1e35;
    --kh-blue:   #1558b0;
    --kh-blue2:  #1a6fd4;
    --kh-sky:    #0ea5e9;
    --kh-teal:   #0d9488;
    --kh-off:    #f7f9fc;
    --kh-off2:   #eef2f7;
    --kh-slate:  #5a6a7e;
    --kh-muted:  #94a3b8;
    --kh-border: #dde4ed;
    --kh-h:      76px;
  }

  /* ── Bar ─────────────────────────────────────────────── */
  .kh-bar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    height: var(--kh-h);
    background: transparent;
    transition: background .35s ease, box-shadow .35s ease;
  }
  .kh-bar.scrolled {
    background: rgba(255,255,255,0.97);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    box-shadow: 0 1px 0 var(--kh-border), 0 4px 28px rgba(12,30,53,0.08);
  }

  /* ── Inner ───────────────────────────────────────────── */
  .kh-inner {
    max-width: 1240px; margin: 0 auto; padding: 0 48px;
    height: 100%; display: flex; align-items: center; gap: 4px;
  }

  /* ── Logo ────────────────────────────────────────────── */
  .kh-logo {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none; flex-shrink: 0; margin-right: 12px;
  }
  .kh-logo img {
    width: 40px; height: 40px; border-radius: 8px; object-fit: contain;
  }
  .kh-logo-text {
    font-family: "Outfit", sans-serif;
    font-weight: 800; font-size: 20px; letter-spacing: 3px;
    background: linear-gradient(90deg, #fff 0%, #93c5fd 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    white-space: nowrap; line-height: 1;
  }
  .kh-bar.scrolled .kh-logo-text {
    background: linear-gradient(90deg, var(--kh-navy) 0%, var(--kh-blue2) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }

  /* ── Desktop nav ─────────────────────────────────────── */
  .kh-nav {
    display: flex; align-items: stretch; gap: 2px; flex: 1;
    height: 100%;
  }

  /* Plain link */
  .kh-link {
    display: flex; align-items: center; gap: 5px;
    padding: 0 14px; border-radius: 0;
    font-family: "Outfit", sans-serif;
    font-size: 15px; font-weight: 600;
    color: rgba(255,255,255,0.82);
    text-decoration: none; white-space: nowrap;
    transition: color .2s; cursor: pointer;
    border: none; background: none; height: 100%;
    position: relative;
  }
  .kh-link::after {
    content: ""; position: absolute; bottom: 0; left: 14px; right: 14px; height: 2px;
    background: var(--kh-sky); border-radius: 2px 2px 0 0;
    transform: scaleX(0); transition: transform .25s;
  }
  .kh-link:hover::after { transform: scaleX(1); }
  .kh-link:hover { color: #fff; }
  .kh-bar.scrolled .kh-link { color: var(--kh-slate); }
  .kh-bar.scrolled .kh-link:hover { color: var(--kh-navy); }

  .kh-chev {
    font-size: 9px; opacity: .5; flex-shrink: 0;
    transition: transform .25s, opacity .25s;
  }

  /* ── Dropdown wrapper ────────────────────────────────── */
  .kh-dd { position: relative; display: flex; align-items: stretch; height: 100%; }
  .kh-dd:hover > .kh-link .kh-chev { transform: rotate(180deg); opacity: 1; }

  /* ── Mega panel ──────────────────────────────────────── */
  .kh-panel {
    position: absolute;
    top: calc(100% + 2px); left: 50%;
    transform: translateX(-50%) translateY(8px);
    min-width: 480px; background: #fff;
    border-radius: 14px; border: 1px solid var(--kh-border);
    box-shadow: 0 20px 64px rgba(12,30,53,0.13);
    padding: 20px 20px 16px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 4px;
    opacity: 0; visibility: hidden; pointer-events: none;
    transition: opacity .2s ease, transform .2s ease, visibility .2s;
    z-index: 200;
  }
  .kh-dd:hover .kh-panel {
    opacity: 1; visibility: visible; pointer-events: auto;
    transform: translateX(-50%) translateY(0);
  }
  /* Caret */
  .kh-panel::before {
    content: ""; position: absolute;
    top: -7px; left: 50%; transform: translateX(-50%);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 7px solid var(--kh-border);
  }
  .kh-panel::after {
    content: ""; position: absolute;
    top: -6px; left: 50%; transform: translateX(-50%);
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 6px solid #fff;
  }

  /* Section label */
  .kh-panel-label {
    grid-column: 1 / -1;
    font-family: "Outfit", sans-serif;
    font-size: 10px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: var(--kh-muted);
    padding: 0 12px 8px; border-bottom: 1px solid var(--kh-border);
    margin-bottom: 8px;
  }

  /* Panel item */
  .kh-pitem {
    display: flex; align-items: flex-start; gap: 13px;
    padding: 12px 12px; border-radius: 10px;
    text-decoration: none; cursor: pointer;
    transition: background .18s;
  }
  .kh-pitem:hover { background: var(--kh-off2); }
  .kh-pitem-ico {
    width: 38px; height: 38px; border-radius: 9px; flex-shrink: 0;
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; color: var(--kh-blue);
    transition: background .2s, color .2s;
  }
  .kh-pitem:hover .kh-pitem-ico {
    background: linear-gradient(135deg, var(--kh-blue), var(--kh-blue2));
    color: #fff;
  }
  .kh-pitem-title {
    font-family: "Outfit", sans-serif;
    font-size: 13.5px; font-weight: 700; color: var(--kh-navy);
    margin-bottom: 2px; line-height: 1.3;
  }
  .kh-pitem-sub {
    font-family: "Outfit", sans-serif;
    font-size: 12px; color: var(--kh-muted); line-height: 1.45;
  }

  /* ── Right CTA ───────────────────────────────────────── */
  .kh-right {
    display: flex; align-items: center; gap: 8px;
    margin-left: auto; flex-shrink: 0;
  }
  .kh-cta {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--kh-sky); color: #fff;
    padding: 10px 22px; border-radius: 9px;
    font-family: "Outfit", sans-serif;
    font-size: 14px; font-weight: 700;
    text-decoration: none; white-space: nowrap;
    border: none; cursor: pointer;
    transition: background .2s, transform .2s, box-shadow .2s;
  }
  .kh-cta:hover {
    background: #0284c7; transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(14,165,233,0.38);
  }

  /* ── Hamburger ───────────────────────────────────────── */
  .kh-ham {
    display: none; flex-direction: column; align-items: center; justify-content: center;
    width: 40px; height: 40px; border-radius: 8px;
    gap: 5px; cursor: pointer; margin-left: auto;
    background: transparent; border: none; padding: 0; flex-shrink: 0;
  }
  .kh-ham span {
    display: block; width: 22px; height: 2px;
    background: #fff; border-radius: 2px; transition: all .3s;
  }
  .kh-bar.scrolled .kh-ham span { background: var(--kh-navy); }
  .kh-ham.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .kh-ham.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .kh-ham.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* ── Mobile drawer ───────────────────────────────────── */
  .kh-drawer {
    display: none; position: fixed;
    top: var(--kh-h); left: 0; right: 0; bottom: 0;
    background: #fff; z-index: 999;
    padding: 0 0 48px;
    flex-direction: column; overflow-y: auto;
    border-top: 1px solid var(--kh-border);
  }
  .kh-drawer.open { display: flex; }

  .kh-dr-link {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 24px; border-bottom: 1px solid var(--kh-border);
    font-family: "Outfit", sans-serif;
    font-size: 16px; font-weight: 600; color: var(--kh-navy);
    text-decoration: none; cursor: pointer;
    transition: color .2s, background .2s;
    background: none; border-left: none; border-right: none; border-top: none; width: 100%;
  }
  .kh-dr-link:hover { color: var(--kh-blue); background: var(--kh-off2); }
  .kh-dr-link .kh-chev { color: var(--kh-muted); font-size: 11px; transition: transform .25s; }

  /* Accordion sub */
  .kh-dr-sub {
    display: none; flex-direction: column;
    background: var(--kh-off2);
    border-bottom: 1px solid var(--kh-border);
  }
  .kh-dr-sub.open { display: flex; }
  .kh-dr-sub a {
    padding: 13px 24px 13px 40px;
    font-family: "Outfit", sans-serif;
    font-size: 14px; font-weight: 600; color: var(--kh-slate);
    text-decoration: none; transition: color .2s, background .2s;
    display: flex; align-items: center; gap: 10px;
    border-bottom: 1px solid var(--kh-border);
  }
  .kh-dr-sub a:last-child { border-bottom: none; }
  .kh-dr-sub a i { color: var(--kh-sky); font-size: 12px; width: 14px; flex-shrink: 0; }
  .kh-dr-sub a:hover { color: var(--kh-blue); background: #fff; }

  /* Drawer CTA */
  .kh-dr-cta {
    padding: 24px;
  }
  .kh-dr-cta a {
    display: flex; align-items: center; justify-content: center; gap: 9px;
    background: var(--kh-navy); color: #fff;
    padding: 15px 24px; border-radius: 10px;
    font-family: "Outfit", sans-serif;
    font-size: 15px; font-weight: 700; text-decoration: none;
    transition: background .2s;
  }
  .kh-dr-cta a:hover { background: var(--kh-blue2); }

  /* ── Breakpoints ─────────────────────────────────────── */
  @media (max-width: 1080px) {
    .kh-inner { padding: 0 32px; }
  }
  @media (max-width: 860px) {
    :root { --kh-h: 66px; }
    .kh-inner { padding: 0 24px; }
    .kh-nav   { display: none; }
    .kh-right { display: none; }
    .kh-ham   { display: flex; }
  }
  @media (max-width: 480px) {
    :root { --kh-h: 60px; }
    .kh-inner { padding: 0 18px; }
  }
</style>

<!-- BAR -->
<header class="kh-bar" id="khBar" role="banner">
  <div class="kh-inner">

    <!-- Logo -->
    <a href="index.html" class="kh-logo" aria-label="KMEP Home">
      <img src="IMAGES/logo.png" alt="KMEP Logo" />
      <span class="kh-logo-text">KMEP</span>
    </a>

    <!-- Desktop nav -->
    <nav class="kh-nav" role="navigation" aria-label="Main navigation">
      <a href="index.html" class="kh-link">Home</a>
      <a href="services.html" class="kh-link">Services</a>

      <!-- Company dropdown -->
      <div class="kh-dd" id="ddCompany">
        <button class="kh-link" aria-haspopup="true" aria-expanded="false" aria-controls="panelCompany">
          Company&ensp;<i class="fas fa-chevron-down kh-chev" aria-hidden="true"></i>
        </button>
        <div class="kh-panel" id="panelCompany" role="menu">
          <span class="kh-panel-label">Company</span>

          <a href="about.html" class="kh-pitem" role="menuitem">
            <div class="kh-pitem-ico" aria-hidden="true"><i class="fas fa-building"></i></div>
            <div>
              <div class="kh-pitem-title">About Us</div>
              <div class="kh-pitem-sub">Our story, mission &amp; values</div>
            </div>
          </a>

          <a href="leadership.html" class="kh-pitem" role="menuitem">
            <div class="kh-pitem-ico" aria-hidden="true"><i class="fas fa-user-tie"></i></div>
            <div>
              <div class="kh-pitem-title">Leadership</div>
              <div class="kh-pitem-sub">The vision behind KMEP</div>
            </div>
          </a>

          <a href="team.html" class="kh-pitem" role="menuitem">
            <div class="kh-pitem-ico" aria-hidden="true"><i class="fas fa-users"></i></div>
            <div>
              <div class="kh-pitem-title">Our Team</div>
              <div class="kh-pitem-sub">Engineers behind every project</div>
            </div>
          </a>

          <a href="contact-us.html" class="kh-pitem" role="menuitem">
            <div class="kh-pitem-ico" aria-hidden="true"><i class="fas fa-envelope"></i></div>
            <div>
              <div class="kh-pitem-title">Contact Us</div>
              <div class="kh-pitem-sub">Chennai · Hosur · Trichy · Bangalore</div>
            </div>
          </a>
        </div>
      </div>
    </nav>

    <!-- Right CTA -->
    <div class="kh-right">
      <a href="contact-us.html" class="kh-cta">
        <i class="fas fa-paper-plane" aria-hidden="true"></i> Get in Touch
      </a>
    </div>

    <!-- Hamburger -->
    <button class="kh-ham" id="khHam" aria-label="Open navigation menu" aria-expanded="false" aria-controls="khDrawer">
      <span></span><span></span><span></span>
    </button>

  </div>
</header>

<!-- Mobile drawer -->
<nav class="kh-drawer" id="khDrawer" role="navigation" aria-label="Mobile navigation" aria-hidden="true">

  <a href="index.html" class="kh-dr-link">Home</a>
  <a href="services.html" class="kh-dr-link">Services</a>

  <!-- Company accordion -->
  <button class="kh-dr-link" id="drBtnCompany" aria-expanded="false" aria-controls="drSubCompany">
    Company <i class="fas fa-chevron-down kh-chev" aria-hidden="true"></i>
  </button>
  <div class="kh-dr-sub" id="drSubCompany" aria-hidden="true">
    <a href="about.html"><i class="fas fa-building" aria-hidden="true"></i> About Us</a>
    <a href="leadership.html"><i class="fas fa-user-tie" aria-hidden="true"></i> Leadership</a>
    <a href="team.html"><i class="fas fa-users" aria-hidden="true"></i> Our Team</a>
    <a href="contact-us.html"><i class="fas fa-envelope" aria-hidden="true"></i> Contact Us</a>
  </div>

  <div class="kh-dr-cta">
    <a href="contact-us.html">
      <i class="fas fa-paper-plane" aria-hidden="true"></i> Get in Touch
    </a>
  </div>

</nav>
    `;

    this._init();
  }

  _init() {
    const bar = this.querySelector("#khBar");
    const ham = this.querySelector("#khHam");
    const drawer = this.querySelector("#khDrawer");
    const drBtn = this.querySelector("#drBtnCompany");
    const drSub = this.querySelector("#drSubCompany");

    /* Scroll → .scrolled */
    const onScroll = () =>
      bar.classList.toggle("scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Hamburger */
    ham.addEventListener("click", () => {
      const open = ham.classList.toggle("open");
      ham.setAttribute("aria-expanded", open);
      drawer.classList.toggle("open", open);
      drawer.setAttribute("aria-hidden", !open);
      document.body.style.overflow = open ? "hidden" : "";
    });

    /* Company accordion */
    drBtn.addEventListener("click", () => {
      const open = drSub.classList.toggle("open");
      drBtn.setAttribute("aria-expanded", open);
      drSub.setAttribute("aria-hidden", !open);
      drBtn.querySelector(".kh-chev").style.transform = open
        ? "rotate(180deg)"
        : "rotate(0)";
    });

    /* Close on nav link click */
    drawer.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        ham.classList.remove("open");
        ham.setAttribute("aria-expanded", false);
        drawer.classList.remove("open");
        drawer.setAttribute("aria-hidden", true);
        document.body.style.overflow = "";
      }),
    );

    /* Close on Escape */
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("open")) {
        ham.classList.remove("open");
        ham.setAttribute("aria-expanded", false);
        drawer.classList.remove("open");
        drawer.setAttribute("aria-hidden", true);
        document.body.style.overflow = "";
      }
    });
  }
}
customElements.define("kmep-header", KmepHeader);

/* ============================================================
   FOOTER
============================================================ */
class KmepFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<style>
  kmep-footer *, kmep-footer *::before, kmep-footer *::after {
    box-sizing: border-box; margin: 0; padding: 0;
  }

  .kf-root {
    background: #0c1e35;
    font-family: "Outfit", sans-serif;
    color: rgba(255,255,255,0.38);
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  /* ── Top band ────────────────────────────────────────── */
  .kf-top {
    border-bottom: 1px solid rgba(255,255,255,0.07);
    padding: 44px 0;
  }
  .kf-top-inner {
    max-width: 1240px; margin: 0 auto; padding: 0 48px;
    display: flex; align-items: center; justify-content: space-between;
    gap: 28px; flex-wrap: wrap;
  }
  .kf-brand {
    display: flex; align-items: center; gap: 12px; text-decoration: none; flex-shrink: 0;
  }
  .kf-brand img {
    width: 40px; height: 40px; border-radius: 8px; object-fit: contain;
  }
  .kf-brand-name {
    font-weight: 800; font-size: 19px; letter-spacing: 3px;
    color: rgba(255,255,255,0.85); line-height: 1;
  }
  .kf-tagline {
    font-size: 14px; color: rgba(255,255,255,0.35);
    line-height: 1.75; max-width: 400px; flex: 1; min-width: 220px;
  }
  .kf-top-cta {
    display: inline-flex; align-items: center; gap: 8px;
    background: #0ea5e9; color: #fff;
    padding: 11px 26px; border-radius: 9px;
    font-size: 14px; font-weight: 700; text-decoration: none; white-space: nowrap;
    flex-shrink: 0;
    transition: background .2s, transform .2s, box-shadow .2s;
  }
  .kf-top-cta:hover {
    background: #0284c7; transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(14,165,233,0.35);
  }

  /* ── Columns ─────────────────────────────────────────── */
  .kf-cols {
    max-width: 1240px; margin: 0 auto; padding: 52px 48px;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 52px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .kf-about-desc {
    font-size: 13px; color: rgba(255,255,255,0.3); line-height: 1.85;
    margin-bottom: 26px; max-width: 280px;
  }
  .kf-contacts { display: flex; flex-direction: column; gap: 11px; }
  .kf-contacts a {
    font-size: 13px; color: rgba(255,255,255,0.35);
    display: flex; align-items: flex-start; gap: 10px;
    text-decoration: none; transition: color .2s; line-height: 1.55;
  }
  .kf-contacts a:hover { color: rgba(255,255,255,0.9); }
  .kf-contacts a i {
    color: #0ea5e9; font-size: 11px; width: 14px;
    flex-shrink: 0; margin-top: 3px;
  }

  .kf-col-head {
    display: block; font-size: 10px; font-weight: 700;
    letter-spacing: 2.5px; text-transform: uppercase;
    color: rgba(255,255,255,0.5); margin-bottom: 18px;
  }
  .kf-col a {
    display: block; font-size: 13px; color: rgba(255,255,255,0.38);
    padding: 5px 0; text-decoration: none; transition: color .2s;
  }
  .kf-col a:hover { color: rgba(255,255,255,0.9); }

  /* ── Bottom ──────────────────────────────────────────── */
  .kf-bottom {
    max-width: 1240px; margin: 0 auto; padding: 20px 48px;
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 8px;
  }
  .kf-copy    { font-size: 11.5px; color: rgba(255,255,255,0.2); }
  .kf-address { font-size: 11px;   color: rgba(255,255,255,0.18); text-align: right; }

  /* ── Responsive ──────────────────────────────────────── */
  @media (max-width: 1080px) {
    .kf-top-inner, .kf-cols, .kf-bottom { padding-left: 32px; padding-right: 32px; }
    .kf-cols { grid-template-columns: 1fr 1fr; gap: 36px; }
    .kf-cols > div:first-child { grid-column: 1 / -1; }
    .kf-about-desc { max-width: 100%; }
    .kf-contacts { flex-direction: row; flex-wrap: wrap; column-gap: 24px; }
  }
  @media (max-width: 680px) {
    .kf-top-inner, .kf-cols, .kf-bottom { padding-left: 24px; padding-right: 24px; }
    .kf-top-inner { flex-direction: column; align-items: flex-start; }
    .kf-top-cta   { width: 100%; justify-content: center; }
    .kf-bottom    { flex-direction: column; align-items: flex-start; }
    .kf-address   { text-align: left; }
    .kf-contacts  { flex-direction: column; }
  }
  @media (max-width: 440px) {
    .kf-top-inner, .kf-cols, .kf-bottom { padding-left: 18px; padding-right: 18px; }
    .kf-cols { grid-template-columns: 1fr; }
  }
</style>

<footer class="kf-root" role="contentinfo">

  <!-- Top band -->
  <div class="kf-top">
    <div class="kf-top-inner">
      <a href="index.html" class="kf-brand" aria-label="KMEP Home">
        <img src="IMAGES/logo.png" alt="KMEP" />
        <span class="kf-brand-name">KMEP</span>
      </a>
      <p class="kf-tagline">
        Keerthan MEP Engineers — precision HVAC, Mechanical, Electrical &amp; Plumbing
        solutions across Tamil Nadu and beyond since 2009.
      </p>
      <a href="contact-us.html" class="kf-top-cta">
        <i class="fas fa-paper-plane" aria-hidden="true"></i> Start a Project
      </a>
    </div>
  </div>

  <!-- Main columns -->
  <div class="kf-cols">

    <div>
      <p class="kf-about-desc">
        Integrated MEP engineering under one roof — from design and installation
        through commissioning and 24/7 after-sales support. Authorized representative
        for Dunham Bush (DB-Aire India Pvt. Ltd.) and LG Electronics India Pvt. Ltd.
      </p>
      <div class="kf-contacts">
        <a href="tel:+919710439000">
          <i class="fas fa-phone" aria-hidden="true"></i> +91 97104 39000
        </a>
        <a href="tel:+919176670447">
          <i class="fas fa-phone" aria-hidden="true"></i> +91 91766 70447
        </a>
        <a href="mailto:rajesh@kmep.co.in">
          <i class="fas fa-envelope" aria-hidden="true"></i> rajesh@kmep.co.in
        </a>
        <a href="https://maps.app.goo.gl/yT5Em1M9PeMGubSJ7" target="_blank" rel="noopener">
          <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
          Plot No. 17, Door No. 4,<br />Senthil Nagar, Chennai – 600 062
        </a>
      </div>
    </div>

    <div class="kf-col">
      <span class="kf-col-head">Services</span>
      <a href="services.html">HVAC Systems</a>
      <a href="services.html">Mechanical Engineering</a>
      <a href="services.html">Electrical Works</a>
      <a href="services.html">Plumbing Solutions</a>
      <a href="services.html">Energy Audit &amp; Management</a>
    </div>

    <div class="kf-col">
      <span class="kf-col-head">Company</span>
      <a href="about.html">About Us</a>
      <a href="leadership.html">Leadership</a>
      <a href="team.html">Our Team</a>
      <a href="contact-us.html">Contact Us</a>
    </div>

    <div class="kf-col">
      <span class="kf-col-head">Offices</span>
      <a href="https://maps.app.goo.gl/ijvwbweYxeWVsLsS6" target="_blank" rel="noopener">Chennai</a>
      <a href="https://maps.app.goo.gl/ijvwbweYxeWVsLsS6" target="_blank" rel="noopener">Hosur</a>
      <a href="https://maps.app.goo.gl/ijvwbweYxeWVsLsS6" target="_blank" rel="noopener">Tiruchirappalli</a>
      <a href="https://maps.app.goo.gl/ijvwbweYxeWVsLsS6" target="_blank" rel="noopener">Bangalore</a>
    </div>

  </div>

  <!-- Bottom bar -->
  <div class="kf-bottom">
    <span class="kf-copy">© 2026 KMEP — Keerthan MEP Engineers. All rights reserved.</span>
    <span class="kf-address">
      Plot No. 17, Thiruppur Kumaran Street, Senthil Nagar, Thirumullaivoyal,
      Chennai – 600 062, Tamil Nadu, India
    </span>
  </div>

</footer>
    `;
  }
}
customElements.define("kmep-footer", KmepFooter);

/* ============================================================
   SCROLL REVEAL  (.rv / .rv-l / .rv-r)
============================================================ */
(function initScrollReveal() {
  const els = document.querySelectorAll(".rv, .rv-l, .rv-r");
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("on");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  els.forEach((el) => io.observe(el));
})();

/* ============================================================
   SIDE-NAV DOTS  (#sideNav)
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const sideNav = document.getElementById("sideNav");
  if (!sideNav) return;

  const dots = sideNav.querySelectorAll(".dot");
  const darkSections = ["hero", "stats", "clients"];

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = document.getElementById(dot.dataset.target);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  window.addEventListener("scroll", () => {
    const mid = window.scrollY + window.innerHeight / 2;
    dots.forEach((dot) => {
      const s = document.getElementById(dot.dataset.target);
      if (!s) return;
      dot.classList.toggle(
        "on",
        mid >= s.offsetTop && mid < s.offsetTop + s.offsetHeight,
      );
    });
    const onDark = darkSections.some((id) => {
      const s = document.getElementById(id);
      if (!s) return false;
      const mid2 = window.scrollY + window.innerHeight / 2;
      return mid2 >= s.offsetTop && mid2 < s.offsetTop + s.offsetHeight;
    });
    sideNav.classList.toggle("dk", onDark);
  });
});

/* ============================================================
   HERO ANIMATE  (#hero — index.html only)
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");
  if (!hero) return;
  hero.classList.add("hero-animate");
  setTimeout(() => hero.classList.remove("hero-animate"), 1800);
});
