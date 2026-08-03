/* Light/dark toggle. Defaults to light. Remembers the choice.
   Loaded synchronously in <head> so the theme is set before first paint. */
(function () {
  var stored = null;
  try { stored = localStorage.getItem('theme'); } catch (e) {}
  document.documentElement.setAttribute('data-theme', stored === 'dark' ? 'dark' : 'light');

  function wire() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    function label() {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      btn.textContent = dark ? 'light' : 'dark';
      btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    }
    btn.addEventListener('click', function () {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      var next = dark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      label();
    });
    label();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();
