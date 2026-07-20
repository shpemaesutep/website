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
        const target = e.target.closest("a.nav-link, .dropdown-item");
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

});
