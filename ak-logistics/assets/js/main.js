/**
 * AK LOGISTICS COMPANY - MAIN JAVASCRIPT
 * Location: Riyadh, Kingdom of Saudi Arabia
 * Handles UI interactions, navbar state, client-side form validation,
 * conversion events, and quote redirection.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Back to Top Button Visibility
  const backToTopBtn = document.getElementById('backToTopBtn');

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;

    if (backToTopBtn) {
      if (scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Back to Top Smooth Scroll
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Auto-close mobile navbar on link click
  const navLinks = document.querySelectorAll('.ak-navbar .nav-link:not(.dropdown-toggle), .ak-navbar .dropdown-item');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // 4. Highlight Active Navigation Item
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.ak-navbar .nav-link, .ak-navbar .dropdown-item');
  
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
      // If it's a dropdown item, also highlight the parent dropdown toggle
      const parentDropdown = link.closest('.dropdown');
      if (parentDropdown) {
        const toggle = parentDropdown.querySelector('.dropdown-toggle');
        if (toggle) {
          toggle.classList.add('active');
        }
      }
    }
  });

  // 5. Quote Form Validation & Redirect to thank-you.html
  const quoteForm = document.getElementById('akQuoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!quoteForm.checkValidity()) {
        quoteForm.classList.add('was-validated');
        // Focus first invalid element
        const firstInvalid = quoteForm.querySelector(':invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      // Collect data to show on thank you page
      const quoteData = {
        fullName: quoteForm.elements['fullName'] ? quoteForm.elements['fullName'].value : '',
        companyName: quoteForm.elements['companyName'] ? quoteForm.elements['companyName'].value : '',
        email: quoteForm.elements['email'] ? quoteForm.elements['email'].value : '',
        phone: quoteForm.elements['phone'] ? quoteForm.elements['phone'].value : '',
        service: quoteForm.elements['service'] ? quoteForm.elements['service'].value : '',
        pickupLocation: quoteForm.elements['pickupLocation'] ? quoteForm.elements['pickupLocation'].value : '',
        deliveryLocation: quoteForm.elements['deliveryLocation'] ? quoteForm.elements['deliveryLocation'].value : '',
        submittedAt: new Date().toISOString()
      };

      try {
        sessionStorage.setItem('ak_quote_submission', JSON.stringify(quoteData));
      } catch (err) {
        console.warn('Session storage write failed:', err);
      }

      // Safe placeholder call for Google Ads conversion tracking
      triggerConversionEvent('AW-CONVERSION-ID/QUOTE_SUBMISSION', {
        service: quoteData.service,
        currency: 'SAR'
      });

      // Show temporary loading state
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing Quote Request...';
      }

      // Redirect to thank-you.html
      setTimeout(() => {
        window.location.href = 'thank-you.html';
      }, 500);
    });
  }

  // 6. Contact Form Validation
  const contactForm = document.getElementById('akContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        const firstInvalid = contactForm.querySelector(':invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      const contactData = {
        fullName: contactForm.elements['fullName'] ? contactForm.elements['fullName'].value : '',
        email: contactForm.elements['email'] ? contactForm.elements['email'].value : '',
        phone: contactForm.elements['phone'] ? contactForm.elements['phone'].value : '',
        subject: contactForm.elements['subject'] ? contactForm.elements['subject'].value : 'General Inquiry',
        submittedAt: new Date().toISOString()
      };

      try {
        sessionStorage.setItem('ak_quote_submission', JSON.stringify(contactData));
      } catch (err) {
        console.warn('Session storage write failed:', err);
      }

      triggerConversionEvent('AW-CONVERSION-ID/CONTACT_SUBMISSION', {
        subject: contactData.subject
      });

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending Message...';
      }

      setTimeout(() => {
        window.location.href = 'thank-you.html';
      }, 500);
    });
  }

  // 7. Thank You Page Data Population
  const thankYouSummary = document.getElementById('thankYouSummary');
  if (thankYouSummary) {
    try {
      const savedData = sessionStorage.getItem('ak_quote_submission');
      if (savedData) {
        const data = JSON.parse(savedData);
        if (data.fullName) {
          const nameSpan = document.getElementById('submittedName');
          if (nameSpan) nameSpan.textContent = data.fullName;
        }
        if (data.service) {
          const serviceSpan = document.getElementById('submittedService');
          if (serviceSpan) serviceSpan.textContent = data.service;
        }
        if (data.phone) {
          const phoneSpan = document.getElementById('submittedPhone');
          if (phoneSpan) phoneSpan.textContent = data.phone;
        }
      }
    } catch (e) {
      console.warn('Could not read session submission:', e);
    }
  }

  // 8. Google Ads Conversion Trigger Helper
  function triggerConversionEvent(conversionTag, metadata) {
    // If Google Ads gtag is initialized by webmaster
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        'send_to': conversionTag,
        ...metadata
      });
      console.info('[AK Logistics Tracking] Triggered conversion event:', conversionTag, metadata);
    } else {
      console.info('[AK Logistics Tracking Placeholder] Conversion ready for tag:', conversionTag, metadata);
    }
  }

  // 9. Hero Section Slider Controls
  const heroPrevBtn = document.querySelector('.ak-prev-btn');
  const heroNextBtn = document.querySelector('.ak-next-btn');
  const heroCounter = document.querySelector('.ak-slider-counter');
  const heroProgressBar = document.querySelector('.ak-slider-bar-active');
  const heroTitle = document.querySelector('.ak-hero-cinematic-title');
  const heroDesc = document.querySelector('.ak-hero-cinematic-desc');
  const heroBg = document.getElementById('akHeroBg');

  if (heroPrevBtn && heroNextBtn && heroCounter) {
    const slides = [
      {
        title: "Smarter Transport. Faster Deliveries. Nationwide Reach.",
        desc: "Experience technology-driven transport solutions built for speed, safety, and efficiency — from freight and logistics to last-mile delivery.",
        counter: "01",
        progress: "33%",
        image: "assets/images/hero-slide-1.jpg"
      },
      {
        title: "Strategic Warehousing & Temperature-Controlled Storage.",
        desc: "Secure, state-of-the-art storage facilities in Riyadh equipped with advanced WMS, 24/7 security, and flexible pallet racking.",
        counter: "02",
        progress: "66%",
        image: "assets/images/hero-slide-2.jpg"
      },
      {
        title: "End-to-End 3PL & Scalable Supply Chain Management.",
        desc: "Connecting businesses across Saudi Arabia with optimized distribution networks, real-time tracking, and verified SLA delivery standards.",
        counter: "03",
        progress: "100%",
        image: "assets/images/hero-slide-3.jpg"
      }
    ];

    let currentSlide = 0;

    const updateSlide = (index) => {
      currentSlide = (index + slides.length) % slides.length;
      const slide = slides[currentSlide];

      // Fade transition for background image
      if (heroBg && slide.image) {
        heroBg.style.transition = 'opacity 0.4s ease';
        heroBg.style.opacity = '0.3';
        setTimeout(() => {
          heroBg.style.backgroundImage = `url('${slide.image}')`;
          heroBg.style.opacity = '1';
        }, 200);
      }
      
      if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(8px)';
        setTimeout(() => {
          heroTitle.textContent = slide.title;
          heroTitle.style.transition = 'all 0.35s ease';
          heroTitle.style.opacity = '1';
          heroTitle.style.transform = 'translateY(0)';
        }, 150);
      }

      if (heroDesc) {
        heroDesc.style.opacity = '0';
        setTimeout(() => {
          heroDesc.textContent = slide.desc;
          heroDesc.style.transition = 'all 0.35s ease';
          heroDesc.style.opacity = '1';
        }, 150);
      }

      if (heroCounter) heroCounter.textContent = slide.counter;
      if (heroProgressBar) heroProgressBar.style.width = slide.progress;
    };

    heroNextBtn.addEventListener('click', () => {
      updateSlide(currentSlide + 1);
      resetAutoSlide();
    });
    
    heroPrevBtn.addEventListener('click', () => {
      updateSlide(currentSlide - 1);
      resetAutoSlide();
    });

    // 4-Second Automatic Sliding Timer
    let slideInterval = setInterval(() => {
      updateSlide(currentSlide + 1);
    }, 4000);

    const resetAutoSlide = () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(() => {
        updateSlide(currentSlide + 1);
      }, 4000);
    };

    // Pause on hover over hero frame so user can read comfortably
    const heroFrame = document.querySelector('.ak-hero-frame');
    if (heroFrame) {
      heroFrame.addEventListener('mouseenter', () => clearInterval(slideInterval));
      heroFrame.addEventListener('mouseleave', () => resetAutoSlide());
    }
  }
});
