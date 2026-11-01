/* Lead capture → Make. Fire-and-forget: never blocks or breaks the form,
   and never touches the existing Formspree submission. Posts alongside it so
   a Formspree outage or cap no longer means a lost lead, and so the UTM that
   produced the lead arrives with it — Formspree never sees that. */
(function () {
  var HOOK = 'https://hook.us2.make.com/tccqwnheihsq4mh9if0lwd1w8wxtqwux';
  /* Meta ad id (utm_content) -> short label for the Make lead alert ("Ad name"
     row). Same list as src/lib/leadBeacon.js: add new ads to both. */
  var AD_NAMES = {
    '52522891454095': 'Seller main: Afraid of losing your house',
    '52540726492095': 'Seller H1: Your lender does not want your house',
    '52540726499695': 'Seller H2: Notice of sale letter',
    '52540726577895': 'Seller H3: Bank served a claim',
    '52541171825295': 'Buyer A: We find them for you',
    '52541171825095': 'Buyer B: Priced to sell',
    '52541171824695': 'Buyer C: Tracked in one place',
    '52541171824095': 'Buyer D: Durham snapshot',
    '52541171824295': 'Buyer E: Price drops',
    '52541171823695': 'Buyer F3: More than a tour, legal fees up to $800'
  };
  document.addEventListener('submit', function (e) {
    try {
      var f = e.target;
      if (!f || f.tagName !== 'FORM') return;
      var d = {};
      new FormData(f).forEach(function (v, k) { if (k.charAt(0) !== '_') d[k] = v; });
      d.name = d.name || ((d.first || '') + ' ' + (d.last || '')).trim();
      /* /contact collects an area rather than a street address, and a contact
         submission with a phone and a described situation is at least as strong
         a lead as a guide download. Count it. */
      d.address = d.address || d.property_address || d.area || '';
      d.source = d.magnet || d.cat || d.source_page || '';
      var q = new URLSearchParams(location.search);
      d.page = location.pathname;
      /* Prefer the URL, then the page's saved attribution (hidden fields), so a
         visitor who moved around the site before submitting keeps the ad source. */
      d.utm_source = q.get('utm_source') || d.utm_source || '';
      d.utm_medium = q.get('utm_medium') || d.utm_medium || '';
      d.utm_campaign = q.get('utm_campaign') || d.utm_campaign || '';
      d.utm_content = q.get('utm_content') || d.utm_content || q.get('hsa_ad') || '';
      d.ad_name = AD_NAMES[d.utm_content] || (d.utm_content ? 'Other ad (check Ads Manager)' : '');
      d.referrer = document.referrer || '';
      d.received = new Date().toISOString();
      d.completeness = (d.phone && d.address) ? 'Full'
        : (d.phone || d.address) ? 'Partial' : 'Email only';
      var body = JSON.stringify(d);
      if (navigator.sendBeacon) {
        navigator.sendBeacon(HOOK, new Blob([body], { type: 'text/plain' }));
      } else {
        fetch(HOOK, { method: 'POST', mode: 'no-cors', body: body }).catch(function () {});
      }
    } catch (err) { /* never let capture break a submission */ }
  }, true);
})();
