/* ============================================
   SCROLL ANIMATIONS
   AOS init + IntersectionObserver safety net
   ============================================ */

(function () {
  'use strict';

  // ---- Initialize AOS ----
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      offset: 60,
      once: true,
      easing: 'ease-out-cubic'
      // anchorPlacement removed — default 'top-bottom' was causing fast-scroll misses
    });

    // Signal to CSS that AOS JS has loaded and initialized.
    // Our CSS fallback (html:not(.aos-init)) keeps elements visible
    // until this class is added, then AOS takes full control.
    document.documentElement.classList.add('aos-init');
  }

  // ---- AOS safety net: IntersectionObserver catches elements AOS misses ----
  // AOS can skip elements when the user scrolls quickly (fast-scroll, keyboard,
  // touch-flick). With once:true those elements stay hidden forever.
  // This observer watches every [data-aos] element independently and adds
  // aos-animate the instant even 1px of the element enters the viewport.
  var aosElements = document.querySelectorAll('[data-aos]');

  if (aosElements.length > 0 && 'IntersectionObserver' in window) {
    var safetyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !entry.target.classList.contains('aos-animate')) {
            entry.target.classList.add('aos-animate');
            safetyObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0,
        // Pre-trigger 120px before element enters screen — ensures content
        // is never blank even at high scroll velocity
        rootMargin: '0px 0px 120px 0px'
      }
    );

    aosElements.forEach(function (el) {
      safetyObserver.observe(el);
    });

  } else if (aosElements.length > 0) {
    // No IntersectionObserver support: show everything immediately
    aosElements.forEach(function (el) {
      el.classList.add('aos-animate');
    });
  }

  // ---- Hard timeout fallback ----
  // If any element still has not been animated after 1.5 seconds
  // (e.g. AOS CDN failed, observer race on very slow devices), force-show it.
  // The AOS CSS transition means this still produces a smooth fade-in.
  setTimeout(function () {
    document.querySelectorAll('[data-aos]:not(.aos-animate)').forEach(function (el) {
      el.classList.add('aos-animate');
    });
  }, 1500);

  // ---- Custom reveal observer for .reveal elements ----
  var revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px 60px 0px'
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
