// Wait for the DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
    // ======== EVENT HANDLING ========
    
    // Theme toggle button
    const themeToggleBtn = document.getElementById('theme-toggle');
    let isDarkMode = false;
    
    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        }
    });
    
    // Keypress detection (Press 'S' for a surprise)
    document.addEventListener('keydown', function(event) {
        const keyMessage = document.getElementById('key-message');
        
        // Check if the 'S' key was pressed
        if (event.key === 's' || event.key === 'S') {
            keyMessage.classList.add('show');
            
            // Hide message after 3 seconds
            setTimeout(function() {
                keyMessage.classList.remove('show');
            }, 3000);
        }
    });
    
    // Secret double-click on title
    const title = document.querySelector('h1');
    title.addEventListener('dblclick', function() {
        // Easter egg: Shooting stars animation on double-click
        const container = document.querySelector('.container');
        
        // Create 10 shooting stars
        for (let i = 0; i < 10; i++) {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            
            // Random position and delay
            const left = Math.random() * 100;
            const delay = Math.random() * 1;
            
            star.style.cssText = `
                position: absolute;
                left: ${left}%;
                top: 0;
                width: 2px;
                height: 2px;
                background: white;
                box-shadow: 0 0 5px 2px #fff;
                border-radius: 50%;
                animation: shootingStar 1s ease-in-out ${delay}s;
                z-index: 1000;
            `;
            
            container.appendChild(star);
            
            // Remove after animation completes
            setTimeout(() => {
                container.removeChild(star);
            }, (delay + 1) * 1000);
        }
    });
    
    // Add shooting star animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shootingStar {
            0% { transform: translateY(0) translateX(0) rotate(0); opacity: 1; }
            100% { transform: translateY(100vh) translateX(100px) rotate(45deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // ======== INTERACTIVE ELEMENTS ========
    
    // 1. Tab System
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show the selected tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 2. Image Gallery
    const galleryImages = [
        {
            url: 'https://images.nasa.gov/images/as11-40-5874~orig.jpg',
            caption: 'The Moon - Earth\'s natural satellite'
        },
        {
            url: 'https://images.nasa.gov/images/PIA02013~orig.jpg',
            caption: 'Mars - The Red Planet'
        },
        {
            url: 'https://images.nasa.gov/images/PIA04913~orig.jpg',
            caption: 'Jupiter - The Gas Giant'
        },
        {
            url: 'https://images.nasa.gov/images/PIA08389~orig.jpg',
            caption: 'Saturn - The Ringed Planet'
        }
    ];
    
    let currentImageIndex = 0;
    const galleryImg = document.querySelector('.gallery-img');
    const caption = document.querySelector('.caption');
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');
    const dots = document.querySelectorAll('.dot');
    
    // Initialize gallery
    updateGallery();
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateGallery();
    });
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateGallery();
    });
    
    // Dot indicators click
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentImageIndex = parseInt(this.getAttribute('data-index'));
            updateGallery();
        });
    });
    
    // Update gallery display
    function updateGallery() {
        const currentImage = galleryImages[currentImageIndex];
        
        // Fade out and change image
        galleryImg.style.opacity = '0';
        setTimeout(() => {
            galleryImg.src = currentImage.url;
            caption.textContent = currentImage.caption;
            galleryImg.style.opacity = '1';
        }, 300);
        
        // Update dot indicators
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentImageIndex].classList.add('active');
    }
    
    // Add hover effect to gallery images
    galleryImg.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.02)';
        this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    });
    
    galleryImg.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
    
    // 3. Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-toggle i').className = 'fas fa-plus';
            });
            
            // If clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                item.querySelector('.accordion-toggle i').className = 'fas fa-times';
            }
        });
    });
    
    // ======== FORM VALIDATION ========
    
    const form = document.getElementById('registration-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const termsCheckbox = document.getElementById('terms');
    
    // Real-time name validation
    nameInput.addEventListener('input', function() {
        validateName();
    });
    
    // Real-time email validation
    emailInput.addEventListener('input', function() {
        validateEmail();
    });
    
    // Real-time password validation
    passwordInput.addEventListener('input', function() {
        validatePassword();
    });
    
    // Terms checkbox validation
    termsCheckbox.addEventListener('change', function() {
        validateTerms();
    });
    
    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isTermsChecked = validateTerms();
        
        // If all validations pass
        if (isNameValid && isEmailValid && isPasswordValid && isTermsChecked) {
            // Hide form and show success message
            form.style.display = 'none';
            document.getElementById('submission-feedback').classList.remove('hidden');
            
            // Simulate form submission animation
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        }
    });
    
    // Name validation function
    function validateName() {
        const nameValue = nameInput.value.trim();
        const nameValidation = document.getElementById('name-validation');
        
        if (nameValue === '') {
            nameValidation.textContent = 'Name is required';
            nameValidation.className = 'validation-message error';
            nameInput.style.borderColor = '#e74c3c';
            return false;
        } else if (nameValue.length < 2) {
            nameValidation.textContent = 'Name must be at least 2 characters';
            nameValidation.className = 'validation-message error';
            nameInput.style.borderColor = '#e74c3c';
            return false;
        } else {
            nameValidation.textContent = 'Looks good!';
            nameValidation.className = 'validation-message success';
            nameInput.style.borderColor = '#2ecc71';
            return true;
        }
    }
    
    // Email validation function
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailValidation = document.getElementById('email-validation');
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (emailValue === '') {
            emailValidation.textContent = 'Email is required';
            emailValidation.className = 'validation-message error';
            emailInput.style.borderColor = '#e74c3c';
            return false;
        } else if (!emailRegex.test(emailValue)) {
            emailValidation.textContent = 'Please enter a valid email address';
            emailValidation.className = 'validation-message error';
            emailInput.style.borderColor = '#e74c3c';
            return false;
        } else {
            emailValidation.textContent = 'Valid email address!';
            emailValidation.className = 'validation-message success';
            emailInput.style.borderColor = '#2ecc71';
            return true;
        }
    }
    
    // Password validation function
    function validatePassword() {
        const passwordValue = passwordInput.value;
        const passwordValidation = document.getElementById('password-validation');
        const strengthBar = document.querySelector('.strength-bar');
        
        // Password requirements
        const hasLength = passwordValue.length >= 8;
        const hasUppercase = /[A-Z]/.test(passwordValue);
        const hasLowercase = /[a-z]/.test(passwordValue);
        const hasNumber = /[0-9]/.test(passwordValue);
        
        // Update requirement indicators
        document.getElementById('req-length').innerHTML = hasLength ? 
            '<i class="fas fa-check"></i> At least 8 characters' : 
            '<i class="fas fa-times"></i> At least 8 characters';
            
        document.getElementById('req-uppercase').innerHTML = hasUppercase ? 
            '<i class="fas fa-check"></i> At least 1 uppercase letter' : 
            '<i class="fas fa-times"></i> At least 1 uppercase letter';
            
        document.getElementById('req-lowercase').innerHTML = hasLowercase ? 
            '<i class="fas fa-check"></i> At least 1 lowercase letter' : 
            '<i class="fas fa-times"></i> At least 1 lowercase letter';
            
        document.getElementById('req-number').innerHTML = hasNumber ? 
            '<i class="fas fa-check"></i> At least 1 number' : 
            '<i class="fas fa-times"></i> At least 1 number';
        
        // Calculate password strength
        let strength = 0;
        if (hasLength) strength += 25;
        if (hasUppercase) strength += 25;
        if (hasLowercase) strength += 25;
        if (hasNumber) strength += 25;
        
        // Update strength bar
        strengthBar.style.width = strength + '%';
        
        // Set color based on strength
        if (strength < 50) {
            strengthBar.style.backgroundColor = '#e74c3c'; // Weak
        } else if (strength < 100) {
            strengthBar.style.backgroundColor = '#f39c12'; // Medium
        } else {
            strengthBar.style.backgroundColor = '#2ecc71'; // Strong
        }
        
        // Validation message
        if (passwordValue === '') {
            passwordValidation.textContent = 'Password is required';
            passwordValidation.className = 'validation-message error';
            passwordInput.style.borderColor = '#e74c3c';
            return false;
        } else if (!hasLength || !hasUppercase || !hasLowercase || !hasNumber) {
            passwordValidation.textContent = 'Password does not meet all requirements';
            passwordValidation.className = 'validation-message error';
            passwordInput.style.borderColor = '#e74c3c';
            return false;
        } else {
            passwordValidation.textContent = 'Strong password!';
            passwordValidation.className = 'validation-message success';
            passwordInput.style.borderColor = '#2ecc71';
            return true;
        }
    }
    
    // Terms validation function
    function validateTerms() {
        const termsValidation = document.getElementById('terms-validation');
        
        if (!termsCheckbox.checked) {
            termsValidation.textContent = 'You must agree to the terms and conditions';
            termsValidation.className = 'validation-message error';
            return false;
        } else {
            termsValidation.textContent = '';
            return true;
        }
    }
});