/* ==========================================================================
   QuartzForge — comportamento compartilhado
   Tudo é progressive enhancement: sem JS a página continua legível e navegável.
   ========================================================================== */

(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;

  /* ---------------------------------------------------------------- tema */

  function applyTheme(theme) {
    if (theme === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    try { localStorage.setItem('qf-theme', theme); } catch (e) {}
    doc.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
      b.setAttribute('aria-label', theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro');
    });
  }

  doc.addEventListener('click', function (ev) {
    var t = ev.target.closest('[data-theme-toggle]');
    if (!t) return;
    applyTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });

  /* ---------------------------------------------------- navegação fixa */

  var nav = doc.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.setAttribute('data-stuck', window.scrollY > 8 ? 'true' : 'false');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------ menu mobile */

  var drawer = doc.getElementById('drawer');
  var burger = doc.querySelector('[data-burger]');

  function setDrawer(open) {
    if (!drawer || !burger) return;
    drawer.setAttribute('data-open', open ? 'true' : 'false');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    doc.body.style.overflow = open ? 'hidden' : '';
  }

  if (burger) {
    burger.addEventListener('click', function () {
      setDrawer(drawer.getAttribute('data-open') !== 'true');
    });
    drawer.addEventListener('click', function (ev) {
      if (ev.target.tagName === 'A') setDrawer(false);
    });
  }

  /* --------------------------------------------------------- abas */
  /* markup: [data-tabs] > button[data-tab="id"] ; alvos [data-panel="id"] */

  doc.querySelectorAll('[data-tabs]').forEach(function (group) {
    var scopeName = group.getAttribute('data-tabs');
    var buttons = Array.prototype.slice.call(group.querySelectorAll('[data-tab]'));

    function select(id) {
      buttons.forEach(function (b) {
        b.setAttribute('aria-selected', b.getAttribute('data-tab') === id ? 'true' : 'false');
      });
      doc.querySelectorAll('[data-panel-group="' + scopeName + '"]').forEach(function (p) {
        p.hidden = p.getAttribute('data-panel') !== id;
      });
      var label = doc.querySelector('[data-panel-label="' + scopeName + '"]');
      var active = buttons.filter(function (b) { return b.getAttribute('data-tab') === id; })[0];
      if (label && active && active.getAttribute('data-file')) {
        label.textContent = active.getAttribute('data-file');
      }
    }

    buttons.forEach(function (b) {
      b.addEventListener('click', function () { select(b.getAttribute('data-tab')); });
      b.addEventListener('keydown', function (ev) {
        var i = buttons.indexOf(b);
        var next = null;
        if (ev.key === 'ArrowRight') next = buttons[(i + 1) % buttons.length];
        if (ev.key === 'ArrowLeft') next = buttons[(i - 1 + buttons.length) % buttons.length];
        if (next) { ev.preventDefault(); next.focus(); next.click(); }
      });
    });

    var initial = buttons.filter(function (b) { return b.getAttribute('aria-selected') === 'true'; })[0] || buttons[0];
    if (initial) select(initial.getAttribute('data-tab'));
  });

  /* ------------------------------------------------------- copiar */

  doc.addEventListener('click', function (ev) {
    var btn = ev.target.closest('[data-copy]');
    if (!btn) return;

    var sel = btn.getAttribute('data-copy');
    var src = sel ? doc.querySelector(sel) : null;
    if (!src) {
      var body = btn.closest('.cmd-body') || btn.closest('.panel');
      src = body ? body.querySelector('pre:not([hidden])') : null;
    }
    if (!src) return;

    var text = src.getAttribute('data-raw') || src.textContent;
    text = text.replace(/^\s*\$\s?/gm, '').trim();

    var done = function () {
      var label = btn.querySelector('[data-copy-label]');
      var prev = label ? label.textContent : '';
      btn.setAttribute('data-copied', 'true');
      if (label) label.textContent = 'copiado';
      window.setTimeout(function () {
        btn.removeAttribute('data-copied');
        if (label) label.textContent = prev || 'copiar';
      }, 1600);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () {});
    } else {
      var ta = doc.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      doc.body.appendChild(ta);
      ta.select();
      try { doc.execCommand('copy'); done(); } catch (e) {}
      doc.body.removeChild(ta);
    }
  });

  /* ---------------------------------------------------- busca de docs */

  var search = doc.getElementById('docs-search');
  if (search) {
    var links = Array.prototype.slice.call(doc.querySelectorAll('.docs-nav a'));
    var groups = Array.prototype.slice.call(doc.querySelectorAll('.docs-nav .grp'));
    var empty = doc.querySelector('.docs-nav .empty');

    var filter = function () {
      var q = search.value.trim().toLowerCase();
      var hits = 0;

      links.forEach(function (a) {
        var hay = (a.textContent + ' ' + (a.getAttribute('data-keywords') || '')).toLowerCase();
        var match = !q || hay.indexOf(q) !== -1;
        a.hidden = !match;
        if (match) hits++;
      });

      groups.forEach(function (g) {
        var any = Array.prototype.slice.call(g.querySelectorAll('a')).some(function (a) { return !a.hidden; });
        g.hidden = !any;
      });

      if (empty) {
        empty.hidden = hits !== 0;
        empty.textContent = 'Nenhuma página para “' + search.value.trim() + '”.';
      }
    };

    search.addEventListener('input', filter);
    search.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') { search.value = ''; filter(); search.blur(); }
    });

    doc.addEventListener('keydown', function (ev) {
      if (ev.key !== '/' || ev.metaKey || ev.ctrlKey) return;
      var tag = doc.activeElement && doc.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      ev.preventDefault();
      var side = doc.querySelector('.docs-side');
      if (side && side.getAttribute('data-open') === 'false') side.setAttribute('data-open', 'true');
      search.focus();
    });
  }

  var docsToggle = doc.querySelector('[data-docs-toggle]');
  if (docsToggle) {
    docsToggle.addEventListener('click', function () {
      var side = doc.querySelector('.docs-side');
      if (!side) return;
      var open = side.getAttribute('data-open') !== 'false';
      side.setAttribute('data-open', open ? 'false' : 'true');
      docsToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  }

  /* ------------------------------------------------------ TOC scroll-spy */

  var toc = doc.querySelector('.docs-toc');
  if (toc && 'IntersectionObserver' in window) {
    var tocLinks = Array.prototype.slice.call(toc.querySelectorAll('a'));
    var targets = tocLinks
      .map(function (a) { return doc.getElementById(a.getAttribute('href').slice(1)); })
      .filter(Boolean);

    var visible = new Set();
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) visible.add(e.target.id);
        else visible.delete(e.target.id);
      });
      var firstId = null;
      for (var i = 0; i < targets.length; i++) {
        if (visible.has(targets[i].id)) { firstId = targets[i].id; break; }
      }
      tocLinks.forEach(function (a) {
        a.setAttribute('data-active', a.getAttribute('href') === '#' + firstId ? 'true' : 'false');
      });
    }, { rootMargin: '-88px 0px -62% 0px', threshold: 0 });

    targets.forEach(function (t) { spy.observe(t); });
  }

  /* --------------------------------------------------- filtros do ecossistema */

  var chipBar = doc.querySelector('[data-filter-bar]');
  if (chipBar) {
    var cards = Array.prototype.slice.call(doc.querySelectorAll('[data-cat]'));
    var counter = doc.querySelector('[data-filter-count]');

    chipBar.addEventListener('click', function (ev) {
      var chip = ev.target.closest('.chip');
      if (!chip) return;
      var cat = chip.getAttribute('data-cat-filter');

      chipBar.querySelectorAll('.chip').forEach(function (c) {
        c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
      });

      var shown = 0;
      cards.forEach(function (card) {
        var match = cat === 'all' || (card.getAttribute('data-cat') || '').split(' ').indexOf(cat) !== -1;
        card.hidden = !match;
        if (match) shown++;
      });

      if (counter) {
        counter.textContent = shown + (shown === 1 ? ' projeto' : ' projetos');
      }
    });
  }

  /* ----------------------------------------------------------- reveal */

  if ('IntersectionObserver' in window) {
    var reveal = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.setAttribute('data-shown', 'true');
        obs.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    doc.querySelectorAll('[data-reveal]').forEach(function (el) { reveal.observe(el); });
  } else {
    doc.querySelectorAll('[data-reveal]').forEach(function (el) { el.setAttribute('data-shown', 'true'); });
  }

  /* --------------------------------------------------------- ano no rodapé */

  doc.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
