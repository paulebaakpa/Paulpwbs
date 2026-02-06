// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
      ?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Card click → open project page
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const page = card.dataset.page;
    if (page) {
      window.location.href = page;
    }
  });
});

document.querySelectorAll('.dropdown-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    item.classList.toggle('active');
  });
});

document.querySelectorAll('.dropdown-header').forEach(header => {
  header.addEventListener('click', () => {
    header.parentElement.classList.toggle('active');
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

// ---------------- HAMBURGER MENU ----------------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

