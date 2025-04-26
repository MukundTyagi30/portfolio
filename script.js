// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileMenu();
    initThemeToggle();
    initScrollToTop();
    initTypingAnimation();
    initActiveNavLinks();
    initContactForm();
});

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });

        // Close mobile menu when a link is clicked
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            });
        });
    }
}

// Dark mode toggle
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
    const lightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');

    // Check for saved theme preference or use the system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    
    // Set the initial theme
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');
        darkIconMobile.classList.add('hidden');
        lightIconMobile.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        darkIcon.classList.remove('hidden');
        lightIcon.classList.add('hidden');
        darkIconMobile.classList.remove('hidden');
        lightIconMobile.classList.add('hidden');
    }

    // Theme toggle function
    function toggleTheme() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            darkIcon.classList.remove('hidden');
            lightIcon.classList.add('hidden');
            darkIconMobile.classList.remove('hidden');
            lightIconMobile.classList.add('hidden');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            darkIcon.classList.add('hidden');
            lightIcon.classList.remove('hidden');
            darkIconMobile.classList.add('hidden');
            lightIconMobile.classList.remove('hidden');
        }
    }

    // Add event listeners to toggle buttons
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleMobileBtn) {
        themeToggleMobileBtn.addEventListener('click', toggleTheme);
    }
}

// Scroll to top button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-10');
                scrollToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-10');
                scrollToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
            }
        });
        
        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Typing animation for hero section
function initTypingAnimation() {
    const typedTextElement = document.getElementById('typed-text');
    
    if (typedTextElement) {
        const textArray = [
            "Aspiring Data Scientist",
            "AI & Machine Learning Enthusiast",
            "Python Developer"
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentText = textArray[textIndex];
            
            if (isDeleting) {
                // Deleting text
                typedTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                // Typing text
                typedTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            // If completed typing the current text
            if (!isDeleting && charIndex === currentText.length) {
                // Pause at the end
                isDeleting = true;
                typingSpeed = 1000;
            } 
            // If completed deleting the current text
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                typingSpeed = 500;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start the typing animation
        setTimeout(type, 1000);
    }
}

// Highlight active section in navigation
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Adjust this value if needed
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success-message');
    const resetFormBtn = document.getElementById('reset-form-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulating form submission (would be replaced with actual logic in production)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Hide the form and show success message
                contactForm.classList.add('hidden');
                successMessage.classList.remove('hidden');
                
                // Reset form for future use
                contactForm.reset();
                
                // Restore button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 1500);
        });
        
        // Add event listener for the "Send Another Message" button
        if (resetFormBtn) {
            resetFormBtn.addEventListener('click', function() {
                successMessage.classList.add('hidden');
                contactForm.classList.remove('hidden');
            });
        }
    }
} 