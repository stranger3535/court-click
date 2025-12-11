document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if(navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      // Simple visual toggle for the hamburger lines if you add CSS for it
      navToggle.classList.toggle('open');
    });
  }

  // 2. FAQ Accordion (Class Based for + to X rotation)
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    
    trigger.addEventListener('click', () => {
      // Check if this item is already open
      const isOpen = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // If it wasn't open, open it now
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // 3. Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if(targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if(targetElement){
        // Close mobile menu if open
        navLinks.classList.remove('active');
        
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});