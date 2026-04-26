(function () {
  /* ─── Page type detection ─── */
  const path = window.location.pathname;
  const isDashboards = path.startsWith('/marketing-dashboards/');
  const isUpdates    = path.startsWith('/blog/');
  // Blog post = /blog/ with at least one more path segment (not the index)
  const isBlogPost   = /^\/blog\/[^/]+\/?$/.test(path);

  /* ─── CSS: header, footer, author box ─── */
  const css = `
    .site-header{position:sticky;top:0;z-index:100;background:rgba(11,14,20,.95);backdrop-filter:blur(12px);border-bottom:1px solid var(--border,#1e2535)}
    .header-inner{max-width:1280px;margin:0 auto;padding:0 2rem;height:60px;display:flex;align-items:center;gap:2rem}
    .site-logo-link{display:flex;align-items:center;text-decoration:none;opacity:1}
    .site-logo-link:hover{opacity:.85}
    .main-nav{display:flex;align-items:center;gap:.25rem;margin-left:auto}
    .main-nav a{color:var(--text-muted,#8c9ab0);font-size:.85rem;font-weight:500;padding:.4rem .7rem;border-radius:var(--radius,6px);transition:all .15s;text-decoration:none}
    .main-nav a:hover,.main-nav a.active{color:var(--text,#e2e8f0);background:var(--bg-elevated,#151a26);opacity:1}
    .nav-cta{background:var(--accent,#00d4ff)!important;color:#000!important;font-family:var(--font-mono,'Space Grotesk',sans-serif);font-size:.65rem!important;font-weight:700!important;letter-spacing:.03em;margin-left:.5rem}
    .site-footer{background:var(--bg-card,#10141d);border-top:1px solid var(--border,#1e2535);padding:3rem 2rem 0}
    .footer-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;padding-bottom:2rem}
    .footer-brand p{font-size:.85rem;color:var(--text-muted,#8c9ab0);margin-top:.5rem;line-height:1.6;max-width:260px}
    .footer-col h4{font-family:var(--font-mono,'Space Grotesk',sans-serif);font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--text-dim,#4a5568);margin-bottom:.75rem}
    .footer-col ul{list-style:none}
    .footer-col li{margin-bottom:.35rem}
    .footer-col a{font-size:.8rem;color:var(--text-muted,#8c9ab0);text-decoration:none;transition:color .15s}
    .footer-col a:hover{color:var(--accent,#00d4ff);opacity:1}
    .footer-bottom{max-width:1280px;margin:1.5rem auto 0;padding:1.1rem 2rem 0;border-top:1px solid var(--border,#1e2535);display:flex;justify-content:space-between;align-items:center}
    .footer-bottom p{font-family:var(--font-mono,'Space Grotesk',sans-serif);font-size:.6rem;color:var(--text-dim,#4a5568)}
    .footer-bottom a{color:var(--text-dim,#4a5568);text-decoration:none}
    .footer-bottom a:hover{color:var(--text-muted,#8c9ab0)}
    @media(max-width:900px){.footer-inner{grid-template-columns:1fr 1fr}.footer-brand{grid-column:1/-1}}
    @media(max-width:600px){.footer-inner{grid-template-columns:1fr}.footer-bottom{flex-direction:column;gap:.5rem;text-align:center}}
    /* Author box — blog posts only */
    .mr-author-box{display:flex;align-items:flex-start;gap:1.25rem;background:var(--bg-card,#10141d);border:1px solid var(--border,#1e2535);border-radius:12px;padding:1.5rem 2rem;margin:3rem auto 3rem;max-width:760px;box-sizing:border-box}
    .mr-author-avatar{width:52px;height:52px;border-radius:50%;object-fit:cover;flex-shrink:0;display:block}
    .mr-author-name{font-family:var(--font-mono,'Space Grotesk',sans-serif);font-weight:700;font-size:.9rem;color:var(--text,#e2e8f0);margin-bottom:.25rem}
    .mr-author-name a{color:inherit;text-decoration:none}
    .mr-author-name a:hover{color:var(--accent,#00d4ff);opacity:1}
    .mr-author-role{font-size:.78rem;color:var(--text-muted,#8c9ab0);margin-bottom:.55rem}
    .mr-author-bio{font-size:.83rem;color:var(--text-muted,#8c9ab0);line-height:1.65;margin:0}
    .mr-author-bio a{color:var(--accent,#00d4ff)}
    @media(max-width:600px){.mr-author-box{flex-direction:column;gap:.75rem}}
  `;
  const styleEl = document.createElement('style');
  styleEl.id = 'mr-components-css';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ─── Header ─── */
  const header = `
<header class="site-header" id="mr-site-header">
  <div class="header-inner">
    <a href="/" class="site-logo-link">
      <img src="/logo.svg" alt="MarketingReports.io" height="22" style="display:block">
    </a>
    <nav class="main-nav">
      <a href="/marketing-dashboards/"${isDashboards ? ' class="active"' : ''}>Dashboards</a>
      <a href="/blog/"${isUpdates ? ' class="active"' : ''}>Updates</a>
      <a href="/marketing-dashboards/" class="nav-cta">Compare Tools →</a>
    </nav>
  </div>
</header>`;

  /* ─── Footer ─── */
  const footer = `
<footer class="site-footer" id="mr-site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <img src="/logo.svg" alt="MarketingReports.io" height="20" style="display:block;margin-bottom:.5rem">
      <p>The definitive directory of marketing dashboards. Free templates, automated reporting tool reviews, and product updates.</p>
    </div>
    <div class="footer-col"><h4>Dashboard Tools</h4><ul>
      <li><a href="/reporting-tools/whatagraph/">Whatagraph</a></li>
      <li><a href="/reporting-tools/databox/">Databox</a></li>
      <li><a href="/reporting-tools/klipfolio/">Klipfolio</a></li>
      <li><a href="/reporting-tools/supermetrics/">Supermetrics</a></li>
      <li><a href="/reporting-tools/looker-studio/">Looker Studio</a></li>
    </ul></div>
    <div class="footer-col"><h4>By Platform</h4><ul>
      <li><a href="/marketing-dashboards/google-ads/">Google Ads</a></li>
      <li><a href="/marketing-dashboards/facebook-ads/">Facebook Ads</a></li>
      <li><a href="/marketing-dashboards/google-search-console/">Search Console</a></li>
      <li><a href="/marketing-dashboards/linkedin-ads/">LinkedIn Ads</a></li>
      <li><a href="/marketing-dashboards/shopify/">Shopify</a></li>
      <li><a href="/marketing-dashboards/bing-ads/">Bing Ads</a></li>
      <li><a href="/marketing-dashboards/hubspot-marketing/">HubSpot</a></li>
      <li><a href="/marketing-dashboards/organic-social/">Organic Social</a></li>
      <li><a href="/marketing-dashboards/email-marketing/">Email Marketing</a></li>
    </ul></div>
    <div class="footer-col"><h4>By Source</h4><ul>
      <li><a href="/marketing-dashboards/google-ads/">Paid Search</a></li>
      <li><a href="/marketing-dashboards/facebook-ads/">Paid Social</a></li>
      <li><a href="/marketing-dashboards/google-search-console/">SEO / Organic</a></li>
      <li><a href="/marketing-dashboards/email-marketing/">Email Marketing</a></li>
      <li><a href="/marketing-dashboards/organic-social/">Organic Social</a></li>
    </ul></div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 MarketingReports.io — Independent reviews. We may earn a commission from affiliate links.</p>
    <p><a href="/about/">About</a> · <a href="/contact/">Contact</a> · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · <a href="/affiliate-disclosure/">Affiliate Disclosure</a></p>
  </div>
</footer>`;

  /* ─── Author box — blog posts only ─── */
  const authorBox = `
<div class="mr-author-box" id="mr-author-box">
  <img class="mr-author-avatar" src="https://media.licdn.com/dms/image/v2/C5603AQESopoE9DhzWA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1601241079323?e=1778716800&v=beta&t=OWBYjWupwBmaIZRVVJ0MMUucj5q6mqoWOYb8GQKDV34" alt="Colin H" width="52" height="52">
  <div>
    <div class="mr-author-name"><a href="https://www.webthrive.io/home/" rel="noopener">Colin H</a></div>
    <div class="mr-author-role">Digital Strategy &amp; Marketing Analytics</div>
    <p class="mr-author-bio">A decade in go-to-market strategy and campaign analytics. <a href="https://marketingreports.io" rel="noopener">MarketingReports.io</a> exists to stay ahead of the reporting tools and platforms shaping how marketers measure what matters.</p>
  </div>
</div>`;

  /* ─── Inject into DOM ─── */
  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);

  // Author box: blog posts only (not the /blog/ index page)
  if (isBlogPost) {
    const footerEl = document.getElementById('mr-site-footer');
    if (footerEl) {
      footerEl.insertAdjacentHTML('beforebegin', authorBox);
    } else {
      document.body.insertAdjacentHTML('beforeend', authorBox);
    }
  }
})();
