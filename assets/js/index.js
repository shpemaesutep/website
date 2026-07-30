document.addEventListener("DOMContentLoaded", () => {

  // ── Navbar (runs after async header injection) ───────────────────
  function initNav() {
    const nav = document.querySelector(".shpe-navbar");
    if (!nav || nav._initialized) return;
    nav._initialized = true;

    // 1) Shadow on scroll
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // 2) Active link highlight
    const path = location.pathname;
    const page = path.substring(path.lastIndexOf("/") + 1) || "index.html";
    nav.querySelectorAll(".nav-link").forEach(link => {
      const href = link.getAttribute("href");
      if (!href || href === "#" || href.startsWith("http")) return;
      const cleanHref = href.replace("./", "");
      if (cleanHref === page) link.classList.add("active");
      else link.classList.remove("active");
    });

    // 3) Mobile: close menu when a link is clicked
    const toggler = nav.querySelector(".navbar-toggler");
    if (toggler) {
      nav.addEventListener("click", (e) => {
        const target = e.target.closest("a.nav-link:not(.dropdown-toggle), .dropdown-item");
        if (!target) return;
        const isExpanded = toggler.getAttribute("aria-expanded") === "true";
        const isMobile = window.matchMedia("(max-width: 991px)").matches;
        if (isMobile && isExpanded) toggler.click();
      });
    }
  }

  // Try immediately (works when nav is already in DOM)
  initNav();

  // Also fire once header partial is injected via $.load()
  const headerSlot = document.getElementById("page-header");
  if (headerSlot) {
    new MutationObserver((_, obs) => {
      if (document.querySelector(".shpe-navbar")) {
        obs.disconnect();
        initNav();
      }
    }).observe(headerSlot, { childList: true, subtree: true });
  }

  // ── Scroll-reveal (IntersectionObserver) ────────────────────────
  if ("IntersectionObserver" in window) {
    const revealEls = document.querySelectorAll(".reveal");
    if (revealEls.length > 0) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach(el => observer.observe(el));
    }
  } else {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── Count-up numbers (stat displays: "11K+", "1977", "40+"...) ──
  function initCountUp() {
    const els = document.querySelectorAll(".js-count-up");
    if (!els.length || prefersReducedMotion || !("IntersectionObserver" in window)) return;

    function animate(el) {
      const match = el.textContent.trim().match(/^([\d,]+)(.*)$/);
      if (!match) return;
      const target = parseInt(match[1].replace(/,/g, ""), 10);
      const suffix = match[2];
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          animate(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    els.forEach(el => observer.observe(el));
  }

  // ── Cursor tilt (delegated so it also covers JS-rendered cards) ─
  function initTilt() {
    if (prefersReducedMotion) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const MAX_TILT = 6;
    let activeEl = null;
    let pending = null;
    let ticking = false;

    function apply() {
      ticking = false;
      if (!pending) return;
      const { el, clientX, clientY } = pending;
      const rect = el.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * MAX_TILT * 2;
      const rotateX = (0.5 - y) * MAX_TILT * 2;
      el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    }

    document.addEventListener("pointermove", (e) => {
      const el = e.target.closest ? e.target.closest(".js-tilt") : null;
      if (el) {
        activeEl = el;
        pending = { el, clientX: e.clientX, clientY: e.clientY };
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(apply);
        }
      } else if (activeEl) {
        activeEl.style.transform = "";
        activeEl = null;
      }
    });

    document.addEventListener("pointerleave", () => {
      if (activeEl) {
        activeEl.style.transform = "";
        activeEl = null;
      }
    });
  }

  // ── Scroll progress bar ──────────────────────────────────────────
  function initScrollProgress() {
    const bar = document.getElementById("scroll-progress-bar");
    if (!bar) return;

    function update() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      bar.style.transform = `scaleX(${progress})`;
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  initCountUp();
  initTilt();
  initScrollProgress();

});
