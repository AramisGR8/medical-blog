const dropdown = document.querySelector('.nav-dropdown');
const panel    = document.querySelector('.dropdown-panel');

// Click to toggle open/close
dropdown.querySelector('.nav-trigger').addEventListener('click', (e) => {
  e.preventDefault();
  panel.classList.toggle('open');
});

// Close when clicking outside the dropdown
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-dropdown')) {
    panel.classList.remove('open');
  }
});

// Close when a menu item link is clicked
panel.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    panel.classList.remove('open');
  });
});