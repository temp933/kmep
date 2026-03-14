// MOBILE MENU TOGGLE
function toggleMenu() {
  const nav = document.querySelector(".nav");
  const icon = document.querySelector(".menu-icon");

  nav.classList.toggle("show");
  icon.classList.toggle("active");
  icon.textContent = nav.classList.contains("show") ? "✖" : "☰";
}

// MOBILE DROPDOWN OPEN/CLOSE

function enableDropdownToggle() {
  document.querySelectorAll(".dropdown > a").forEach((dropLink) => {
    dropLink.addEventListener("click", function (e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();

        const parent = this.parentElement;

        // close all other dropdowns
        document.querySelectorAll(".dropdown").forEach((d) => {
          if (d !== parent) d.classList.remove("active");
        });

        // toggle current dropdown
        parent.classList.toggle("active");
      }
    });
  });
}

// CLOSE MENU ON LINK CLICK

function closeMobileMenu() {
  const nav = document.querySelector(".nav");
  const icon = document.querySelector(".menu-icon");

  if (window.innerWidth <= 900) {
    nav.classList.remove("show");
    icon.classList.remove("active");
    icon.textContent = "☰";

    // close all open dropdowns
    document
      .querySelectorAll(".dropdown")
      .forEach((d) => d.classList.remove("active"));
  }
}

function enableCloseMenuOnLinks() {
  document.querySelectorAll(".nav > a, .dropdown-content a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

// ----------------------
// INITIALIZE AFTER HEADER LOAD
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  // Wait for header to fully load
  setTimeout(() => {
    enableDropdownToggle();
    enableCloseMenuOnLinks();
  }, 300);
});

class KmepHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `

<style>
 body {
    margin: 0;
    font-family: "Segoe UI", Arial, sans-serif;
    background: #0d1b2a;
  }

  .header {
    width: 100%;
    padding: 20px 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // background: linear-gradient(120deg, rgba(255,255,255,0.20), rgba(255,255,255,0.05));
    background:#000;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    position: fixed;
    top: 0;
    z-index: 9999;
    transition: 0.3s ease;
  }

  .header:hover {
    // background: linear-gradient(120deg, rgba(255,255,255,0.28), rgba(255,255,255,0.10));
    background:#000;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .brand-name {
    font-size: 35px;
    font-weight: 700;
    letter-spacing: 2px;
    font-family: 'Courier New', Courier, monospace;
    background: linear-gradient(90deg, #c471f5, #6a9bff, #c471f5);
    background-size: 200%;
    -webkit-background-clip: text;
    color: transparent;
    animation: shineText 3s linear infinite;
  }

  @keyframes shineText {
    0% { background-position: 0%; }
    100% { background-position: 200%; }
  }

  .logo img {
    width: 55px;
    height: auto;
    border-radius: 6px;
  }

  .nav {
    display: flex;
    gap: 40px;
  }

  .nav a {
    text-decoration: none;
    color: #ffffff;
    font-weight: 600;
    letter-spacing: 1px;
    font-size: 20px;
    font-family: 'Courier New', Courier, monospace;
    position: relative;
    transition: 0.3s;
  }

  .nav a:hover {
    color: #9ad0ff;
    text-shadow: 0 0 8px rgba(154,208,255,0.75);
  }

  .nav a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 0%;
    height: 2px;
    background: #9ad0ff;
    transition: 0.3s ease;
  }

  .nav a:hover::after {
    width: 100%;
    box-shadow: 0 0 10px #9ad0ff;
  }

  .dropdown {
    position: relative;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    top: 20px;
    left: -90%;
    min-width: 160px;
    padding: 18px;
    border-radius: 14px;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(22px);
    box-shadow: 0 8px 28px rgba(0,0,0,0.35);
    opacity: 0;
    transform: translateY(10px);
    transition: 0.3s ease;
  }

  .dropdown:hover .dropdown-content {
    display: block;
    opacity: 1;
    transform: translateY(0);
  }

  .dropdown.active .dropdown-content {
    display: block;
    opacity: 1;
    transform: translateY(0);
  }

  .dropdown-content a {
    display: block;
    padding: 10px 0;
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
    font-size: 20px;
    transition: 0.2s;
  }

  .dropdown-content a:hover {
    color: #9ad0ff;
    text-shadow: 0 0 6px #9ad0ff;
  }

  .menu-icon {
    display: none;
    font-size: 30px;
    color: #ffffff;
    cursor: pointer;
    transition: 0.25s ease;
  }

  .menu-icon.active {
    transform: rotate(90deg);
  }

  @media (max-width: 900px) {
    .header {
      padding: 16px 30px;
    }

    .nav {
      display: none;
      position: absolute;
      top: 80px;
      right: 20px;
      backdrop-filter: blur(22px);
      padding: 20px;
      border-radius: 14px;
      flex-direction: column;
      gap: 20px;
      box-shadow: 0 10px 28px rgba(0,0,0,0.35);
    }

    .nav.show {
      display: flex;
      background:rgba(12, 11, 11, 0.75);
    }

    .menu-icon {
      display: block;
    }

    .dropdown-content{
      width: auto;
      left: -100%;
      top: 10%;
      background:rgba(12, 11, 11, 0.75);
      font-weight:600;
      font-size: 20px;
    }
  }
</style>

<header class="header">
  <div class="header-left">
    <div class="logo">
      <a href="about.html">
        <img src="images/logo.png" alt="Logo" />
      </a>
    </div>

    <div class="brand-name">KMEP</div>
  </div>

  <nav class="nav">
    <a href="index.html">HOME</a>
    <a href="services.html">SERVICES</a>

    <div class="dropdown">
      <a href="#">COMPANY</a>
      <div class="dropdown-content">
        <a href="leadership.html">Leadership</a>
        <a href="team.html">Team</a>
        <a href="about.html">About Us</a>
      </div>
    </div>

    <a href="contact-us.html">CONTACT US</a>
  </nav>

  <div class="menu-icon">☰</div>
</header>
    `;

    // RUN THE JS *AFTER* HTML IS INSERTED
    this.initScripts();
  }

  initScripts() {
    const nav = this.querySelector(".nav");
    const icon = this.querySelector(".menu-icon");

    // MOBILE MENU TOGGLE
    icon.addEventListener("click", () => {
      nav.classList.toggle("show");
      icon.classList.toggle("active");
      icon.textContent = nav.classList.contains("show") ? "✖" : "☰";
    });

    // MOBILE DROPDOWN
    const dropdown = this.querySelector(".dropdown");
    const dropdownLink = dropdown.querySelector("a");

    dropdownLink.addEventListener("click", (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        dropdown.classList.toggle("active");
      }
    });
  }
}

