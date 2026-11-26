const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const darkModeToggle = document.getElementById("darkModeToggle");
const backToTop = document.getElementById("backToTop");

// Mobile navigation
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    hamburger.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Open navigation menu");
      hamburger.textContent = "☰";
    });
  });

  document.addEventListener("click", (e) => {
    if (!navLinks.classList.contains("show")) return;
    if (e.target.closest(".nav")) return;
    navLinks.classList.remove("show");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open navigation menu");
    hamburger.textContent = "☰";
  });
}

// Dark mode
function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);
  if (darkModeToggle) {
    darkModeToggle.textContent = isDark ? "☀️" : "🌙";
    darkModeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || savedTheme === "light") {
  applyTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  applyTheme("dark");
} else {
  applyTheme("light");
}

darkModeToggle?.addEventListener("click", () => {
  const next = document.body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("theme", next);
  applyTheme(next);
});

// Scroll reveal
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("active"));
}

// Back to top
function toggleBackToTop() {
  if (!backToTop) return;
  backToTop.classList.toggle("show", window.scrollY > 400);
}
window.addEventListener("scroll", toggleBackToTop, { passive: true });
toggleBackToTop();
backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Counters
const counters = document.querySelectorAll(".counter[data-target]");
if ("IntersectionObserver" in window && counters.length) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.target);
        if (!Number.isFinite(target)) return;
        const duration = 1400;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const value = Math.floor(progress * target);
          el.textContent = String(value);
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = `${target}+`;
        };
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((c) => counterObserver.observe(c));
} else {
  counters.forEach((c) => {
    const t = c.dataset.target;
    if (t) c.textContent = `${t}+`;
  });
}

const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnHTML = submitBtn ? submitBtn.innerHTML : 'Send Message';

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        formStatus.textContent = 'Please fill in your name, a valid email address, and your message.';
        contactForm.reportValidity();
        return;
      }

      const endpoint = contactForm.getAttribute('action');
      const nameInput = contactForm.querySelector('#name');
      const sender = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'there';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }
      formStatus.textContent = '';

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' }
        });

        if (response.ok) {
          formStatus.textContent = `Thanks, ${sender}! Your project inquiry has been sent.`;
          contactForm.reset();
        } else {
          const data = await response.json().catch(() => ({}));
          formStatus.textContent =
            data.errors && data.errors.length > 0
              ? data.errors.map((err) => err.message).join(', ')
              : 'Something went wrong sending your message. Please try again.';
        }
      } catch (error) {
        formStatus.textContent = 'Network error—please check your connection and try again.';
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }
      }
    });
  }