(() => {
  const overlay = document.getElementById("expand-overlay");
  const modal = overlay?.querySelector(".expand-modal");

  if (!overlay || !modal) return;

  let activeCard = null;
  let placeholder = null;

  function openCard(card) {
    if (activeCard) return;

    activeCard = card;

    // Create a placeholder so the grid doesn’t collapse
    placeholder = document.createElement("div");
    placeholder.style.width = `${card.offsetWidth}px`;
    placeholder.style.height = `${card.offsetHeight}px`;
    placeholder.style.display = getComputedStyle(card).display === "inline" ? "inline-block" : "block";
    card.parentNode.insertBefore(placeholder, card);

    // FLIP: First
    const first = card.getBoundingClientRect();

    // Move card into modal
    modal.innerHTML = "";
    modal.appendChild(card);

    // Show overlay + lock scroll
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("expand-lock");

    // FLIP: Last
    const last = card.getBoundingClientRect();

    // Invert
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    const sx = first.width / last.width;
    const sy = first.height / last.height;

    card.style.transformOrigin = "top left";
    card.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
    card.style.transition = "transform 0s";

    // Play
    requestAnimationFrame(() => {
      card.style.transition = "transform 420ms ease";
      card.style.transform = "translate(0px, 0px) scale(1, 1)";
    });
  }

  function closeCard() {
    if (!activeCard) return;

    const card = activeCard;

    // FLIP back to placeholder location
    const first = card.getBoundingClientRect();

    // Move card back to where it came from (before placeholder)
    placeholder.parentNode.insertBefore(card, placeholder);

    const last = card.getBoundingClientRect();

    const dx = first.left - last.left;
    const dy = first.top - last.top;
    const sx = first.width / last.width;
    const sy = first.height / last.height;

    // Hide overlay immediately (but keep animation on card)
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("expand-lock");

    card.classList.remove("is-flipped");

    card.style.transformOrigin = "top left";
    card.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
    card.style.transition = "transform 0s";

    requestAnimationFrame(() => {
      card.style.transition = "transform 420ms ease";
      card.style.transform = "translate(0px, 0px) scale(1, 1)";
    });

    // Cleanup after animation
    card.addEventListener(
      "transitionend",
      () => {
        card.style.transition = "";
        card.style.transform = "";
        placeholder?.remove();
        placeholder = null;
        activeCard = null;
      },
      { once: true }
    );
  }

  // Open triggers:
  // 1) click the open button
  // 2) optionally click anywhere on the card (uncomment below)
  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest(".expand-open-btn");
    if (openBtn) {
      const card = e.target.closest(".js-expand-card");
      if (card) openCard(card);
      return;
    }

    // Optional: click card to open (but not links/buttons)
    // const card = e.target.closest(".js-expand-card");
    // if (card && !e.target.closest("a, button")) openCard(card);

    // Flip button (works in both normal and expanded states)
    const flipBtn = e.target.closest(".expand-flip-btn");
    if (flipBtn) {
      const card = e.target.closest(".js-expand-card");
      if (card) card.classList.toggle("is-flipped");
      return;
    }

    // Click outside card to close when overlay is open
    if (overlay.classList.contains("is-open")) {
      const clickedInsideCard = e.target.closest(".js-expand-card");
      const clickedInsideModal = e.target.closest(".expand-modal");
      if (clickedInsideModal && !clickedInsideCard) closeCard();
    }
  });

  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) {
      closeCard();
    }
  });

  // Also allow clicking the dim area to close (more direct)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeCard();
  });
})();
