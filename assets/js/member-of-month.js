/**
 * SHPE // MAES — Member of the Month
 *
 * Update this object each month with the new spotlight member.
 *   - img: path to their headshot. Leave "" to show a placeholder icon.
 *   - interests: a short list of hobbies/interests, shown in the profile popup.
 */
const MEMBER_OF_THE_MONTH = {
  month: "This Month",
  name: "Member Name",
  classification: "Classification",
  major: "Major",
  interests: ["Add an interest", "Add another"],
  img: "",
};

(function () {
  function cardHTML(m) {
    const media = m.img
      ? `<img src="${m.img}" alt="${m.name}" loading="lazy">`
      : `<div class="avatar-placeholder"><i class="fa-solid fa-user" aria-hidden="true"></i></div>`;

    return `
      <article class="motm-card js-tilt" tabindex="0" role="button" aria-haspopup="dialog" aria-label="View full profile for ${m.name}">
        <div class="motm-card__media">${media}</div>
        <div class="motm-card__body">
          <span class="motm-card__eyebrow">${m.month}</span>
          <h3 class="motm-card__name">${m.name}</h3>
          <p class="motm-card__meta">${m.classification} &middot; ${m.major}</p>
          <span class="motm-card__cta">View Profile <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
        </div>
      </article>`;
  }

  function modalBodyHTML(m) {
    const photo = m.img
      ? `<img src="${m.img}" alt="${m.name}" class="motm-modal-photo">`
      : `<div class="motm-modal-photo avatar-placeholder"><i class="fa-solid fa-user" aria-hidden="true"></i></div>`;
    const chips = (m.interests || [])
      .map((i) => `<span class="motm-chip">${i}</span>`)
      .join("");

    return `
      <div class="d-flex flex-column flex-md-row gap-4 align-items-start">
        ${photo}
        <div class="flex-grow-1">
          <p class="motm-modal-eyebrow">${m.month} Member of the Month</p>
          <h3 class="motm-modal-name">${m.name}</h3>
          <p class="motm-modal-meta">${m.classification} &middot; ${m.major}</p>
          <div class="motm-modal-section-label">Interests</div>
          <div class="motm-chip-row">${chips}</div>
        </div>
      </div>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const slot = document.getElementById("motm-card-slot");
    if (!slot) return;

    slot.innerHTML = cardHTML(MEMBER_OF_THE_MONTH);

    const modalEl = document.getElementById("motmModal");
    const modalBody = document.getElementById("motmModalBody");
    if (!modalEl || !modalBody || typeof bootstrap === "undefined") return;

    const modal = new bootstrap.Modal(modalEl);
    modalBody.innerHTML = modalBodyHTML(MEMBER_OF_THE_MONTH);

    function openModal() {
      modal.show();
    }

    slot.addEventListener("click", (e) => {
      if (e.target.closest(".motm-card")) openModal();
    });

    slot.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      if (!e.target.closest(".motm-card")) return;
      e.preventDefault();
      openModal();
    });
  });
})();
