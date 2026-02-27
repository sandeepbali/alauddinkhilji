/* ============================================
   STAT COUNTERS
   Animated number counters on scroll
   ============================================ */

(function () {
  'use strict';

  var counters = document.querySelectorAll('.stat-counter');

  if (counters.length === 0) return;

  function formatNumber(num) {
    return num.toLocaleString('en-IN');
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var duration = parseInt(el.getAttribute('data-duration'), 10) || 2000;

    if (isNaN(target)) return;

    var start = performance.now();

    function update(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);

      el.textContent = prefix + formatNumber(current) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + formatNumber(target) + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  // Use Intersection Observer
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  } else {
    // Fallback: animate all immediately
    counters.forEach(animateCounter);
  }
})();
