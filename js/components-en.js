/* ============================================
   SHARED COMPONENTS — English
   Header + Footer injected into all pages
   ============================================ */

(function () {
  'use strict';

  // Detect base path (root or inside /pages/)
  var path = window.location.pathname.replace(/\\/g, '/');
  var isSubpage = path.indexOf('/pages/') !== -1;
  var base = isSubpage ? '..' : '.';
  // Compute target Hindi URL at injection time (baked into onclick — no JS file dependency)
  var hiUrl = (path === '/' || path === '') ? '/hi/' : '/hi' + path;

  // ---- HEADER ----
  var headerHTML = ''
    + '<a href="#main-content" class="skip-to-content">Skip to content</a>'
    + '<header class="site-header">'
    + '  <div class="header-inner">'
    + '    <a href="' + base + '/index.html" class="site-logo">'
    + '      <span class="logo-full">Alauddin Khilji</span>'
    + '      <span class="logo-compact">AK</span>'
    + '    </a>'
    + '    <nav class="main-nav" aria-label="Main navigation">'
    + '      <ul class="nav-list">'
    + '        <li><a href="' + base + '/index.html" class="nav-link">Home</a></li>'
    + '        <li><a href="' + base + '/pages/popular-narrative.html" class="nav-link">Narrative</a></li>'
    + '        <li class="nav-dropdown">'
    + '          <button class="nav-link nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">'
    + '            History <span class="nav-arrow">&#9662;</span>'
    + '          </button>'
    + '          <ul class="nav-dropdown-menu">'
    + '            <li><a href="' + base + '/pages/rise-to-power.html">Rise to Power</a></li>'
    + '            <li><a href="' + base + '/pages/military-campaigns.html">Military Campaigns</a></li>'
    + '          </ul>'
    + '        </li>'
    + '        <li class="nav-dropdown">'
    + '          <button class="nav-link nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">'
    + '            Impact <span class="nav-arrow">&#9662;</span>'
    + '          </button>'
    + '          <ul class="nav-dropdown-menu">'
    + '            <li><a href="' + base + '/pages/temple-destruction.html">Temple Destruction</a></li>'
    + '            <li><a href="' + base + '/pages/economic-oppression.html">Economic Oppression</a></li>'
    + '            <li><a href="' + base + '/pages/persecution.html">Persecution &amp; Society</a></li>'
    + '            <li><a href="' + base + '/pages/lasting-damage.html">The Lasting Damage</a></li>'
    + '          </ul>'
    + '        </li>'
    + '        <li><a href="' + base + '/pages/relevance-today.html" class="nav-link">Today</a></li>'
    + '        <li><a href="' + base + '/pages/timeline.html" class="nav-link">Timeline</a></li>'
    + '        <li><a href="' + base + '/pages/sources.html" class="nav-link">Sources</a></li>'
    + '      </ul>'
    + '    </nav>'
    + '    <div class="header-actions">'
    + '      <a href="' + hiUrl + '" class="lang-toggle" aria-label="Switch to Hindi">'
    + '        \u0939\u093F\u0928\u094D\u0926\u0940'
    + '      </a>'
    + '      <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">'
    + '        <span></span><span></span><span></span>'
    + '      </button>'
    + '    </div>'
    + '  </div>'
    + '</header>'
    + '<div class="mobile-menu-backdrop" id="mobileBackdrop"></div>'
    + '<nav class="mobile-menu" id="mobileMenu" aria-label="Mobile navigation">'
    + '  <a href="' + base + '/index.html" class="mobile-nav-link">Home</a>'
    + '  <div class="mobile-nav-category">Narrative</div>'
    + '  <a href="' + base + '/pages/popular-narrative.html" class="mobile-nav-link">The Popular Narrative</a>'
    + '  <div class="mobile-nav-category">History</div>'
    + '  <a href="' + base + '/pages/rise-to-power.html" class="mobile-nav-link">Rise to Power</a>'
    + '  <a href="' + base + '/pages/military-campaigns.html" class="mobile-nav-link">Military Campaigns</a>'
    + '  <div class="mobile-nav-category">Impact</div>'
    + '  <a href="' + base + '/pages/temple-destruction.html" class="mobile-nav-link">Temple Destruction</a>'
    + '  <a href="' + base + '/pages/economic-oppression.html" class="mobile-nav-link">Economic Oppression</a>'
    + '  <a href="' + base + '/pages/persecution.html" class="mobile-nav-link">Persecution &amp; Society</a>'
    + '  <a href="' + base + '/pages/lasting-damage.html" class="mobile-nav-link">The Lasting Damage</a>'
    + '  <div class="mobile-nav-category">Today &amp; Resources</div>'
    + '  <a href="' + base + '/pages/relevance-today.html" class="mobile-nav-link">Today\'s Relevance</a>'
    + '  <a href="' + base + '/pages/timeline.html" class="mobile-nav-link">Interactive Timeline</a>'
    + '  <a href="' + base + '/pages/sources.html" class="mobile-nav-link">Sources &amp; References</a>'
    + '  <div class="mobile-nav-category">Info</div>'
    + '  <a href="' + base + '/pages/about.html" class="mobile-nav-link">About</a>'
    + '  <a href="' + base + '/pages/disclaimer.html" class="mobile-nav-link">Disclaimer</a>'
    + '  <div class="mobile-lang-toggle">'
    + '    <a href="' + hiUrl + '" class="btn btn--outline" style="display:block;width:100%;text-align:center;text-decoration:none">'
    + '      \u0939\u093F\u0928\u094D\u0926\u0940 \u092E\u0947\u0902 \u092A\u0922\u093C\u0947\u0902'
    + '    </a>'
    + '  </div>'
    + '</nav>';

  // ---- FOOTER ----
  var footerHTML = ''
    + '<footer class="site-footer">'
    + '  <div class="footer-grid">'
    + '    <div class="footer-brand">'
    + '      <div class="footer-site-name">Alauddin Khilji</div>'
    + '      <p class="footer-initiative">'
    + '        A <a href="https://bharatfiles.com" target="_blank" rel="noopener">Bharat Files</a> Initiative'
    + '      </p>'
    + '      <p class="footer-tagline">Uncovering the history your textbooks never taught you.</p>'
    + '    </div>'
    + '    <div class="footer-column">'
    + '      <h4>Explore</h4>'
    + '      <ul>'
    + '        <li><a href="' + base + '/pages/popular-narrative.html">The Popular Narrative</a></li>'
    + '        <li><a href="' + base + '/pages/military-campaigns.html">Military Campaigns</a></li>'
    + '        <li><a href="' + base + '/pages/temple-destruction.html">Temple Destruction</a></li>'
    + '        <li><a href="' + base + '/pages/timeline.html">Interactive Timeline</a></li>'
    + '        <li><a href="' + base + '/pages/sources.html">Sources &amp; References</a></li>'
    + '      </ul>'
    + '    </div>'
    + '    <div class="footer-column">'
    + '      <h4>Related Archives</h4>'
    + '      <ul>'
    + '        <li><a href="https://mahmudofghazni.com" target="_blank" rel="noopener">Mahmud of Ghazni</a></li>'
    + '        <li><a href="https://muhammadmaghori.com" target="_blank" rel="noopener">Muhammad Ghori</a></li>'
    + '        <li><a href="https://aurangezebalamgir.com" target="_blank" rel="noopener">Aurangzeb Alamgir</a></li>'
    + '        <li><a href="https://muhammadbintughlaq.com" target="_blank" rel="noopener">Muhammad bin Tughlaq</a></li>'
    + '        <li><a href="https://firozshahtuqhlaq.com" target="_blank" rel="noopener">Firoz Shah Tughlaq</a></li>'
    + '      </ul>'
    + '    </div>'
    + '    <div class="footer-column">'
    + '      <h4>Info</h4>'
    + '      <ul>'
    + '        <li><a href="' + base + '/pages/about.html">About This Project</a></li>'
    + '        <li><a href="' + base + '/pages/disclaimer.html">Disclaimer</a></li>'
    + '        <li><a href="https://bharatfiles.com" target="_blank" rel="noopener">Bharat Files</a></li>'
    + '        <li><a href="https://digantsharma.com" target="_blank" rel="noopener">Digant Sharma</a></li>'
    + '      </ul>'
    + '    </div>'
    + '  </div>'
    + '  <div class="footer-bottom">'
    + '    <p>&copy; 2026 <a href="https://bharatfiles.com" target="_blank" rel="noopener">The Bharat Files</a>. All rights reserved.</p>'
    + '    <p>Developed &amp; managed by <a href="https://creaadesigns.com" target="_blank" rel="noopener">Creaa Designs</a></p>'
    + '  </div>'
    + '</footer>';

  // ---- INJECT ----
  var headerEl = document.getElementById('site-header');
  var footerEl = document.getElementById('site-footer');

  if (headerEl) headerEl.innerHTML = headerHTML;
  if (footerEl) footerEl.innerHTML = footerHTML;
})();
