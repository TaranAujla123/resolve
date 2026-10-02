/* Lead capture → Make. Fire-and-forget: never blocks or breaks the form,
   and never touches the existing Formspree submission. Posts alongside it so
   a Formspree outage or cap no longer means a lost lead, and so the UTM that
   produced the lead arrives with it — Formspree never sees that. */
(function () {
  var HOOK = 'https://hook.us2.make.com/tccqwnheihsq4mh9if0lwd1w8wxtqwux';
  document.addEventListener('submit', function (e) {
    try {
      var f = e.target;
      if (!f || f.tagName !== 'FORM') return;
      var d = {};
      new FormData(f).forEach(function (v, k) { if (k.charAt(0) !== '_') d[k] = v; });
      d.name = d.name || ((d.first || '') + ' ' + (d.last || '')).trim();
      d.address = d.address || d.property_address || '';
      d.source = d.magnet || d.cat || d.source_page || '';
      var q = new URLSearchParams(location.search);
      d.page = location.pathname;
      d.utm_source = q.get('utm_source') || '';
      d.utm_medium = q.get('utm_medium') || '';
      d.utm_campaign = q.get('utm_campaign') || '';
      d.utm_content = q.get('utm_content') || '';
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