customElements.define("kmep-header", KmepHeader);

class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<!-- ======= FOOTER WITH GRAPHICS & HOVER EFFECT ======= -->
<footer style="
  position: relative;
  background: linear-gradient(180deg, #111, #000);
  color: #ddd;
  padding: 80px 20px 40px;
  overflow: hidden;
  width: 100%;
  display: block;
  margin: 0;
">

  <style>
    html, body {
      margin: 0;
      padding: 0;
    }

    footer {
      width: 100%;
      margin: 0;
      padding: 0;
      display: block;
      box-sizing: border-box;
    }

    footer a {
      color: #ccc;
      text-decoration: none;
      font-family: 'Times New Roman', Times, serif;
      transition: color 0.3s ease;
    }

    footer a:hover {
      color: red;
      transform: scale(1.15);
      display: inline-block;
      transition: 0.25s ease;
    }
  </style>

  <!-- Background graphics -->
  <div style="
    position: absolute;
    top: -50px; left: -50px;
    width: 200px; height: 200px;
    background: radial-gradient(circle at center, #a05cff33, transparent);
    border-radius: 50%;
    z-index: 0;
  "></div>

  <div style="
    position: absolute;
    bottom: -60px; right: -60px;
    width: 250px; height: 250px;
    background: radial-gradient(circle at center, #ff6ec733, transparent);
    border-radius: 50%;
    z-index: 0;
  "></div>

  <div style="
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  ">

    <div style="flex: 1 1 220px; min-width: 200px;">
      <h2 style="color: #a05cff; font-size: 22px; margin-bottom: 20px;">Get in touch</h2>
      <dl>
        <dt style="font-size: 18px; font-weight: 600; margin-bottom: 8px; color: #fff;">📞 Phone</dt>
        <dd style="margin-bottom: 15px; line-height: 1.7;">
          <a href="tel:+919710439000">+91 97104 39000</a><br>
          <a href="tel:+919176670447">+91 91766 70447</a>
        </dd>

        <dt style="font-size: 18px; font-weight: 600; margin-bottom: 8px; color: #fff;">📧 Email</dt>
        <dd style="margin-bottom: 15px; line-height: 1.7;">
          <a href="mailto:rajesh@kmep.co.in">rajesh@kmep.co.in</a>
        </dd>
      </dl>
    </div>

    <div style="flex: 1 1 220px; min-width: 200px;">
      <h2 style="color: #a05cff; font-size: 22px; margin-bottom: 20px;">Registered Office</h2>
      <div style="display: flex; gap: 10px; line-height: 1.7;">
        <span>📍</span>
        <a href="https://maps.app.goo.gl/yT5Em1M9PeMGubSJ7" target="_blank" rel="noopener">
          Plot No. 17, Door No. 4,<br>
          Thiruppur Kumaran Street,<br>
          Senthil Nagar, Chennai – 600 062,<br>
          Tamil Nadu, India
        </a>
      </div>
    </div>

    <div style="flex: 1 1 220px; min-width: 200px;">
      <h2 style="color: #a05cff; font-size: 22px; margin-bottom: 20px;">Branches</h2>
      <div style="line-height: 1.7;">
        <a href="https://maps.app.goo.gl/yT5Em1M9PeMGubSJ7" target="_blank">Chennai</a><br>
        <a href="https://maps.app.goo.gl/yT5Em1M9PeMGubSJ7" target="_blank">Hosur</a><br>
        <a href="https://maps.app.goo.gl/yT5Em1M9PeMGubSJ7" target="_blank">Tiruchirappalli</a><br>
        <a href="https://maps.app.goo.gl/yT5Em1M9PeMGubSJ7" target="_blank">Bangalore</a>
      </div>
    </div>

  </div>

  <div style="
    position: relative;
    z-index: 1;
    text-align: center;
    border-top: 1px solid #333;
    padding-top: 20px;
    margin-top: 40px;
    color: #777;
    font-size: 14px;
  ">
    © KMEP — All Rights Reserved
  </div>

</footer>
    `;
  }
}

customElements.define("kmep-footer", Footer);

/* Fade-in on Scroll */
function revealOnScroll() {
  const faders = document.querySelectorAll(".fade");
  faders.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
document.addEventListener("DOMContentLoaded", revealOnScroll);

/* Graph Animation */
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelectorAll(".bar").forEach((b) => {
      let h = b.getAttribute("data-height");
      b.style.height = h + "%";
    });
  }, 400);
});

/* Floating Particles */
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < 20; i++) {
    let p = document.createElement("div");
    p.classList.add("particle");
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = 5 + Math.random() * 10 + "s";
    document.body.appendChild(p);
  }
});

/* Hero Resize on Scroll */
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");

  if (!hero) return; // safety check

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (scrollY < window.innerHeight) {
      hero.style.height = `${100 - scrollY / 10}vh`; // Smooth shrink
    } else {
      hero.style.height = "90vh"; // Minimum height
    }
  });
});

/* Hero Shrink + Content Reveal on Scroll */
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");
  const content = document.getElementById("content");

  if (!hero || !content) return; // safety check

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      hero.classList.add("shrink");
      content.classList.add("visible");
    } else {
      hero.classList.remove("shrink");
      content.classList.remove("visible");
    }
  });
});

/* Hero Height Shrink on Scroll */
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");

  if (!hero) return; // safety check

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (scrollY < window.innerHeight) {
      hero.style.height = `${100 - scrollY / 10}vh`; // shrink effect
    } else {
      hero.style.height = "90vh"; // minimum height
    }
  });
});

const words = document.querySelectorAll(".word");

words.forEach((word, wIndex) => {
  const color = word.dataset.color;
  const letters = [...word.textContent];
  word.textContent = "";

  letters.forEach((ch, i) => {
    const span = document.createElement("span");
    span.textContent = ch;
    span.style.color = color;
    word.appendChild(span);

    setTimeout(() => {
      span.style.opacity = "1";
      span.style.top = "-40px";

      setTimeout(() => {
        span.style.top = "0px";
      }, 300);
    }, i * 120 + wIndex * 1000);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");
  const OFFSET = 100; // adjust if needed (header / spacing)

  /* CLICK → SMOOTH SCROLL WITH OFFSET */
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;

      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });

  /* SCROLL → ACTIVE MENU HIGHLIGHT */
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + OFFSET + 10;

    links.forEach((link) => {
      const section = document.querySelector(link.hash);
      if (!section) return;

      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        links.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".tran-nav li");
  const OFFSET = 100;

  /* Click → scroll */
  items.forEach((item) => {
    item.addEventListener("click", () => {
      const target = document.querySelector(item.dataset.target);
      if (!target) return;

      const top =
        target.getBoundingClientRect().top + window.pageYOffset - OFFSET;

      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* Scroll → active highlight */
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + OFFSET + 10;

    items.forEach((item) => {
      const section = document.querySelector(item.dataset.target);
      if (!section) return;

      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        items.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
      }
    });
  });
});
