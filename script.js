
/* ==========================================
   CHERIF HAÏDARA — PORTFOLIO
   JavaScript : navigation, formulaire et UX
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // 1. ANNÉE AUTOMATIQUE DANS LE FOOTER
  // ========================================

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ========================================
  // 2. MENU MOBILE
  // ========================================

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav a");

  function closeMenu() {
    if (!menuToggle || !nav) return;

    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    menuToggle.textContent = "☰";
  }

  function openMenu() {
    if (!menuToggle || !nav) return;

    nav.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fermer le menu");
    menuToggle.textContent = "✕";
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Fermer le menu après un clic sur un lien
    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Fermer le menu avec la touche Échap
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Fermer le menu lorsqu'on clique à l'extérieur
    document.addEventListener("click", (event) => {
      const clickedInsideNav = nav.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideNav && !clickedToggle) {
        closeMenu();
      }
    });

    // Refermer le menu lorsque l'écran redevient large
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // ========================================
  // 3. NAVIGATION FLUIDE
  // ========================================

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "start",
      });

      // Mettre à jour le fragment de l'URL
      if (window.location.hash !== targetId) {
        history.pushState(null, "", targetId);
      }
    });
  });

  // ========================================
  // 4. MISE EN ÉVIDENCE DE LA SECTION ACTIVE
  // ========================================

  const sections = document.querySelectorAll("main section[id]");
  const mainNavLinks = document.querySelectorAll(
    '.nav a[href^="#"]'
  );

  if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const activeId = `#${entry.target.id}`;

          mainNavLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === activeId;

            if (isActive) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // ========================================
  // 5. FORMULAIRE DE CONTACT
  // ========================================

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  /*
    IMPORTANT :
    Remplace cette adresse par ton adresse email professionnelle.
    Le formulaire ouvrira l'application email de l'utilisateur.
    Ce script n'envoie pas de message directement depuis le site.
  */

  const recipientEmail = "haidarawordbusy@gmail";

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) {
        return;
      }

      const formData = new FormData(contactForm);

      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const subject = String(formData.get("subject") || "").trim();
      const message = String(formData.get("message") || "").trim();

      if (!name || !email || !subject || !message) {
        if (formStatus) {
          formStatus.textContent =
            "Veuillez remplir tous les champs obligatoires.";
        }
        return;
      }

      if (
        recipientEmail === "votre-email@exemple.com" ||
        !recipientEmail.includes("@")
      ) {
        if (formStatus) {
          formStatus.textContent =
            "Configurez votre adresse email dans script.js avant de tester le formulaire.";
        }
        return;
      }

      const emailSubject = `Portfolio — ${subject}`;

      const emailBody = [
        "Bonjour Cherif,",
        "",
        "Vous avez reçu un nouveau message depuis votre portfolio.",
        "",
        `Nom : ${name}`,
        `Email : ${email}`,
        `Sujet : ${subject}`,
        "",
        "Message :",
        message,
        "",
        "---",
        "Message envoyé depuis le portfolio de Cherif Haïdara.",
      ].join("\n");

      const mailtoURL =
        `mailto:${recipientEmail}` +
        `?subject=${encodeURIComponent(emailSubject)}` +
        `&body=${encodeURIComponent(emailBody)}`;

      if (formStatus) {
        formStatus.textContent 
          "Ouverture de votre application email…";
      }

      // Ouvrir l'application email par défaut
      window.location.href = mailtoURL;
    });
  }

  // ========================================
  // 6. CONFORT D'UTILISATION
  // ========================================

  // Fermer le menu après le retour via les boutons
  // précédent ou suivant du navigateur.
  window.addEventListener("popstate", closeMenu);

  console.info("Portfolio de Cherif Haïdara initialisé.");
});
