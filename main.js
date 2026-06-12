// ---------- ELEMENTS ----------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll("nav a");
const backToTop = document.getElementById("backToTop");
const darkModeToggle = document.getElementById("darkModeToggle");


// ---------- SMOOTH SCROLL ----------
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }

    // Close mobile menu after click
    navLinks?.classList.remove('show');
    hamburger?.classList.remove('active');
  });
});


// ---------- ACTIVE NAV ON SCROLL ----------
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;

    if (scrollY >= sectionTop - 120) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});


// ---------- CARD CLICK ----------
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const page = card.dataset.page;

    if (page) {
      window.location.href = page;
    }
  });
});



// ---------- DROPDOWN ACCORDION ----------
document.querySelectorAll('.dropdown-header').forEach(header => {
  header.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-item').forEach(item => {
      if (item !== header.parentElement) {
        item.classList.remove('active');
      }
    });

    header.parentElement.classList.toggle('active');
  });
});


// ---------- HAMBURGER MENU ----------
hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('show');
  hamburger.classList.toggle('active');
});


// ---------- DARK MODE (WITH SAVE) ----------
if (darkModeToggle) {

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  darkModeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark")
      ? "dark"
      : "light"
    );

  });

}

if(localStorage.getItem("theme")==="dark"){

 document.body.classList.add("dark");
}


// ---------- SCROLL REVEAL ----------
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
});


// ---------- BACK TO TOP BUTTON ----------
window.addEventListener("scroll", () => {
  if (backToTop) {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  }
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

  const updateCounter = () => {

    const target = +counter.dataset.target;

    const count = +counter.innerText;

    const increment = target / 100;

    if(count < target){

      counter.innerText =
      Math.ceil(count + increment);

      setTimeout(updateCounter,20);

    } else {

      counter.innerText = target + "+";
    }
  }

  updateCounter();
});

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;

});


const words = [
  "Front-End Developer",
  "JavaScript Developer",
  "UI Designer",
  "Problem Solver"
];

let wordIndex = 0;
const typing = document.getElementById("typing");

setInterval(() => {
  typing.textContent = words[wordIndex];
  wordIndex = (wordIndex + 1) % words.length;
}, 2000);

const interactiveElements =
document.querySelectorAll(
  ".btn, .skill-card, .project-card, a"
);

interactiveElements.forEach(item => {

  item.addEventListener("mouseenter", () => {

    glow.style.width = "500px";
    glow.style.height = "500px";

  });

  item.addEventListener("mouseleave", () => {

    glow.style.width = "350px";
    glow.style.height = "350px";

  });

});