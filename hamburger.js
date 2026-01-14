document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const closeBtn = document.querySelector(".mobile-close");
  
    if (!hamburger || !mobileMenu) return;
  
    function openMenu() {
      mobileMenu.classList.add("active");
      hamburger.classList.add("active");
      hamburger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
  
    function closeMenu() {
      mobileMenu.classList.remove("active");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.contains("active") ? closeMenu() : openMenu();
    });
  
    // Close button
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeMenu();
      });
    }
  
    // Tap outside closes
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) closeMenu();
    });
  
    // Links close
    document.querySelectorAll(".mobile-nav a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  
    // ESC close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
});
  
