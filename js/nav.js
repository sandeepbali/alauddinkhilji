/* ============================================
   NAVIGATION
   Hamburger, Dropdowns, Active State, Scroll
   ============================================ */

(function () {
  'use strict';

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('mobileBackdrop');
  const header = document.querySelector('.site-header');
  const dropdownTriggers = document.querySelectorAll('.nav-dropdown-trigger');

  // ---- Hamburger Toggle ----
  function openMenu() {
    hamburger.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('is-open');
    backdrop.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    // Focus first link
    const firstLink = mobileMenu.querySelector('.mobile-nav-link');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
    backdrop.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (mobileMenu.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  // ---- Desktop Dropdown Behavior ----
  dropdownTriggers.forEach(function (trigger) {
    const parent = trigger.closest('.nav-dropdown');
    let closeTimeout;

    // Click toggle for accessibility
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      const isOpen = parent.classList.contains('is-open');

      // Close all other dropdowns
      document.querySelectorAll('.nav-dropdown.is-open').forEach(function (dd) {
        dd.classList.remove('is-open');
        dd.querySelector('.nav-dropdown-trigger').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        parent.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    // Mouse enter/leave for desktop
    parent.addEventListener('mouseenter', function () {
      clearTimeout(closeTimeout);
      parent.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    });

    parent.addEventListener('mouseleave', function () {
      closeTimeout = setTimeout(function () {
        parent.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }, 150);
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown.is-open').forEach(function (dd) {
        dd.classList.remove('is-open');
        dd.querySelector('.nav-dropdown-trigger').setAttribute('aria-expanded', 'false');
      });
    }
  });

  // ---- Scroll Header ----
  let lastScroll = 0;
  const scrollThreshold = 80;

  function handleScroll() {
    const currentScroll = window.scrollY;

    if (currentScroll > scrollThreshold) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  // Run once on load
  handleScroll();

  // ---- Active Page Highlight ----
  function setActiveNav() {
    const path = window.location.pathname;
    // Normalize: remove /hi/ prefix and trailing index.html
    let normalizedPath = path.replace(/^\/hi\//, '/').replace(/index\.html$/, '').replace(/\/$/, '');
    if (normalizedPath === '') normalizedPath = '/';

    // Desktop nav links
    document.querySelectorAll('.nav-link[href], .nav-dropdown-menu a[href]').forEach(function (link) {
      let linkPath = link.getAttribute('href');
      // Handle relative paths
      if (linkPath.startsWith('./')) linkPath = linkPath.substring(1);
      if (linkPath.startsWith('../')) {
        // Resolve relative path
        const base = path.substring(0, path.lastIndexOf('/'));
        linkPath = base + '/' + linkPath.replace('../', '');
      }
      linkPath = linkPath.replace(/^\/hi\//, '/').replace(/index\.html$/, '').replace(/\/$/, '');
      if (linkPath === '') linkPath = '/';

      if (linkPath === normalizedPath) {
        link.classList.add('active');
        // Also highlight parent dropdown trigger
        const parentDropdown = link.closest('.nav-dropdown');
        if (parentDropdown) {
          const trigger = parentDropdown.querySelector('.nav-dropdown-trigger');
          if (trigger) trigger.classList.add('active');
        }
      }
    });

    // Mobile nav links
    document.querySelectorAll('.mobile-nav-link[href]').forEach(function (link) {
      let linkPath = link.getAttribute('href');
      if (linkPath.startsWith('./')) linkPath = linkPath.substring(1);
      linkPath = linkPath.replace(/^\/hi\//, '/').replace(/index\.html$/, '').replace(/\/$/, '');
      if (linkPath === '') linkPath = '/';

      if (linkPath === normalizedPath) {
        link.classList.add('active');
      }
    });
  }

  setActiveNav();

  // ---- Focus trap for mobile menu ----
  if (mobileMenu) {
    mobileMenu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;

      const focusable = mobileMenu.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }
})();
