document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");

  document.querySelectorAll(".js-expand").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const card = btn.closest(".activity-card");
      card.classList.add("expanded");

      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  overlay.addEventListener("click", () => {
    document.querySelectorAll(".activity-card.expanded").forEach(card => {
      card.classList.remove("expanded");
    });

    overlay.classList.remove("active");
    document.body.style.overflow = "";
  });
});
