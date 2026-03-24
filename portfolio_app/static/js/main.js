// Loading animation
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 500);
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Back to top button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll animations (fade-in)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(section);
});

// ─── EmailJS Contact Form ────────────────────────────────────────────
// IMPORTANT: Replace these three values with your own from https://www.emailjs.com/
//   1. Go to emailjs.com → sign up free
//   2. Add an Email Service (e.g. Gmail) → copy the Service ID
//   3. Create an Email Template → copy the Template ID
//   4. Go to Account → copy the Public Key
const EMAILJS_PUBLIC_KEY = 'ABuj6pwBSVh6SULYE';
const EMAILJS_SERVICE_ID = 'service_q7bqn6n';
const EMAILJS_TEMPLATE_ID = 'template_d99rpmv';

emailjs.init(EMAILJS_PUBLIC_KEY);

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const contactBtn = document.getElementById('contact-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Show loading state
        contactBtn.disabled = true;
        contactBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formStatus.classList.add('d-none');

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
            .then(function () {
                // Success
                formStatus.className = 'alert alert-success';
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                formStatus.classList.remove('d-none');
                contactForm.reset();
            })
            .catch(function (error) {
                // Error
                console.error('EmailJS error:', error);
                formStatus.className = 'alert alert-danger';
                formStatus.textContent = 'Oops! Something went wrong. Please try again or email me directly.';
                formStatus.classList.remove('d-none');
            })
            .finally(function () {
                contactBtn.disabled = false;
                contactBtn.innerHTML = 'Send Message';
            });
    });
}