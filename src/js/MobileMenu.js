export default class MobileMenu {
  // class implementation without needing the event listener here
}

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.hamburger__items');
  const closeButton = document.querySelector('.hamburger__close');

  if (hamburger && menu) {
    // Toggle the menu when clicking on the hamburger
    hamburger.addEventListener('click', () => {
      menu.classList.toggle('active');
      hamburger.classList.toggle('open');
    });
  }

  // Close the menu when clicking the close button
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      menu.classList.remove('active');
      hamburger.classList.remove('open');
    });
  }
});
