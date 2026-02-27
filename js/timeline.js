/* ============================================
   INTERACTIVE TIMELINE
   Filter, expand/collapse, year indicator
   ============================================ */

(function () {
  'use strict';

  var filterBtns = document.querySelectorAll('.timeline-filter');
  var timelineItems = document.querySelectorAll('.timeline-item');
  var yearIndicator = document.querySelector('.timeline-year-indicator');
  var emptyState = document.querySelector('.timeline-empty');

  if (timelineItems.length === 0) return;

  // ---- Category Filtering ----
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var visibleCount = 0;

      timelineItems.forEach(function (item) {
        var category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('is-hidden');
          visibleCount++;
        } else {
          item.classList.add('is-hidden');
          // Collapse if expanded
          item.classList.remove('is-expanded');
        }
      });

      // Show empty state if no items visible
      if (emptyState) {
        if (visibleCount === 0) {
          emptyState.classList.add('is-visible');
        } else {
          emptyState.classList.remove('is-visible');
        }
      }
    });
  });

  // ---- Expand / Collapse ----
  timelineItems.forEach(function (item) {
    var content = item.querySelector('.timeline-content');
    if (!content) return;

    content.addEventListener('click', function () {
      var wasExpanded = item.classList.contains('is-expanded');

      // Collapse all others
      timelineItems.forEach(function (other) {
        if (other !== item) other.classList.remove('is-expanded');
      });

      // Toggle this one
      if (wasExpanded) {
        item.classList.remove('is-expanded');
      } else {
        item.classList.add('is-expanded');
      }
    });

    // Keyboard accessibility
    content.setAttribute('tabindex', '0');
    content.setAttribute('role', 'button');
    content.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        content.click();
      }
    });
  });

  // ---- Year Indicator on Scroll ----
  if (yearIndicator && 'IntersectionObserver' in window) {
    var yearObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var year = entry.target.getAttribute('data-year');
            if (year) {
              yearIndicator.textContent = year;
              yearIndicator.style.opacity = '0.3';
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-30% 0px -30% 0px'
      }
    );

    timelineItems.forEach(function (item) {
      yearObserver.observe(item);
    });
  }

  // ---- Keyboard navigation between items ----
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;

    var focused = document.activeElement;
    var currentItem = focused ? focused.closest('.timeline-item') : null;
    if (!currentItem) return;

    e.preventDefault();

    var visibleItems = Array.from(timelineItems).filter(function (item) {
      return !item.classList.contains('is-hidden');
    });

    var currentIndex = visibleItems.indexOf(currentItem);
    var nextIndex;

    if (e.key === 'ArrowDown') {
      nextIndex = Math.min(currentIndex + 1, visibleItems.length - 1);
    } else {
      nextIndex = Math.max(currentIndex - 1, 0);
    }

    var nextContent = visibleItems[nextIndex].querySelector('.timeline-content');
    if (nextContent) nextContent.focus();
  });
})();
