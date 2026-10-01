/* PrefGeo project page — renders demos from config.js and wires up the page.
 * You should not need to edit this file; edit static/js/config.js instead. */
(function () {
  "use strict";

  var CONFIG = window.PREFGEO_CONFIG || { links: {}, demos: {}, showPlaceholders: true };
  var SHOW_PLACEHOLDERS = CONFIG.showPlaceholders !== false;

  var VIDEO_EXT = /\.(mp4|webm|m4v|mov)(\?.*)?$/i;
  var IMAGE_EXT = /\.(gif|webp|png|jpe?g|avif)(\?.*)?$/i;

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function mediaKind(src) {
    if (!src) return "empty";
    if (VIDEO_EXT.test(src)) return "video";
    if (IMAGE_EXT.test(src)) return "image";
    if (/youtu\.?be|vimeo\.com/i.test(src)) return "embed";
    return "image";
  }

  function embedUrl(src) {
    var yt = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/i);
    if (yt) return "https://www.youtube-nocookie.com/embed/" + yt[1] + "?rel=0&modestbranding=1";
    var vm = src.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    if (vm) return "https://player.vimeo.com/video/" + vm[1] + "?dnt=1";
    return src;
  }

  /* ---------- one media slot (video / image / embed / placeholder) ---------- */
  function renderSlot(v, alt) {
    var kind = mediaKind(v.src);
    var slot = el("div", "slot slot--" + kind + (v.highlight ? " slot--ours" : ""));
    var frame = el("div", "slot-frame");

    if (kind === "video") {
      var video = document.createElement("video");
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.preload = "metadata";
      if (v.poster) video.poster = v.poster;
      video.src = v.src;
      video.setAttribute("aria-label", alt);
      if (v.controls) video.controls = true;
      else {
        video.addEventListener("click", function () {
          if (video.paused) { video.play(); slot.classList.remove("is-paused"); }
          else { video.pause(); slot.classList.add("is-paused"); }
        });
        frame.appendChild(el("span", "slot-paused", "Paused · click to play"));
      }
      frame.appendChild(video);
    } else if (kind === "image") {
      var img = document.createElement("img");
      img.loading = "lazy";
      img.decoding = "async";
      img.src = v.src;
      img.alt = alt;
      frame.appendChild(img);
    } else if (kind === "embed") {
      var ifr = document.createElement("iframe");
      ifr.src = embedUrl(v.src);
      ifr.loading = "lazy";
      ifr.title = alt;
      ifr.allow = "autoplay; fullscreen; picture-in-picture";
      ifr.allowFullscreen = true;
      frame.appendChild(ifr);
    } else {
      frame.appendChild(el("div", "placeholder",
        '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="15" height="14" rx="2.5"/><path d="M17.5 10.2 21.5 7.8v8.4l-4-2.4z"/></svg>' +
        "<span>Demo coming soon</span>"));
    }

    if (v.badge) frame.appendChild(el("span", "slot-badge", escapeHtml(v.badge)));
    if (v.label) slot.appendChild(el("span", "slot-label", escapeHtml(v.label)));
    slot.appendChild(frame);
    if (v.note) slot.appendChild(el("p", "slot-note", escapeHtml(v.note)));
    return slot;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function variantsOf(item) {
    if (item.variants && item.variants.length) return item.variants;
    return [{ src: item.src || "", poster: item.poster, badge: item.badge, controls: item.controls }];
  }

  /* ---------- one item card (title + side-by-side slots + caption) ---------- */
  function renderItem(item) {
    var variants = variantsOf(item).filter(function (v) { return v.src || SHOW_PLACEHOLDERS; });
    if (!variants.length) return null;

    var card = el("article", "demo-item");
    if (variants.length >= 3) card.classList.add("demo-item--wide");
    if (item.title || item.instruction) {
      var head = el("header", "demo-item-head");
      if (item.title) head.appendChild(el("h4", null, escapeHtml(item.title)));
      if (item.instruction) head.appendChild(el("p", "demo-instruction", "“" + escapeHtml(item.instruction) + "”"));
      card.appendChild(head);
    }
    var row = el("div", "demo-slots");
    row.style.setProperty("--n", variants.length);
    variants.forEach(function (v) {
      row.appendChild(renderSlot(v, (item.title || "Demo") + (v.label ? " — " + v.label : "")));
    });
    card.appendChild(row);
    if (item.caption) card.appendChild(el("p", "demo-caption", escapeHtml(item.caption)));
    return card;
  }

  /* ---------- a tabbed demo group ---------- */
  function renderDemoGroup(mount, tabs) {
    var built = [];
    (tabs || []).forEach(function (tab) {
      var items = (tab.items || []).map(renderItem).filter(Boolean);
      if (items.length) built.push({ tab: tab, items: items });
    });
    if (!built.length) return false;

    var bar = el("div", "tabs");
    bar.setAttribute("role", "tablist");
    var panels = el("div", "tab-panels");
    var buttons = [];

    built.forEach(function (b, i) {
      var id = b.tab.id || mount.id + "-" + i;
      var btn = el("button", "tab", b.tab.label || "Demos");
      btn.type = "button";
      btn.id = "tab-" + id;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-controls", "panel-" + id);
      btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
      btn.tabIndex = i === 0 ? 0 : -1;
      buttons.push(btn);
      bar.appendChild(btn);

      var panel = el("div", "tab-panel");
      panel.id = "panel-" + id;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", btn.id);
      panel.style.setProperty("--aspect", b.tab.aspect || "16/9");
      if (i !== 0) panel.hidden = true;
      if (b.tab.subtitle) panel.appendChild(el("p", "tab-subtitle", b.tab.subtitle));
      if (b.tab.cover) {
        var cover = el("figure", "tab-cover");
        var ci = document.createElement("img");
        ci.src = b.tab.cover; ci.alt = (b.tab.label || "") + " tasks"; ci.loading = "lazy";
        cover.appendChild(ci);
        panel.appendChild(cover);
      }
      var grid = el("div", "demo-grid");
      if (b.tab.columns) grid.setAttribute("data-cols", b.tab.columns);
      b.items.forEach(function (it) { grid.appendChild(it); });
      panel.appendChild(grid);
      panels.appendChild(panel);
    });

    function select(i, focus) {
      buttons.forEach(function (btn, j) {
        var on = i === j;
        btn.setAttribute("aria-selected", on ? "true" : "false");
        btn.tabIndex = on ? 0 : -1;
        panels.children[j].hidden = !on;
      });
      if (focus) buttons[i].focus();
      refreshVideos();
    }
    buttons.forEach(function (btn, i) {
      btn.addEventListener("click", function () { select(i); });
      btn.addEventListener("keydown", function (e) {
        var n = buttons.length, k = e.key;
        if (k === "ArrowRight") select((i + 1) % n, true);
        else if (k === "ArrowLeft") select((i - 1 + n) % n, true);
        else if (k === "Home") select(0, true);
        else if (k === "End") select(n - 1, true);
        else return;
        e.preventDefault();
      });
    });

    if (built.length > 1) mount.appendChild(bar);
    else mount.appendChild(el("h3", "tab-single", escapeHtml(built[0].tab.label || "")));
    mount.appendChild(panels);
    return true;
  }

  /* ---------- play videos only while visible; keep side-by-side clips in sync ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var vids = en.target.querySelectorAll("video:not([controls])");
      vids.forEach(function (v) {
        var slot = v.closest(".slot");
        if (en.isIntersecting && !slot.classList.contains("is-paused")) {
          if (!v.dataset.started) { v.currentTime = 0; v.dataset.started = "1"; }
          var p = v.play(); if (p && p.catch) p.catch(function () {});
        } else v.pause();
      });
    });
  }, { threshold: 0.25 }) : null;

  function refreshVideos() {
    if (!io) return;
    document.querySelectorAll(".demo-item").forEach(function (card) {
      io.unobserve(card);
      if (card.querySelector("video")) io.observe(card);
    });
  }

  /* ---------- demos ---------- */
  function initDemos() {
    var demos = CONFIG.demos || {};
    var any = false;
    [["real", "demos-real"], ["sim", "demos-sim"]].forEach(function (pair) {
      var mount = document.getElementById(pair[1]);
      if (!mount) return;
      var ok = renderDemoGroup(mount, demos[pair[0]]);
      if (!ok) mount.closest(".demo-block").remove();
      any = any || ok;
    });
    if (!any) {
      var sec = document.getElementById("demos");
      if (sec) sec.remove();
      document.querySelectorAll('a[href="#demos"]').forEach(function (a) { a.remove(); });
    }
    refreshVideos();
  }

  /* ---------- header links (Paper / Code) ---------- */
  function initLinks() {
    var links = CONFIG.links || {};
    document.querySelectorAll("[data-link]").forEach(function (a) {
      var url = links[a.getAttribute("data-link")];
      if (url) {
        a.href = url;
        if (/^https?:/.test(url)) { a.target = "_blank"; a.rel = "noopener"; }
      } else {
        a.removeAttribute("href");
        a.classList.add("is-disabled");
        a.setAttribute("aria-disabled", "true");
        var soon = a.querySelector(".btn-soon");
        if (soon) soon.hidden = false;
      }
    });
  }

  /* ---------- click a figure to enlarge ---------- */
  function initLightbox() {
    var box = el("div", "lightbox");
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Enlarged figure");
    box.hidden = true;
    var img = document.createElement("img");
    var close = el("button", "lightbox-close", "×");
    close.type = "button";
    close.setAttribute("aria-label", "Close");
    box.appendChild(img);
    box.appendChild(close);
    document.body.appendChild(box);

    var last = null;
    function open(src, alt) {
      last = document.activeElement;
      img.src = src; img.alt = alt || "";
      box.hidden = false;
      document.documentElement.classList.add("no-scroll");
      close.focus();
    }
    function shut() {
      box.hidden = true;
      document.documentElement.classList.remove("no-scroll");
      if (last) last.focus();
    }
    box.addEventListener("click", function (e) { if (e.target !== img) shut(); });
    document.addEventListener("keydown", function (e) { if (!box.hidden && e.key === "Escape") shut(); });

    document.querySelectorAll(".fig-frame img, .tab-cover img").forEach(function (fimg) {
      var wrap = fimg.parentElement;
      wrap.classList.add("zoomable");
      wrap.tabIndex = 0;
      wrap.setAttribute("role", "button");
      wrap.setAttribute("aria-label", "Enlarge figure: " + (fimg.alt || ""));
      wrap.addEventListener("click", function () { open(fimg.currentSrc || fimg.src, fimg.alt); });
      wrap.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(fimg.currentSrc || fimg.src, fimg.alt); }
      });
    });
  }

  /* ---------- copy BibTeX ---------- */
  function initCopy() {
    var btn = document.getElementById("copy-bibtex");
    var code = document.getElementById("bibtex");
    if (!btn || !code) return;
    btn.addEventListener("click", function () {
      var text = code.textContent;
      var done = function () {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = "Copy"; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
      } else { fallbackCopy(text); done(); }
    });
  }
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    ta.remove();
  }

  /* ---------- highlight the current section in the nav ---------- */
  function initNav() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav-links a[href^='#']"));
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove("is-active"); });
        var a = map[en.target.id];
        if (a) a.classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) obs.observe(s);
    });
  }

  function init() {
    initLinks();
    initDemos();
    initLightbox();
    initCopy();
    initNav();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
