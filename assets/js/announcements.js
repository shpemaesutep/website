/**
 * SHPE // MAES — Announcements
 *
 * To post a new announcement, copy one of the objects below and edit it.
 *   - id:       unique, lowercase, hyphenated — used only for de-duping
 *   - title:    short headline
 *   - date:     "YYYY-MM-DD" — controls sort order and the displayed date
 *   - category: "event" | "deadline" | "general"
 *   - pinned:   true keeps ONE announcement featured at the top (use sparingly)
 *   - body:     1-2 sentences
 *   - link:     optional { text, href } — delete the whole field if not needed
 *
 * This same list feeds both the homepage teaser (latest 3) and the full
 * announcements.html page, so it only needs to be edited in one place.
 */
const ANNOUNCEMENTS = [
  {
    id: "1st-general-meeting",
    title: "1st General Meeting",
    date: "2026-08-28",
    category: "event",
    pinned: true,
    body: "Come meet the board, hear about App Dev, SHPEtinas, and MinerSpark, and find out how to get involved this semester. Free food while it lasts!",
    link: { text: "See event details", href: "#events" },
  },
  {
    id: "membership-dues-deadline",
    title: "Fall Membership Dues Due",
    date: "2026-09-05",
    category: "deadline",
    body: "Pay your semester dues to stay active and keep access to socials, workshops, and travel opportunities.",
    link: { text: "Renew your membership", href: "join.html" },
  },
  {
    id: "general-body-meeting-1",
    title: "First General Body Meeting",
    date: "2026-08-21",
    category: "event",
    body: "Our first GBM of the year. We'll cover the semester calendar, committee sign-ups, and officer introductions.",
  },
  {
    id: "scholarship-app-open",
    title: "SHPE Foundation Scholarship Applications Open",
    date: "2026-09-15",
    category: "deadline",
    body: "National SHPE scholarship applications are open for the fall cycle. Don't wait until the deadline to start your essays.",
    link: { text: "Apply on shpefoundation.org", href: "https://shpefoundation.org" },
  },
  {
    id: "committee-signups",
    title: "Committee Sign-ups",
    date: "2026-10-01",
    category: "general",
    body: "Interested in joining a committee? This is a great way to start getting involved with the organization.",
  },
];

(function () {
  const CATEGORY_META = {
    general:  { label: "General",  icon: "fa-bullhorn",     color: "#041E42", text: "#fff" },
    event:    { label: "Event",    icon: "fa-calendar-day", color: "#86DC3D", text: "#1F2937" },
    deadline: { label: "Deadline", icon: "fa-clock",         color: "#FF8200", text: "#fff" },
  };

  function formatDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function isRecent(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    const posted = new Date(y, m - 1, d).getTime();
    const daysAgo = (Date.now() - posted) / 86400000;
    return daysAgo >= 0 && daysAgo <= 7;
  }

  function isExternal(href) {
    return /^https?:\/\//i.test(href);
  }

  function sortAnnouncements(list) {
    return [...list].sort((a, b) => {
      if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
      return b.date.localeCompare(a.date);
    });
  }

  function cardHTML(item) {
    const meta = CATEGORY_META[item.category] || CATEGORY_META.general;
    const pinnedClass = item.pinned ? " announcement-card--pinned" : "";
    const pinBadge = item.pinned
      ? `<span class="announcement-pin"><i class="fa-solid fa-thumbtack" aria-hidden="true"></i>Pinned</span>`
      : "";
    const newBadge = !item.pinned && isRecent(item.date)
      ? `<span class="announcement-new">New</span>`
      : "";
    const link = item.link
      ? `<a class="announcement-card__link" href="${item.link.href}"${isExternal(item.link.href) ? ' target="_blank" rel="noopener noreferrer"' : ""}>
           ${item.link.text} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
         </a>`
      : "";

    return `
      <article class="announcement-card${pinnedClass}${item.pinned ? " js-tilt" : ""}" data-category="${item.category}" style="--accent-color:${meta.color};--accent-text:${meta.text};">
        ${pinBadge}
        <div class="announcement-card__top">
          <span class="announcement-tag"><i class="fa-solid ${meta.icon}" aria-hidden="true"></i>${meta.label}</span>
          ${newBadge}
          <time class="announcement-date" datetime="${item.date}">${formatDate(item.date)}</time>
        </div>
        <h3 class="announcement-card__title">${item.title}</h3>
        <p class="announcement-card__body">${item.body}</p>
        ${link}
      </article>`;
  }

  function render(container, items) {
    if (!container) return;
    container.innerHTML = items.length
      ? items.map(cardHTML).join("")
      : `<p class="announcement-empty">No announcements right now — check back soon.</p>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const sorted = sortAnnouncements(ANNOUNCEMENTS);

    const teaser = document.getElementById("home-announcements-grid");
    if (teaser) render(teaser, sorted.slice(0, 3));

    const full = document.getElementById("announcements-grid");
    if (full) {
      render(full, sorted);

      const filterBar = document.querySelector(".announcement-filters");
      if (filterBar) {
        filterBar.addEventListener("click", (e) => {
          const btn = e.target.closest("[data-filter]");
          if (!btn) return;
          filterBar.querySelectorAll("[data-filter]").forEach((b) => b.classList.remove("is-active"));
          btn.classList.add("is-active");
          const filter = btn.dataset.filter;
          const filtered = filter === "all" ? sorted : sorted.filter((a) => a.category === filter);
          render(full, filtered);
        });
      }
    }
  });
})();
