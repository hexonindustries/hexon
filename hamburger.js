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
  

/* WARDROBE CSS */
/*
document.addEventListener("DOMContentLoaded", () => {
    const split = document.getElementById("wardrobeSplit");
    if (!split) return;
  
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (!isMobile) return;
  
    const left = split.querySelector('.wardrobe-side--column');
    const right = split.querySelector('.wardrobe-side--closet');
  
    function reset() {
      split.classList.remove("is-column-open", "is-closet-open");
      split.classList.add("is-reset");
    }
  
    function openColumn() {
      split.classList.remove("is-reset", "is-closet-open");
      split.classList.add("is-column-open");
    }
  
    function openCloset() {
      split.classList.remove("is-reset", "is-column-open");
      split.classList.add("is-closet-open");
    }
  
    // start neutral
    reset();
  
    left.addEventListener("click", () => {
      if (split.classList.contains("is-column-open")) {
        reset();
      } else {
        openColumn();
      }
    });
  
    right.addEventListener("click", () => {
      if (split.classList.contains("is-closet-open")) {
        reset();
      } else {
        openCloset();
      }
    });
});
*/
/*
document.addEventListener("DOMContentLoaded", () => {
    const split = document.querySelector(".wardrobe-split");
    if (!split) return;
  
    const column = split.querySelector(".wardrobe-side--column");
    const closet = split.querySelector(".wardrobe-side--closet");
  
    function reset() {
      split.classList.remove("is-column-open", "is-closet-open");
    }
  
    function openColumn() {
      split.classList.add("is-column-open");
      split.classList.remove("is-closet-open");
    }
  
    function openCloset() {
      split.classList.add("is-closet-open");
      split.classList.remove("is-column-open");
    }
  
    // ✅ ONE click handler only (prevents both opening)
    split.addEventListener("click", (e) => {
      // ignore clicks on links/buttons inside
      if (e.target.closest("a, button")) return;
  
      const clickedColumn = e.target.closest(".wardrobe-side--column");
      const clickedCloset = e.target.closest(".wardrobe-side--closet");
  
      // if click was not inside either side, ignore
      if (!clickedColumn && !clickedCloset) return;
  
      // ✅ TOGGLE behaviour
      if (clickedColumn) {
        if (split.classList.contains("is-column-open")) reset();
        else openColumn();
      }
  
      if (clickedCloset) {
        if (split.classList.contains("is-closet-open")) reset();
        else openCloset();
      }
    });
});*//*
document.addEventListener("DOMContentLoaded", () => {
    const split = document.querySelector(".wardrobe-split");
    if (!split) return;
  
    const columnSide = split.querySelector(".wardrobe-side--column");
    const closetSide = split.querySelector(".wardrobe-side--closet");
  
    function reset() {
      split.classList.remove("is-column-open", "is-closet-open");
      split.classList.add("is-reset");
    }
  
    function openColumn() {
      split.classList.add("is-column-open");
      split.classList.remove("is-closet-open", "is-reset");
    }
  
    function openCloset() {
      split.classList.add("is-closet-open");
      split.classList.remove("is-column-open", "is-reset");
    }
  
    // default
    reset();
  
    // IMPORTANT: Use pointer events (works on mobile + desktop)
    split.addEventListener("pointerdown", (e) => {
      // ignore clicks on links/buttons inside
      if (e.target.closest("a, button")) return;
  
      const tappedColumn = e.target.closest(".wardrobe-side--column");
      const tappedCloset = e.target.closest(".wardrobe-side--closet");
  
      if (tappedColumn) {
        if (split.classList.contains("is-column-open")) reset();
        else openColumn();
        return;
      }
  
      if (tappedCloset) {
        if (split.classList.contains("is-closet-open")) reset();
        else openCloset();
        return;
      }
    });
});
*/
document.addEventListener("DOMContentLoaded", () => {
    const split = document.querySelector(".wardrobe-split");
    if (!split) return;
  
    function reset() {
      split.classList.remove("is-column-open", "is-closet-open");
      split.classList.add("is-reset");
    }
    function openColumn() {
      split.classList.add("is-column-open");
      split.classList.remove("is-closet-open", "is-reset");
    }
    function openCloset() {
      split.classList.add("is-closet-open");
      split.classList.remove("is-column-open", "is-reset");
    }
  
    reset();
  
    split.addEventListener("click", (e) => {
      if (e.target.closest("a, button")) return;
  
      const isColumn = e.target.closest(".wardrobe-side--column");
      const isCloset = e.target.closest(".wardrobe-side--closet");
  
      if (isColumn) {
        split.classList.contains("is-column-open") ? reset() : openColumn();
      }
      if (isCloset) {
        split.classList.contains("is-closet-open") ? reset() : openCloset();
      }
    });
    split.querySelectorAll(".wardrobe-close").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation(); // stops triggering the open logic
          reset();
        });
    });
      
});

  