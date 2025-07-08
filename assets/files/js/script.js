'use strict';

// Function to toggle element visibility
const toggleElement = function(elem) {
  elem.classList.toggle('active');
};

// Sidebar variables
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

// Toggle sidebar for mobile
sidebarBtn.addEventListener('click', function() {
  toggleElement(sidebar);
});

// Testimonials variables
const testimonialsItems = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

// Function to toggle modal
const toggleModal = function() {
  toggleElement(modalContainer);
  toggleElement(overlay);
};

// Open modal when clicking on testimonials items
testimonialsItems.forEach(item => {
  item.addEventListener('click', function() {
    const avatarSrc = this.querySelector('[data-testimonials-avatar]').src;
    const avatarAlt = this.querySelector('[data-testimonials-avatar]').alt;
    const title = this.querySelector('[data-testimonials-title]').innerHTML;
    const text = this.querySelector('[data-testimonials-text]').innerHTML;

    document.querySelector('[data-modal-img]').src = avatarSrc;
    document.querySelector('[data-modal-img]').alt = avatarAlt;
    document.querySelector('[data-modal-title]').innerHTML = title;
    document.querySelector('[data-modal-text]').innerHTML = text;

    toggleModal();
  });
});

// Close modal when clicking close button or overlay
modalCloseBtn.addEventListener('click', toggleModal);
overlay.addEventListener('click', toggleModal);

// Custom select variables
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterItems = document.querySelectorAll('[data-filter-item]');
const filterBtns = document.querySelectorAll('[data-filter-btn]');

// Toggle select dropdown
select.addEventListener('click', function() {
  toggleElement(select);
});

// Filter function based on selected value
const filterFunc = function(selectedValue) {
  filterItems.forEach(item => {
    if (selectedValue === 'all' || selectedValue === item.dataset.category) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
};

// Add click event to select items
selectItems.forEach(item => {
  item.addEventListener('click', function() {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    toggleElement(select);
    filterFunc(selectedValue);
  });
});

// Add click event to filter buttons
let lastClickedBtn = filterBtns[0];

filterBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove('active');
    this.classList.add('active');
    lastClickedBtn = this;
  });
});

// Contact form variables
const form = document.querySelector('[data-form]');
const formBtn = document.querySelector('[data-form-btn]');
const formInputs = document.querySelectorAll('[data-form-input]');

// Function to handle form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Send email using EmailJS
  emailjs.sendForm('SERVICE ID', 'TEMPLATE ID', this)
      .then(function(response) {
        console.log('Email sent:', response);
        // Show success message and reset form
        form.reset();
        formBtn.setAttribute('disabled', 'disabled');
        formBtn.innerHTML = '<ion-icon name="checkmark-circle"></ion-icon> Thanks, Message Sent Successfully';
      }, function(error) {
        console.error('Email send error:', error);
        // Handle errors and show appropriate message to user
        formBtn.innerHTML = '<ion-icon name="alert-circle"></ion-icon> Failed to send message. Please try again later.';
      });
});

// Enable or disable form button based on form validity
formInputs.forEach(input => {
  input.addEventListener('input', function() {
    if (form.checkValidity()) {
      formBtn.removeAttribute('disabled');
    } else {
      formBtn.setAttribute('disabled', 'disabled');
    }
  });
});

// Page navigation variables
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

// Function to handle page navigation
navigationLinks.forEach(link => {
  link.addEventListener('click', function() {
    navigationLinks.forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');

    const pageName = this.innerHTML.toLowerCase();
    pages.forEach(page => {
      if (page.dataset.page === pageName) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });

    window.scrollTo(0, 0);
  });
});
