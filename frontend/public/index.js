// Select the burger menu icon and navigation links
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-right-links');

// Add a click event listener to the burger icon
burger.addEventListener('click', () => {
    // Toggle the 'active' class on the navigation links
    navLinks.classList.toggle('active');
    
    // Toggle a class on the burger icon for animation
    burger.classList.toggle('toggle');
});
