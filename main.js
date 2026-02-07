// ---------- SMOOTH SCROLL ----------
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document
      .querySelector(link.getAttribute('href'))
      ?.scrollIntoView({ behavior: 'smooth' });

    // Close mobile menu after click
    navLinks.classList.remove('show');
    hamburger.classList.remove('active');
  });
});


// ---------- CARD CLICK ----------
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const page = card.dataset.page;
    if (page) window.location.href = page;
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
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  hamburger.classList.toggle('active');
});
