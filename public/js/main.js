// This file runs in the browser.
// It opens and closes the navigation menu on small screens.

const menuButton = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// When the menu button is clicked, the "open" class is added or removed.
// The CSS shows the menu only when it has the "open" class.
menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  // aria-expanded tells screen readers if the menu is open.
  menuButton.setAttribute('aria-expanded', String(isOpen));
});