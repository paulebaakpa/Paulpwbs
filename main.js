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
