/*
 * Google AdSense loader for the static public pages.
 *
 * One script, one ad client. The client ID is read from the page's
 * `<meta name="adsense-client">` tag so the publisher ID exists in exactly one
 * place per page and can be verified by `tools/verify-site.mjs`.
 *
 * Compliance notes, so a later edit does not undo them:
 *
 *  - This is an unmodified AdSense loader. It does not hide an ad unit, cover
 *    content, overlap ads and content, auto-refresh, redirect, open a new
 *    window, or manipulate targeting. Those are all prohibited modifications.
 *  - The script is referenced only by full guide articles. It is deliberately
 *    absent from the app shell, the guides index, the about page, the contact
 *    page and every policy page, because ads on screens without publisher
 *    content are not allowed.
 *  - Nothing is passed to Google except the publisher client ID. No user ID,
 *    email address, contact-form field or other personal data is sent.
 *  - The site is not directed to children, so no age-restricted treatment tag
 *    is applied (that tag is for COPPA/family content).
 *
 * Consent: Google's certified consent message (AdSense → Privacy & messaging)
 * must be switched on for EEA/UK/Switzerland/Brazil traffic. That message is
 * delivered by the AdSense script itself, so this loader must NOT gate the
 * script behind a custom banner — doing so stops the certified message from
 * ever appearing. The "Cookie settings" link in the footer calls Google's
 * revocation dialog when it is available and falls back to the cookie policy
 * when it is not.
 *
 * The script is loaded with a plain <script> element created here rather than a
 * static tag, so the same file also works on hosts that send a stricter CSP.
 */
(function () {
  'use strict';

  var meta = document.querySelector('meta[name="adsense-client"]');
  var client = meta && meta.getAttribute('content');

  if (!client || !/^ca-pub-\d{16}$/.test(client)) {
    return;
  }

  var existing = document.querySelector('script[data-dairy-adsense]');
  if (existing) {
    return;
  }

  var script = document.createElement('script');
  script.async = true;
  script.src =
    'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' +
    encodeURIComponent(client);
  script.crossOrigin = 'anonymous';
  script.setAttribute('data-dairy-adsense', '');
  document.head.appendChild(script);

  /*
   * A footer link with `data-cookie-settings` re-opens Google's consent
   * choices. `googlefc` is defined by the consent message once it loads; when
   * it is absent (traffic outside the regulated regions, or messages not yet
   * enabled) the link keeps its href and lands on /cookies.html instead.
   */
  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-cookie-settings]');
    if (!trigger) {
      return;
    }

    var googlefc = window.googlefc;
    if (googlefc && typeof googlefc.showRevocationMessage === 'function') {
      event.preventDefault();
      googlefc.showRevocationMessage();
    }
  });
})();
