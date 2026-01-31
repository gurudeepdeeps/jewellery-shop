/**
 * Premium Jewelry Shop - Enhanced Interactions
 * Modern JavaScript for premium user experience
 */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        
        // Initialize all premium features
        initScrollAnimations();
        initParallaxEffect();
        initSmoothScroll();
        initProductHoverEffects();
        initQuantityControls();
        initSearchEnhancements();
        initLoadingAnimations();
        initTooltips();
        
        console.log('Premium enhancements initialized ✨');
    });

    /**
     * Scroll Animations for Elements
     */
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add stagger animation for children
                    const children = entry.target.querySelectorAll('.product, .category-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with animation class
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
    }

    /**
     * Parallax Effect for Hero Section
     */
    function initParallaxEffect() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    /**
     * Smooth Scroll for Anchor Links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    /**
     * Enhanced Product Hover Effects
     */
    function initProductHoverEffects() {
        const products = document.querySelectorAll('.product');
        
        products.forEach(product => {
            const overlay = product.querySelector('.product-overlay');
            if (!overlay) return;

            product.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            // Add shimmer effect on hover
            product.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                this.style.transform = `
                    translateY(-15px) 
                    rotateX(${deltaY * 5}deg) 
                    rotateY(${deltaX * 5}deg)
                `;
            });

            product.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
        });
    }

    /**
     * Quantity Control Buttons
     */
    function initQuantityControls() {
        // Increment buttons
        document.querySelectorAll('.inc-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const input = this.parentElement.querySelector('input[name="quantity"]');
                if (input) {
                    const currentValue = parseInt(input.value) || 1;
                    input.value = currentValue + 1;
                    animateButton(this);
                }
            });
        });

        // Decrement buttons
        document.querySelectorAll('.dec-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const input = this.parentElement.querySelector('input[name="quantity"]');
                if (input) {
                    const currentValue = parseInt(input.value) || 1;
                    if (currentValue > 1) {
                        input.value = currentValue - 1;
                        animateButton(this);
                    }
                }
            });
        });
    }

    /**
     * Animate Button Click
     */
    function animateButton(button) {
        button.style.transform = 'scale(1.5)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }

    /**
     * Search Bar Enhancements
     */
    function initSearchEnhancements() {
        const searchInputs = document.querySelectorAll('input[type="search"], .search-bar input');
        
        searchInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.transition = 'all 0.3s ease';
            });

            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
    }

    /**
     * Loading Animations for Images
     */
    function initLoadingAnimations() {
        const images = document.querySelectorAll('img[src]');
        
        images.forEach(img => {
            if (!img.complete) {
                img.style.opacity = '0';
                img.addEventListener('load', function() {
                    this.style.transition = 'opacity 0.5s ease';
                    this.style.opacity = '1';
                });
            }
        });
    }

    /**
     * Initialize Bootstrap Tooltips
     */
    function initTooltips() {
        // Check if Bootstrap tooltip is available
        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
            const tooltipTriggerList = [].slice.call(
                document.querySelectorAll('[data-bs-toggle="tooltip"]')
            );
            tooltipTriggerList.map(function(tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }
    }

    /**
     * Add to Cart Animation
     */
    function animateAddToCart(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check me-2"></i>Added!';
        button.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    }

    // Attach add to cart animation to all cart buttons
    document.querySelectorAll('form[action*="add-to-cart"] button[type="submit"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const form = this.closest('form');
            if (form) {
                setTimeout(() => {
                    animateAddToCart(this);
                }, 100);
            }
        });
    });

    /**
     * Wishlist Heart Animation
     */
    document.querySelectorAll('.fa-heart').forEach(heart => {
        heart.parentElement.addEventListener('click', function(e) {
            if (this.tagName === 'A' || this.tagName === 'BUTTON') {
                const icon = this.querySelector('.fa-heart');
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = 'var(--primary-gold)';
                    
                    // Create pulse animation
                    icon.style.animation = 'heartPulse 0.5s ease';
                    setTimeout(() => {
                        icon.style.animation = '';
                    }, 500);
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = '';
                }
            }
        });
    });

    /**
     * Navbar Scroll Effect
     */
    let lastScroll = 0;
    const navbar = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 8px 30px rgba(0,0,0,0.25)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            navbar.style.padding = '1rem 0';
        }
        
        lastScroll = currentScroll;
    });

    /**
     * Category Card Hover Shine Effect
     */
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', x + 'px');
            this.style.setProperty('--mouse-y', y + 'px');
        });
    });

    /**
     * Counter Animation for Stats
     */
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.ceil(start);
            }
        }, 16);
    }

    // Initialize counters when visible
    const counters = document.querySelectorAll('.counter-value');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    animateCounter(entry.target, target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    /**
     * Image Lazy Loading Enhancement
     */
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

})();

// Add heart pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes heartPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
    }
`;
document.head.appendChild(style);
