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
  
/* WARDROBE SPLIT SECTION */
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

/* MOBILE COIN SLIDE 

document.addEventListener('DOMContentLoaded', () => {

    const coins = document.querySelectorAll('.hexon-flip-card');
    const panel = document.getElementById('coinInfoPanel');
    const title = document.getElementById('coinInfoTitle');
    const text = document.getElementById('coinInfoText');

    function closePanel(){
        panel.classList.remove('active');
        coins.forEach(c => {
            c.classList.remove('active','dimmed');
        });
    }

    coins.forEach(coin => {
        coin.addEventListener('click', e => {
            e.stopPropagation();

            const isAlreadyActive = coin.classList.contains('active');

            closePanel();

            if (!isAlreadyActive){
                coin.classList.add('active');
                coins.forEach(c => {
                    if (c !== coin) c.classList.add('dimmed');
                });

                title.textContent = coin.dataset.title;
                text.textContent = coin.dataset.text;

                panel.classList.add('active');
            }
        });
    });

    document.addEventListener('click', closePanel);
});
*/
document.addEventListener('DOMContentLoaded', () => {

    const cards = document.querySelectorAll('.hexon-flip-card');
    const panel = document.getElementById('coinInfoPanel');
    const title = document.getElementById('coinInfoTitle');
    const text = document.getElementById('coinInfoText');

    cards.forEach(card => {
        card.addEventListener('click', e => {
            e.stopPropagation();

            const isOpen = card.classList.contains('active');

            // Reset all
            document.body.classList.remove('panel-open');
            cards.forEach(c => {
                c.classList.remove('active');
                c.classList.remove('dimmed');
            });
            panel.classList.remove('active');

            if (!isOpen) {
                title.textContent = card.dataset.title;
                text.textContent = card.dataset.text;

                document.body.classList.add('panel-open');
                card.classList.add('active');
                panel.classList.add('active');

                cards.forEach(c => {
                    if (c !== card) c.classList.add('dimmed');
                });
            }
        });
    });

    // Tap outside closes
    document.addEventListener('click', () => {
        document.body.classList.remove('panel-open');
        panel.classList.remove('active');
        cards.forEach(c => {
            c.classList.remove('active');
            c.classList.remove('dimmed');
        });
    });

});

  