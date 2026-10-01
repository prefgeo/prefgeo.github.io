/* PrefGeo figure animations (Fig. 1 teaser, Fig. 2 method overview).
   The SVGs are the paper figures with every part named as in the source slides; this script builds them up
   part by part, zooming into each block while it appears. No dependencies. */
(function () {
  'use strict';

  var GHOST = 0.12;   // opacity of parts that have not appeared yet
  var DIM = 0.38;     // opacity of finished panels while a later part plays
  var FUTURE = 0.45;  // opacity of panel titles that have not started

  // ------------------------------------------------------------------ helpers
  function clamp(v, a, b) { a = a === undefined ? 0 : a; b = b === undefined ? 1 : b; return v < a ? a : v > b ? b : v; }
  function ramp(t, a, b) { return clamp((t - a) / (b - a)); }
  function lerp(a, b, p) { return a + (b - a) * p; }
  var EASE = {
    inOut: function (p) { return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; },
    out: function (p) { return 1 - Math.pow(1 - p, 3); },
    lin: function (p) { return p; }
  };
  function win(t, a, b, f) { f = f || 0.25; return ramp(t, a, a + f) * (1 - ramp(t, b, b + f)); }
  var SVGNS = 'http://www.w3.org/2000/svg';
  function mk(tag, attrs, parent) {
    var e = document.createElementNS(SVGNS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function nums(s) { return (s.match(/-?[\d.]+/g) || []).map(Number); }
  function polyAt(pts, e) {           // point at fraction e along a polyline
    var L = [], tot = 0, i;
    for (i = 1; i < pts.length; i++) { var d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
    var s = e * tot;
    for (i = 1; i < pts.length; i++) {
      if (s <= L[i - 1] || i === pts.length - 1) {
        var q = L[i - 1] ? clamp(s / L[i - 1]) : 1;
        return [lerp(pts[i - 1][0], pts[i][0], q), lerp(pts[i - 1][1], pts[i][1], q)];
      }
      s -= L[i - 1];
    }
    return pts[pts.length - 1];
  }

  // a timeline is built with at(t, duration, effect, selectors, options)
  function Script() { this.steps = []; }
  Script.prototype.at = function (t, d, fx, sel, opt) { this.steps.push({ t: t, d: d, fx: fx, sel: [].concat(sel), opt: opt || {} }); };

  // ================================================================== Fig. 1
  function fig1() {
    var S = new Script(), at = S.at.bind(S);
    var END = 34.1;

    // (a) the two settings: names first, then who holds the preference, then what it applies to
    at(0.9, 0.5, 'fade', 'a-cross-task-heading');
    at(1.2, 0.5, 'fade', 'a-cross-user-heading');
    at(1.2, 0.4, 'fade', 'a-panel-divider');
    at(1.9, 0.5, 'pop', 'a-expert');
    at(2.05, 0.35, 'fade', 'a-expert-label');
    at(2.3, 0.5, 'pop', 'grp-399');
    at(2.8, 0.35, 'draw', ['a-expert-to-push', 'a-expert-to-open', 'a-expert-to-place'], { stagger: 0.12 });
    at(3.1, 0.45, 'pop', ['grp-149', 'grp-154', 'grp-155'], { stagger: 0.15 });
    at(4.2, 0.45, 'pop', ['a-user-1', 'a-user-2', 'a-user-3'], { stagger: 0.15 });
    at(4.8, 0.45, 'pop', ['a-user-concise-bubble', 'a-user-concise-preference'], { group: true });
    at(4.95, 0.45, 'pop', ['a-user-thorough-bubble', 'a-user-thorough-preference'], { group: true });
    at(5.1, 0.45, 'pop', ['a-user-creative-bubble', 'a-user-creative-preference'], { group: true });
    at(5.3, 0.2, 'fade', ['a-user-concise-response-*', 'a-user-thorough-response-*', 'a-creativity-sparkle', 'a-creative-line-*'], { stagger: 0.07 });
    at(5.9, 0.35, 'draw', ['a-llm-to-concise', 'a-llm-to-thorough', 'a-llm-to-creative'], { stagger: 0.1, reverse: true });
    at(6.3, 0.5, 'pop', 'grp-398');

    // (b) factorization: each column's name first, then its content
    at(7.8, 0.4, 'fade', 'ab-column-separator');
    at(8.5, 0.4, 'fade', 'b-rewards-heading');
    at(8.7, 0.45, 'pop', ['b-user-1', 'b-user-2', 'b-user-3'], { stagger: 0.15 });
    at(8.9, 0.35, 'fade', ['b-reward-symbol-0', 'b-reward-head-0-left', 'b-reward-head-0-right']);
    at(9.0, 0.25, 'fade', 'b-user1-reward-feature-*', { stagger: 0.04 });
    at(9.05, 0.35, 'fade', ['b-reward-symbol-1', 'b-reward-head-1-left', 'b-reward-head-1-right']);
    at(9.15, 0.25, 'fade', 'b-user2-reward-feature-*', { stagger: 0.04 });
    at(9.2, 0.35, 'fade', ['b-reward-symbol-2', 'b-reward-head-2-left', 'b-reward-head-2-right']);
    at(9.3, 0.25, 'fade', 'b-user3-reward-feature-*', { stagger: 0.04 });
    at(9.9, 0.4, 'pop', 'b-equals');
    at(10.1, 0.4, 'fade', 'b-weights-heading');
    at(10.3, 0.35, 'fade', ['b-user-weight-label-0', 'b-user-weight-label-1', 'b-user-weight-label-2', 'b-theta1-baseline', 'b-theta2-baseline', 'b-theta3-baseline'], { stagger: 0.05 });
    at(10.4, 0.4, 'grow', ['b-theta1-bar-*', 'b-theta2-bar-*', 'b-theta3-bar-*'], { stagger: 0.04 });
    at(11.0, 0.4, 'pop', 'b-multiply');
    at(11.2, 0.4, 'fade', 'b-basis-heading');
    at(11.3, 0.4, 'fade', ['b-a-symbol', 'b-shared-basis-a-bracket-left', 'b-shared-basis-a-bracket-right']);
    at(11.4, 0.25, 'fade', ['b-component-label-0', 'b-shared-basis-a-row-1-cell-*'], { stagger: 0.035 });
    at(11.6, 0.25, 'fade', ['b-component-label-1', 'b-shared-basis-a-row-2-cell-*'], { stagger: 0.035 });
    at(11.8, 0.25, 'fade', ['b-component-label-2', 'b-shared-basis-a-row-3-cell-*'], { stagger: 0.035 });
    at(12.2, 0.4, 'fade', 'b-latent-components');
    var MIX = [12.7, 13.6, 14.5], MIX_D = 0.85;   // each head = its weights applied to the shared rows

    // (c) prior methods
    at(16.3, 0.4, 'fade', 'row-separator');
    at(16.9, 0.45, 'fade', ['c-cross-context-data', 'c-data-line-1', 'c-data-context-chip-*'], { stagger: 0.06 });
    at(17.3, 0.3, 'draw', 'c-data-outlet');
    at(17.55, 0.3, 'draw', 'c-shared-data-branch');
    at(17.9, 0.4, 'fade', ['c-previous-heading', 'c-previous-heading-note']);
    at(18.2, 0.25, 'fade', ['c-data-to-previous-shaft', 'c-data-to-previous-tip']);
    at(18.4, 0.45, 'pop', ['c-joint-factorization-5', 'c-joint-line-1'], { group: true });
    at(18.9, 0.3, 'draw', 'c-joint-to-issues-shaft');
    at(19.15, 0.15, 'fade', 'c-joint-to-issues-tip');
    at(20.1, 0.35, 'fade', ['c-previous-selection-candidate-1-theta-label', 'c-previous-selection-candidate-1-basis-label']);
    at(20.2, 0.35, 'grow', 'c-previous-selection-candidate-1-theta-bar-*', { stagger: 0.05 });
    at(20.3, 0.3, 'fade', ['c-previous-selection-candidate-1-times', 'c-previous-selection-candidate-1-basis-row-*', 'c-previous-selection-candidate-1-basis-bracket-*'], { stagger: 0.012 });
    at(20.75, 0.45, 'pop', 'c-previous-selection-equals');
    at(20.95, 0.35, 'fade', ['c-previous-selection-candidate-2-theta-label', 'c-previous-selection-candidate-2-theta-tilde', 'c-previous-selection-candidate-2-basis-label']);
    at(21.05, 0.35, 'grow', 'c-previous-selection-candidate-2-theta-bar-*', { stagger: 0.05 });
    at(21.15, 0.3, 'fade', ['c-previous-selection-candidate-2-times', 'c-previous-selection-candidate-2-basis-row-*', 'c-previous-selection-candidate-2-basis-bracket-*'], { stagger: 0.012 });
    at(21.8, 0.5, 'pop', ['c-joint-factorization-4', 'grp-135', 'c-previous-selection-caption'], { group: true });
    at(22.4, 0.4, 'fade', ['c-previous-geometry-header-*', 'c-previous-geometry-keeps-header']);
    at(22.6, 0.4, 'fade', ['c-previous-geometry-progress-label', 'c-previous-geometry-progress-pair-*', 'c-previous-geometry-progress-behavior-*']);
    at(22.8, 0.4, 'fade', ['c-previous-geometry-smoothness-label', 'c-previous-geometry-smoothness-pair-*', 'c-previous-geometry-smoothness-behavior-*']);
    at(23.0, 0.3, 'fade', ['c-previous-geometry-progress-true-weight', 'c-previous-geometry-smoothness-true-weight']);
    at(23.0, 0.2, 'custom', ['c-previous-geometry-progress-kept-weight', 'c-previous-geometry-smoothness-kept-weight', 'c-previous-geometry-progress-kept-share', 'c-previous-geometry-smoothness-kept-share']);
    at(24.4, 0.5, 'pop', ['c-joint-factorization-3', 'grp-136', 'c-previous-rescale-caption'], { group: true });
    // PrefGeo
    at(25.8, 0.4, 'fade', ['c-prefgeo-heading', 'c-prefgeo-heading-note']);
    at(26.05, 0.3, 'fade', ['c-data-to-prefgeo-shaft', 'c-data-to-prefgeo-tip']);
    at(26.3, 0.45, 'pop', ['c-independent-estimation-box', 'c-independent-title-one'], { group: true });
    at(26.8, 0.25, 'draw', 'c-independent-to-unmix-shaft');
    at(27.0, 0.15, 'fade', 'c-independent-to-unmix-tip');
    at(27.05, 0.45, 'pop', ['c-unmix-box', 'c-unmix-title'], { group: true });
    at(27.5, 0.3, 'draw', 'c-unmix-to-benefits-shaft');
    at(27.75, 0.15, 'fade', 'c-unmix-to-benefits-tip');
    at(28.6, 0.35, 'fade', ['c-prefgeo-selection-candidate-1-theta-label', 'c-prefgeo-selection-candidate-1-basis-label']);
    at(28.7, 0.35, 'grow', 'c-prefgeo-selection-candidate-1-theta-bar-*', { stagger: 0.05 });
    at(28.8, 0.3, 'fade', ['c-prefgeo-selection-candidate-1-times', 'c-prefgeo-selection-candidate-1-basis-row-*', 'c-prefgeo-selection-candidate-1-basis-bracket-*'], { stagger: 0.012 });
    at(29.25, 0.4, 'fade', ['c-prefgeo-selection-candidate-2-*']);
    at(29.55, 0.45, 'draw', 'c-prefgeo-selection-reject');
    at(30.0, 0.5, 'pop', ['c-joint-factorization-2', 'c-prefgeo-selection-caption-mark', 'c-prefgeo-selection-caption'], { group: true });
    at(30.6, 0.4, 'fade', ['c-prefgeo-geometry-header-*', 'c-prefgeo-geometry-keeps-header']);
    at(30.8, 0.4, 'fade', ['c-prefgeo-geometry-progress-label', 'c-prefgeo-geometry-progress-pair-*', 'c-prefgeo-geometry-progress-behavior-*']);
    at(31.0, 0.4, 'fade', ['c-prefgeo-geometry-smoothness-label', 'c-prefgeo-geometry-smoothness-pair-*', 'c-prefgeo-geometry-smoothness-behavior-*']);
    at(31.2, 0.3, 'fade', ['c-prefgeo-geometry-progress-true-weight', 'c-prefgeo-geometry-smoothness-true-weight']);
    at(31.2, 0.2, 'custom', ['c-prefgeo-geometry-progress-kept-weight', 'c-prefgeo-geometry-smoothness-kept-weight', 'c-prefgeo-geometry-progress-kept-share', 'c-prefgeo-geometry-smoothness-kept-share']);
    at(32.6, 0.5, 'pop', ['c-joint-factorization', 'c-prefgeo-rescale-caption-mark', 'c-prefgeo-rescale-caption'], { group: true });

    var SHRINK = [['c-previous-geometry', 23.2], ['c-prefgeo-geometry', 31.4]];  // kept weight shrinks from the true weight
    var SHRINK_D = 1.0;
    var ROWCOL = ['#6583A1', '#AA886A', '#81709D'];

    function panelOf(id) {
      if (/^(a|b|c)-panel-title$/.test(id)) return 'title-' + id[0];
      if (/^(ab-column-separator|row-separator)$/.test(id)) return 'none';
      if (/^grp-(149|154|155|398|399)$/.test(id)) return 'a';
      if (/^grp-/.test(id)) return 'c';
      return /^[abc]-/.test(id) ? id[0] : 'none';
    }
    function level(panel, t) {
      var back = (1 - DIM) * ramp(t, END, END + 0.8);
      switch (panel) {
        case 'a': case 'title-a': return 1 - (1 - DIM) * ramp(t, 7.7, 8.3) + back;
        case 'b': return 1 - (1 - DIM) * ramp(t, 16.2, 16.8) + back;
        case 'title-b': return FUTURE + (1 - FUTURE) * ramp(t, 7.7, 8.2) - (1 - DIM) * ramp(t, 16.2, 16.8) + back;
        case 'title-c': return FUTURE + (1 - FUTURE) * ramp(t, 16.2, 16.7);
        default: return 1;
      }
    }

    return {
      prefix: 'f1-', maxZoom: 1.6,
      end: END, holdEnd: END + 4.2, total: END + 5.0,
      steps: S.steps,
      panelOf: panelOf, level: level,
      chapters: [
        { label: 'Contexts', t0: 0, t1: 7.7 },
        { label: 'Factorization', t0: 7.7, t1: 16.2 },
        { label: 'Prior methods', t0: 16.2, t1: 25.0 },
        { label: 'PrefGeo', t0: 25.0, t1: END }
      ],
      camera: [
        [0, 0.4, null],
        [1.1, 7.0, [8, 6, 1060, 434]],
        [7.7, 7.9, null],
        [8.6, 15.5, [1066, 6, 1100, 434]],
        [16.2, 16.4, null],
        [17.1, 19.3, [4, 445, 1350, 435]],
        [20.0, 25.0, [815, 445, 1351, 435]],
        [25.7, 27.8, [4, 445, 1350, 435]],
        [28.5, 33.2, [815, 445, 1351, 435]],
        [34.0, 99, null]
      ],
      captions: [
        [0, 'Two settings where preferences change with the <b>context</b>: the task being done, or the user being served.'],
        [1.8, '<b>Cross-task generalization:</b> an expert\'s preference, e.g., effective and safe, should carry over to new tasks.'],
        [4.1, '<b>Pluralistic personalization:</b> different users want different things from the same LLM, e.g., concise, thorough, or creative answers.'],
        [7.7, 'Each context <i>c</i> has its own <b>reward head</b> <i>v<sub>c</sub></i> over shared behavior features.'],
        [9.9, '<b>Preference reward factorization</b> writes every head as a mixture of a few shared components: <i>v<sub>c</sub></i> = <i>A</i><sup>⊤</sup><i>θ<sub>c</sub></i>.'],
        [12.6, 'Each head uses the shared rows of <i>A</i> in proportion to its weights <i>θ<sub>c</sub></i>, so a new context only needs its <i>K</i> weights, not a whole new head.'],
        [16.2, '<b>Prior methods</b> fit <i>A</i> and <i>θ</i> jointly, directly from preference data.'],
        [20.0, '<b>Factorization ambiguity:</b> different pairs (<i>θ</i>, <i>A</i>) and (<i>θ̃</i>, <i>Ã</i>) fit the source preferences equally well, yet transfer differently.'],
        [22.3, '<b>Geometry bias:</b> comparisons barely reveal smoothness, so a Euclidean penalty keeps only 20% of it, though it matters as much as progress.'],
        [25.0, '<b>PrefGeo</b> decouples the two: estimate each context\'s reward head independently, then recover the basis by minimum-volume geometric unmixing.'],
        [28.5, 'Minimum volume picks a <b>compact, non-degenerate basis</b> instead of an arbitrary one.'],
        [30.5, 'Measuring rewards with the Fisher metric <i>G</i> keeps subtle criteria: smoothness retains 96%.']
      ],
      holdCaption: 'Preference reward factorization, and how PrefGeo learns the shared basis.',
      init: function (a) {
        var top = a.top;
        function rect(id) { return a.el(id).querySelector('rect'); }
        var rowY = [1, 2, 3].map(function (k) { return +rect('b-shared-basis-a-row-' + k + '-cell-1').getAttribute('y'); });
        var ax0 = +rect('b-shared-basis-a-row-1-cell-1').getAttribute('x');
        var ax1 = +rect('b-shared-basis-a-row-1-cell-8').getAttribute('x') + 24;
        var vx0 = +rect('b-user1-reward-feature-1').getAttribute('x');
        var vx1 = +rect('b-user1-reward-feature-8').getAttribute('x') + 24;
        a.mix = [1, 2, 3].map(function (c) {
          var th = [1, 2, 3].map(function (k) { return +rect('b-theta' + c + '-bar-' + k).getAttribute('height'); });
          var mx = Math.max.apply(null, th);
          var vy = +rect('b-user' + c + '-reward-feature-1').getAttribute('y');
          var by = nums(a.el('b-theta' + c + '-baseline').querySelector('path').getAttribute('d'))[1];
          var g = mk('g', { 'aria-hidden': 'true' }, top);
          var rows = [0, 1, 2].map(function (k) {
            return { w: th[k] / mx, el: mk('rect', { x: ax0 - 8, y: rowY[k] - 5, width: ax1 - ax0 + 16, height: 48, rx: 8,
              fill: ROWCOL[k], 'fill-opacity': 0.16 * th[k] / mx, stroke: ROWCOL[k], 'stroke-width': 3, 'stroke-opacity': th[k] / mx }, g) };
          });
          var tf = mk('rect', { x: 1592, y: by - 64, width: 162, height: 72, rx: 9, fill: 'none', stroke: '#3E8174', 'stroke-width': 3 }, g);
          var vf = mk('rect', { x: vx0 - 14, y: vy - 9, width: vx1 - vx0 + 28, height: 56, rx: 9, fill: 'none', stroke: '#3E8174', 'stroke-width': 3 }, g);
          return { rows: rows, tf: tf, vf: vf };
        });
        a.keep = [];
        SHRINK.forEach(function (sp) {
          ['progress', 'smoothness'].forEach(function (cr) {
            var kept = rect(sp[0] + '-' + cr + '-kept-weight');
            var full = +rect(sp[0] + '-' + cr + '-true-weight').getAttribute('width');
            var txt = a.el(sp[0] + '-' + cr + '-kept-share').querySelector('text');
            txt.removeAttribute('textLength');
            txt.removeAttribute('lengthAdjust');
            var span = txt.querySelector('tspan');
            a.keep.push({ rect: kept, full: full, fin: +kept.getAttribute('width'), span: span, pct: parseInt(span.textContent, 10), t: sp[1] });
          });
        });
      },
      render: function (a, t, reset) {
        a.mix.forEach(function (m, i) {
          var t0 = MIX[i], t1 = t0 + MIX_D;
          var on = reset ? 0 : 1;
          m.tf.style.opacity = on * win(t, t0, t1, 0.2);
          m.rows.forEach(function (r) { r.el.style.opacity = on * win(t, t0 + 0.15, t1, 0.2); });
          m.vf.style.opacity = on * win(t, t0 + 0.35, t1, 0.2);
        });
        a.keep.forEach(function (k) {
          var q = EASE.inOut(ramp(t, k.t, k.t + SHRINK_D));
          k.rect.setAttribute('width', lerp(k.full, k.fin, q).toFixed(2));
          k.span.textContent = Math.round(lerp(100, k.pct, q)) + '%';
        });
      }
    };
  }

  // ================================================================== Fig. 2
  function fig2() {
    var S = new Script(), at = S.at.bind(S);
    var END = 36.3;

    // (a) Predict: source data (pairs + labels) -> encoder -> comparison features -> Fisher metric and heads -> BT fit
    at(0.9, 0.5, 'fade', 'a-source-data');
    at(1.1, 0.4, 'fade', ['a-source-data-title-*', 'c-data-context-chip-*'], { stagger: 0.06 });
    at(1.3, 0.4, 'fade', 'a-pair-caption');
    at(1.4, 0.45, 'pop', ['a-pair-layer-1-*'], { group: true });
    at(1.55, 0.45, 'pop', ['a-pair-layer-2-*'], { group: true });
    at(1.7, 0.45, 'pop', ['a-pair-layer-3-*'], { group: true });
    at(2.0, 0.4, 'fade', ['a-labels-caption', 'a-labels-caption-2']);
    at(2.1, 0.45, 'pop', ['a-label-tag-1', 'a-label-tag-symbol'], { group: true });
    at(2.2, 0.45, 'pop', ['a-label-tag-2']);
    at(2.3, 0.45, 'pop', ['a-label-tag-3']);
    at(2.9, 0.35, 'draw', ['a-pair-to-encoder-shaft']);
    at(3.2, 0.15, 'fade', ['a-pair-to-encoder-tip']);
    at(3.3, 0.5, 'pop', ['a-encoder', 'a-encoder-line-1', 'a-encoder-line-2', 'a-encoder-symbol'], { group: true });
    at(3.5, 0.5, 'pop', ['a-encoder-frozen']);
    at(4.0, 0.2, 'draw', ['a-encoder-to-difference']);
    at(4.15, 0.35, 'pop', ['a-difference-node', 'a-difference-minus'], { group: true });
    at(4.4, 0.2, 'draw', ['a-difference-to-features-shaft']);
    at(4.55, 0.15, 'fade', ['a-difference-to-features-tip']);
    at(4.6, 0.3, 'fade', ['a-comparison-features-layer-1-backing', 'a-comparison-features-layer-1-cell-*'], { stagger: 0.04 });
    at(4.8, 0.3, 'fade', ['a-comparison-features-layer-2-backing', 'a-comparison-features-layer-2-cell-*'], { stagger: 0.04 });
    at(5.0, 0.3, 'fade', ['a-comparison-features-layer-3-backing', 'a-comparison-features-layer-3-cell-*'], { stagger: 0.04 });
    at(5.2, 0.4, 'fade', 'a-comparison-features-label');
    at(5.9, 0.6, 'draw', 'elbow-265');
    at(6.1, 0.4, 'fade', 'a-induce-label');
    at(6.45, 0.5, 'pop', ['a-fisher-metric-block', 'a-fisher-block-line-1'], { group: true });
    at(7.0, 0.8, 'draw', 'a-features-to-heads-hop');
    at(7.8, 0.4, 'custom', ['a-reward-head-1', 'a-reward-head-2', 'a-reward-head-3']);
    at(8.3, 0.4, 'fade', 'a-reward-heads-caption');
    at(8.5, 0.45, 'pop', 'a-bt-loss-label');
    at(8.65, 0.5, 'fade', ['a-bt-loss-flow-path', 'a-bt-loss-flow-head', 'a-bt-loss-flow-tail']);
    at(8.9, 0.6, 'draw', 'elbow-268');
    at(9.1, 0.4, 'fade', 'a-regulariser-label');
    // each source label goes through the BT loss to its own context's head, which moves a step toward its fit
    var HEADP = [9.6, 9.85, 10.1, 10.35, 10.6, 10.85], HEADP_D = 0.65, HEADP_K = [1, 2, 3, 1, 2, 3];
    var HEAD_START = { 1: [503, 587], 2: [507, 580], 3: [511, 587] };

    // (b) Unmix
    at(12.6, 0.5, 'fade', ['b-legend', 'b-legend-*']);
    at(14, 0.6, 'draw', 'metric-defines-geometry-shaft');
    at(14.55, 0.2, 'fade', ['metric-defines-geometry-tip', 'b-define-label']);
    at(14.2, 0.6, 'draw', 'heads-embedded-as-points-shaft');
    at(14.75, 0.2, 'fade', ['heads-embedded-as-points-tip', 'b-embed-label']);
    at(14.4, 0.7, 'fade', ['b-reward-space', 'b-space-caption-2']);
    var FLIGHT = { t: 15.1, d: 1.0, stagger: 0.12, order: [2, 1, 3] };
    at(16.1, 0.35, 'pop', ['b-source-head-2', 'b-source-head-1', 'b-source-head-3'], { stagger: 0.12 });
    at(17.1, 0.5, 'fade', 'b-candidate-simplex');
    at(17.2, 0.35, 'pop', ['b-candidate-component-1', 'b-candidate-component-2', 'b-candidate-component-3'], { stagger: 0.1 });
    at(17.6, 0.5, 'fade', ['b-loss-row', 'b-recovery-label', 'b-loss-lead', 'b-loss-plus-1', 'b-loss-plus-2',
      'b-loss-icon-*', 'b-loss-term-1', 'b-loss-term-2', 'b-loss-term-3']);
    // one objective: reconstruction, volume and non-degeneracy act together while the simplex shrinks
    var SHRINK = [18.3, 20.3], OBJ = [18.1, 20.7];
    at(18.1, 0.2, 'custom', ['b-recovered-simplex', 'b-component-1', 'b-component-2', 'b-component-3']);
    at(18.4, 1.85, 'draw', ['b-shrink-arrow-1-shaft', 'b-shrink-arrow-2-shaft', 'b-shrink-arrow-3-shaft'], { ease: 'inOut' });
    at(20.1, 0.2, 'fade', ['b-shrink-arrow-1-tip', 'b-shrink-arrow-2-tip', 'b-shrink-arrow-3-tip']);
    at(18.5, 0.3, 'draw', ['b-reconstruction-flow-1-path', 'b-reconstruction-flow-2-path', 'b-reconstruction-flow-3-path'], { stagger: 0.1 });
    at(18.7, 0.15, 'fade', ['b-reconstruction-flow-1-head', 'b-reconstruction-flow-2-head', 'b-reconstruction-flow-3-head'], { stagger: 0.1 });
    at(18.6, 0.4, 'pop', ['b-mixture-1', 'b-mixture-2', 'b-mixture-3'], { stagger: 0.1 });
    at(18.9, 0.6, 'draw', 'b-non-degeneracy-angle');
    at(20.3, 0.5, 'fade', ['b-component-1-label', 'b-component-2-label', 'b-component-3-label'], { stagger: 0.08 });
    // outputs
    at(21.3, 0.35, 'draw', 'b-geometry-to-outputs-shaft');
    at(21.6, 0.15, 'fade', 'b-geometry-to-outputs-tip');
    at(21.6, 0.4, 'fade', 'b-mixture-weights-label');
    at(21.7, 0.3, 'fade', ['b-output-weights-1-base', 'b-output-weights-2-base', 'b-output-weights-3-base', 'b-output-weights-1-context', 'b-output-weights-2-context', 'b-output-weights-3-context']);
    at(21.75, 0.4, 'grow', ['b-output-weights-1-bar-*'], { stagger: 0.05 });
    at(21.9, 0.4, 'grow', ['b-output-weights-2-bar-*'], { stagger: 0.05 });
    at(22.05, 0.4, 'grow', ['b-output-weights-3-bar-*'], { stagger: 0.05 });
    at(22.2, 0.4, 'fade', 'b-mixture-weights-caption');
    at(22.4, 0.4, 'fade', ['b-recovered-basis-label', 'b-recovered-basis-bracket-left', 'b-recovered-basis-bracket-right']);
    at(22.5, 0.25, 'fade', ['b-recovered-basis-row-1-cell-*', 'b-recovered-basis-row-2-cell-*', 'b-recovered-basis-row-3-cell-*'], { stagger: 0.035 });
    at(23.05, 0.4, 'fade', 'b-recovered-basis-caption');

    // (c) Remix
    at(25.5, 0.6, 'draw', 'c-frozen-basis-to-reward-shaft');
    at(26.05, 0.15, 'fade', 'c-frozen-basis-to-reward-tip');
    at(25.7, 0.4, 'fade', 'mean-label-2');
    at(26.1, 0.5, 'pop', ['c-frozen-basis-lock-shackle', 'c-frozen-basis-lock-body'], { group: true });
    at(26.6, 0.5, 'draw', 'mean-of-source-weights-shaft');
    at(27.05, 0.15, 'fade', 'mean-of-source-weights-tip');
    at(26.75, 0.4, 'fade', 'mean-label');
    at(27.1, 0.3, 'fade', 'c-initial-weights-baseline');
    at(27.15, 0.45, 'grow', ['c-initial-weights-bar-1', 'c-initial-weights-bar-2', 'c-initial-weights-bar-3'], { stagger: 0.08 });
    at(27.5, 0.4, 'fade', 'c-initial-weights-label');
    at(28.8, 0.5, 'pop', ['c-new-user', 'c-new-task'], { stagger: 0.12 });
    at(29.05, 0.4, 'fade', 'c-new-context-label');
    at(29.3, 0.5, 'fade', ['c-feedback-in-path', 'c-feedback-in-head', 'c-feedback-label-1', 'c-feedback-label-2']);
    at(29.45, 0.45, 'pop', 'c-bt-loss-label');
    at(29.6, 0.6, 'draw', 'c-update-shaft');
    at(30.15, 0.15, 'fade', 'c-update-tip');
    at(29.7, 0.4, 'fade', 'c-update-label');
    at(29.9, 0.3, 'fade', 'c-adapted-weights-baseline');
    at(29.9, 0.3, 'custom', ['c-adapted-weights-bar-1', 'c-adapted-weights-bar-2', 'c-adapted-weights-bar-3'], { noGhost: true });
    var PULSES = [30.2, 30.7, 31.2, 31.7], PULSE_D = 0.5, STEP_D = 0.35;
    at(32.65, 0.4, 'fade', 'c-adapted-weights-label');
    at(33.5, 0.35, 'draw', 'c-weights-to-reward-shaft');
    at(33.8, 0.15, 'fade', 'c-weights-to-reward-tip');
    at(33.85, 0.5, 'pop', ['c-target-reward', 'c-target-reward-title'], { group: true });
    at(34.35, 0.35, 'draw', 'c-reward-to-downstream-shaft');
    at(34.65, 0.15, 'fade', 'c-reward-to-downstream-tip');
    at(34.7, 0.5, 'pop', ['c-downstream-llm', 'c-downstream-robot'], { stagger: 0.12 });
    at(34.95, 0.4, 'fade', 'c-downstream-label');

    var B_OUT = /^b-(output-weights|mixture-weights|recovered-basis|geometry-to-outputs)/;
    function panelOf(id) {
      if (/^(a|b|c)-(title|subtitle)$/.test(id)) return 'title-' + id[0];
      if (/^separator/.test(id)) return 'none';
      if (/^c-data-context-chip/.test(id) || /^elbow-/.test(id)) return 'a';
      if (/^(metric-defines|heads-embedded)/.test(id)) return 'b';
      if (/^mean-/.test(id)) return 'c';
      if (B_OUT.test(id)) return 'b-out';
      return /^[abc]-/.test(id) ? id[0] : 'none';
    }
    function level(panel, t) {
      var back = (1 - DIM) * ramp(t, END, END + 0.8);
      switch (panel) {
        case 'a': case 'title-a': return 1 - (1 - DIM) * ramp(t, 16.4, 17) + back;
        case 'b': return 1 - (1 - DIM) * ramp(t, 24.9, 25.5) + back;
        case 'title-b': return FUTURE + (1 - FUTURE) * ramp(t, 12.4, 12.9) - (1 - DIM) * ramp(t, 24.9, 25.5) + back;
        case 'title-c': return FUTURE + (1 - FUTURE) * ramp(t, 24.7, 25.2);
        default: return 1;
      }
    }

    return {
      prefix: 'f2-', maxZoom: 1.5,
      end: END, holdEnd: END + 4.2, total: END + 5.0,
      steps: S.steps,
      panelOf: panelOf, level: level,
      chapters: [
        { label: 'Predict', t0: 0, t1: 12.4 },
        { label: 'Unmix', t0: 12.4, t1: 24.7 },
        { label: 'Remix', t0: 24.7, t1: END }
      ],
      camera: [
        [0, 0.3, null],
        [1.1, 11.8, [15, 165, 705, 570]],
        [12.4, 13.3, null],
        [14.1, 16.6, [380, 240, 1000, 470]],
        [17.3, 20.5, [700, 230, 940, 600]],
        [21.2, 27.8, [1330, 370, 560, 300]],
        [28.6, 99, null]
      ],
      captions: [
        [0, '<b>Predict → Unmix → Remix.</b> Source data come from several contexts (tasks or users).'],
        [1.0, 'Each source context provides behavior pairs and preference labels <i>y<sub>c</sub></i>.'],
        [2.9, 'A frozen pre-trained encoder maps each behavior to features <i>z</i>(·); a comparison becomes the feature difference Δ<i>z</i>.'],
        [5.9, 'The comparison features induce the Fisher metric <i>G</i>, and each context gets its own linear reward head <i>v̂<sub>c</sub></i> on them.'],
        [9.4, 'Each head is fit only to its own context\'s labels (Bradley–Terry loss), regularized under <i>G</i>: every label moves its own head.'],
        [12.4, '<b>Unmix.</b> The heads become fixed points in reward space, whose geometry is defined by <i>G</i>.'],
        [17.1, 'Many simplices contain the heads and reconstruct them equally well.'],
        [18.1, 'PrefGeo minimizes one objective: reconstruction (ℒ<sub>recon</sub>), Fisher volume (𝒱<sub><i>G</i></sub>) and non-degeneracy (ℛ) together shrink the simplex onto the heads. Its vertices are the components <i>a<sub>k</sub></i>.'],
        [20.8, 'Unmixing returns each source context\'s mixture weights <i>θ̂<sub>c</sub></i> and the reward basis <i>Â</i>.'],
        [24.7, '<b>Remix.</b> For a new user or task, the basis is frozen and the weights start from the average source mixture <i>θ</i><sub>0</sub>, already a zero-shot reward.'],
        [28.6, 'Each few-shot label updates only the <i>K</i> mixture weights, moving <i>θ</i><sub>0</sub> to <i>θ̂<sub>c⋆</sub></i>.'],
        [33.4, 'The adapted reward <i>Â</i><sup>⊤</sup><i>θ̂<sub>c⋆</sub></i> then trains the downstream policy, a robot or an LLM.']
      ],
      holdCaption: 'Predict, Unmix, Remix: the full pipeline.',
      init: function (a) {
        var top = a.top;
        function pts(id) {
          var n = nums(a.el(id).querySelector('path').getAttribute('d')), out = [];
          for (var i = 0; i + 1 < n.length; i += 2) out.push([n[i], n[i + 1]]);
          return out;
        }
        a.cand = pts('b-candidate-simplex');
        a.rec = pts('b-recovered-simplex');
        a.recPath = a.el('b-recovered-simplex').querySelector('path');
        a.comps = [1, 2, 3].map(function (k) { return a.el('b-component-' + k); });
        a.angle = a.el('b-non-degeneracy-angle');   // the angle mark rides on vertex a1
        a.heads = [1, 2, 3].map(function (k) {
          var e = a.el('a-reward-head-' + k).querySelector('ellipse');
          return { g: a.el('a-reward-head-' + k), k: k, x: +e.getAttribute('cx'), y: +e.getAttribute('cy') };
        });
        a.bars = [1, 2, 3].map(function (k) {
          var r = a.el('c-adapted-weights-bar-' + k).querySelector('rect');
          var r0 = a.el('c-initial-weights-bar-' + k).querySelector('rect');
          var y = +r.getAttribute('y'), h = +r.getAttribute('height');
          return { rect: r, base: y + h, h1: h, h0: +r0.getAttribute('height') };
        });
        a.flyers = FLIGHT.order.map(function (k) {
          var src = a.el('a-reward-head-' + k).querySelector('ellipse');
          var dst = a.el('b-source-head-' + k).querySelector('ellipse');
          var e = src.cloneNode(true);
          top.appendChild(e);
          return { el: e, x0: +src.getAttribute('cx'), y0: +src.getAttribute('cy'), r0: +src.getAttribute('rx'),
            x1: +dst.getAttribute('cx'), y1: +dst.getAttribute('cy'), r1: +dst.getAttribute('rx') };
        });
        // the whole objective is highlighted while it acts
        var row = a.el('b-loss-row');
        a.pill = mk('rect', { x: 738, y: 762, width: 866, height: 48, rx: 14, fill: '#D3E8DF', 'aria-hidden': 'true' });
        row.parentNode.insertBefore(a.pill, row.nextSibling);
      },
      travelers: (function () {
        var out = [];
        // comparisons flowing from the pairs through the encoder into the comparison features
        var path = [[205, 290], [276, 281], [360, 281], [468, 281], [520, 281]];
        ['#DDBB45', '#E08DA2', '#7B8CA3'].forEach(function (c, i) {
          out.push({ t: 3.0 + i * 0.35, d: 1.4, pts: path, color: c, r: 7 });
        });
        // source labels: through the BT loss to their own head
        var HEADS = { 1: [480.8, 595.6], 2: [508.0, 566.1], 3: [533.0, 597.8] }, HC = { 1: '#DDBB45', 2: '#E08DA2', 3: '#7B8CA3' };
        HEADP.forEach(function (t, i) {
          var k = HEADP_K[i];
          out.push({ t: t, d: HEADP_D, pts: [[196, 583], [452, 583], HEADS[k]], color: HC[k], r: 6 });
        });
        // few-shot labels arriving at the update
        PULSES.forEach(function (t) { out.push({ t: t, d: PULSE_D, pts: [[1919.9, 266], [1919.9, 401]], color: '#E2735A', r: 6 }); });
        return out;
      })(),
      render: function (a, t, reset) {
        var s = EASE.inOut(ramp(t, SHRINK[0], SHRINK[1])), d = '';
        for (var i = 0; i < 3; i++) {
          var x = lerp(a.cand[i][0], a.rec[i][0], s), y = lerp(a.cand[i][1], a.rec[i][1], s);
          d += (i ? 'L' : 'M') + x.toFixed(2) + ' ' + y.toFixed(2);
          var dx = (a.cand[i][0] - a.rec[i][0]) * (1 - s), dy = (a.cand[i][1] - a.rec[i][1]) * (1 - s);
          var tr = s < 1 ? 'translate(' + dx.toFixed(2) + ' ' + dy.toFixed(2) + ')' : '';
          a.comps[i].setAttribute('transform', tr);
          if (i === 0) a.angle.setAttribute('transform', tr);
        }
        a.recPath.setAttribute('d', d + 'Z');

        a.flyers.forEach(function (f, i) {
          var t0 = FLIGHT.t + i * FLIGHT.stagger, q = ramp(t, t0, t0 + FLIGHT.d);
          var on = q > 0 && q < 1 && !reset;
          f.el.style.opacity = on ? 1 : 0;
          if (!on) return;
          var e = EASE.inOut(q), m = 1 - e;
          var c1x = 700, c1y = f.y0, c2x = 880, c2y = 590;
          var x = m * m * m * f.x0 + 3 * m * m * e * c1x + 3 * m * e * e * c2x + e * e * e * f.x1;
          var y = m * m * m * f.y0 + 3 * m * m * e * c1y + 3 * m * e * e * c2y + e * e * e * f.y1;
          var r = lerp(f.r0, f.r1, e);
          f.el.setAttribute('cx', x.toFixed(2)); f.el.setAttribute('cy', y.toFixed(2));
          f.el.setAttribute('rx', r.toFixed(2)); f.el.setAttribute('ry', r.toFixed(2));
        });

        a.heads.forEach(function (h) {
          var n = 0, m = 0;
          HEADP.forEach(function (t0, i) {
            if (HEADP_K[i] !== h.k) return;
            m++;
            n += EASE.out(ramp(t, t0 + HEADP_D, t0 + HEADP_D + 0.3));
          });
          var f = n / m, st = HEAD_START[h.k];
          var dx = (st[0] - h.x) * (1 - f), dy = (st[1] - h.y) * (1 - f);
          h.g.setAttribute('transform', f < 1 ? 'translate(' + dx.toFixed(2) + ' ' + dy.toFixed(2) + ')' : '');
        });

        var steps = 0;
        PULSES.forEach(function (t0) { steps += EASE.out(ramp(t, t0 + PULSE_D, t0 + PULSE_D + STEP_D)); });
        var f = steps / PULSES.length;
        a.bars.forEach(function (b) {
          var h = lerp(b.h0, b.h1, f);
          b.rect.setAttribute('y', (b.base - h).toFixed(2));
          b.rect.setAttribute('height', h.toFixed(2));
        });

        a.pill.style.opacity = reset ? 0 : win(t, OBJ[0], OBJ[1], 0.3);
      }
    };
  }

  // ================================================================== engine
  function Anim(spec, figure, svg) {
    this.spec = spec;
    this.figure = figure;
    this.svg = svg;
    this.t = 0;
    this.playing = false;
    this.userPaused = false;
    this.units = [];
    this.byId = {};
    var vb = nums(svg.getAttribute('viewBox'));
    this.full = { x: vb[0], y: vb[1], w: vb[2], h: vb[3] };
    this._build();
  }

  Anim.prototype.el = function (id) { return this.svg.querySelector('#' + this.spec.prefix + id); };

  Anim.prototype._build = function () {
    var self = this, spec = this.spec, svg = this.svg, pre = spec.prefix;
    // groups named in the script animate as one unit; everything else animates at leaf level
    var groupIds = {};
    spec.steps.forEach(function (s) { s.sel.forEach(function (p) { if (/^grp-/.test(p)) groupIds[p] = 1; }); });
    var gs = svg.querySelectorAll('g[id]');
    for (var i = 0; i < gs.length; i++) {
      var g = gs[i], id = g.id.slice(pre.length);
      if (id === 'bg') continue;
      if (groupIds[id]) { this._addUnit(g, id); continue; }
      if (g.querySelector('g[id]')) continue;
      var p = g.parentNode, inGroup = false;
      while (p && p !== svg) { if (p.id && groupIds[p.id.slice(pre.length)]) inGroup = true; p = p.parentNode; }
      if (!inGroup) this._addUnit(g, id);
    }
    function match(pat) {
      if (pat.slice(-1) === '*') {
        var head = pat.slice(0, -1);
        return self.units.filter(function (u) { return u.id.indexOf(head) === 0; });
      }
      return self.byId[pat] ? [self.byId[pat]] : [];
    }
    spec.steps.forEach(function (s) {
      var list = [];
      s.sel.forEach(function (p) {
        var m = match(p);
        if (!m.length && window.console) console.warn('fig-anim: no match for', p);
        m.forEach(function (u) { if (list.indexOf(u) < 0) list.push(u); });
      });
      list.forEach(function (u, i) {
        u.fx = s.fx;
        u.t0 = s.t + (s.opt.stagger ? i * s.opt.stagger : 0);
        u.d = s.d;
        u.ease = EASE[s.opt.ease || (s.fx === 'draw' ? 'out' : 'inOut')];
        u.noGhost = !!s.opt.noGhost;
        u.reverse = !!s.opt.reverse;
      });
    });
    this.units.forEach(function (u) {
      if ((u.fx === 'draw' || u.fx === 'grow' || u.fx === 'custom') && !u.noGhost) {
        var c = u.el.cloneNode(true);
        c.removeAttribute('id');
        c.setAttribute('aria-hidden', 'true');
        u.el.parentNode.insertBefore(c, u.el);
        u.ghost = c;
      }
      if (u.fx === 'draw') {
        var paths = u.el.querySelectorAll('path');
        u.line = paths[0];
        u.len = u.line.getTotalLength();
        u.heads = Array.prototype.slice.call(paths, 1);
      }
      if (u.fx === 'pop' || u.fx === 'grow') {
        u.el.style.transformBox = 'fill-box';
        u.el.style.transformOrigin = u.fx === 'grow' ? '50% 100%' : '50% 50%';
      }
    });
    this.top = mk('g', { 'aria-hidden': 'true' }, svg);
    this.trav = (spec.travelers || []).map(function (tr) {
      return { spec: tr, el: mk('circle', { r: tr.r || 6, fill: tr.color, stroke: '#FFFFFF', 'stroke-width': 2 }, self.top) };
    });
    if (spec.init) spec.init(this);
    // soft white edges while zoomed, so parts cut by the frame fade out instead of ending abruptly
    var defs = mk('defs', {}, svg), vg = mk('g', { 'aria-hidden': 'true', 'pointer-events': 'none' }, svg);
    this.vig = ['l', 'r', 't', 'b'].map(function (side) {
      var id = pre + 'vig-' + side;
      var v = { l: [1, 0, 0, 0], r: [0, 0, 1, 0], t: [0, 1, 0, 0], b: [0, 0, 0, 1] }[side];
      var gr = mk('linearGradient', { id: id, x1: v[0], y1: v[1], x2: v[2], y2: v[3] }, defs);
      mk('stop', { offset: 0, 'stop-color': '#FFFFFF', 'stop-opacity': 0 }, gr);
      mk('stop', { offset: 1, 'stop-color': '#FFFFFF', 'stop-opacity': 1 }, gr);
      return { side: side, el: mk('rect', { fill: 'url(#' + id + ')' }, vg) };
    });
  };

  Anim.prototype._addUnit = function (g, id) {
    var u = { el: g, id: id, panel: this.spec.panelOf(id), fx: null, t0: 0, d: 1, ease: EASE.out, ghost: null };
    this.units.push(u);
    this.byId[id] = u;
  };

  Anim.prototype._fit = function (b) {
    var F = this.full, AR = F.w / F.h, minW = F.w / (this.spec.maxZoom || 2);
    if (!b) return { x: F.x, y: F.y, w: F.w, h: F.h };
    var w = Math.min(F.w, Math.max(b[2], b[3] * AR, minW)), h = w / AR;
    var cx = b[0] + b[2] / 2, cy = b[1] + b[3] / 2;
    return { x: clamp(cx - w / 2, F.x, F.x + F.w - w), y: clamp(cy - h / 2, F.y, F.y + F.h - h), w: w, h: h };
  };

  Anim.prototype._camera = function (t) {
    var cam = this.spec.camera, F = this.full, i;
    for (i = 0; i < cam.length; i++) if (t >= cam[i][0] && t <= cam[i][1]) return this._fit(cam[i][2]);
    for (i = 0; i + 1 < cam.length; i++) {
      if (t > cam[i][1] && t < cam[i + 1][0]) {
        var A = this._fit(cam[i][2]), B = this._fit(cam[i + 1][2]);
        var e = EASE.inOut(ramp(t, cam[i][1], cam[i + 1][0]));
        var w = Math.exp(lerp(Math.log(A.w), Math.log(B.w), e)), h = w * F.h / F.w;
        var cx = lerp(A.x + A.w / 2, B.x + B.w / 2, e), cy = lerp(A.y + A.h / 2, B.y + B.h / 2, e);
        return { x: clamp(cx - w / 2, F.x, F.x + F.w - w), y: clamp(cy - h / 2, F.y, F.y + F.h - h), w: w, h: h };
      }
    }
    return this._fit(null);
  };

  Anim.prototype.render = function (t) {
    var self = this, spec = this.spec;
    var reset = ramp(t, spec.holdEnd, spec.total);   // fade back to ghosts before looping
    var keep = 1 - reset;
    this.units.forEach(function (u) {
      var lv = spec.level(u.panel, t);
      if (reset > 0 && u.panel.indexOf('title') === 0) lv = lerp(lv, spec.level(u.panel, 0), reset);
      var p = u.fx ? u.ease(ramp(t, u.t0, u.t0 + u.d)) : 1;
      var emph = spec.emph ? spec.emph(u.id, t) : 1;
      var el = u.el, op;
      if (u.ghost) u.ghost.style.opacity = GHOST * lv;
      switch (u.fx) {
        case 'draw':
          el.style.opacity = p > 0 ? lv * keep : 0;
          if (p < 1) {
            u.line.style.strokeDasharray = u.len + ' ' + u.len;
            u.line.style.strokeDashoffset = (u.reverse ? -1 : 1) * u.len * (1 - p);
          } else {
            u.line.style.strokeDasharray = '';
            u.line.style.strokeDashoffset = '';
          }
          u.heads.forEach(function (h) { h.style.opacity = clamp((p - 0.85) / 0.15); });
          return;
        case 'grow':
          el.style.opacity = p > 0 ? lv * keep : 0;
          el.style.transform = p < 1 ? 'scaleY(' + Math.max(p, 0.001) + ')' : '';
          return;
        case 'custom':
          el.style.opacity = p * lv * keep;
          return;
        case 'pop':
          op = lerp(GHOST, 1, p * keep);
          el.style.transform = p > 0 && p < 1 ? 'scale(' + (1 + 0.18 * Math.sin(Math.PI * p)) + ')' : '';
          break;
        case 'fade':
          op = lerp(GHOST, 1, p * keep);
          break;
        default:
          op = 1;
      }
      el.style.opacity = op * lv * emph;
    });
    this.trav.forEach(function (tv) {
      var s = tv.spec, q = ramp(t, s.t, s.t + s.d), on = q > 0 && q < 1 && !reset;
      tv.el.style.opacity = on ? Math.min(1, q / 0.12, (1 - q) / 0.12) : 0;
      if (on) { var pt = polyAt(s.pts, EASE.inOut(q)); tv.el.setAttribute('cx', pt[0].toFixed(1)); tv.el.setAttribute('cy', pt[1].toFixed(1)); }
    });
    if (spec.render) spec.render(this, t, reset > 0);
    var c = this._camera(t), F = this.full;
    this.svg.setAttribute('viewBox', [c.x, c.y, c.w, c.h].map(function (v) { return v.toFixed(1); }).join(' '));
    var fade = clamp((F.w / c.w - 1) / 0.2), ew = 0.08 * c.w, eh = 0.1 * c.h;
    this.vig.forEach(function (v) {
      var r = v.side === 'l' ? [c.x, c.y, ew, c.h] : v.side === 'r' ? [c.x + c.w - ew, c.y, ew, c.h]
        : v.side === 't' ? [c.x, c.y, c.w, eh] : [c.x, c.y + c.h - eh, c.w, eh];
      // no fade along an edge that is the figure's own border
      var atEdge = (v.side === 'l' && c.x <= F.x + 1) || (v.side === 'r' && c.x + c.w >= F.x + F.w - 1) ||
        (v.side === 't' && c.y <= F.y + 1) || (v.side === 'b' && c.y + c.h >= F.y + F.h - 1);
      v.el.setAttribute('x', r[0].toFixed(1)); v.el.setAttribute('y', r[1].toFixed(1));
      v.el.setAttribute('width', r[2].toFixed(1)); v.el.setAttribute('height', r[3].toFixed(1));
      v.el.style.opacity = atEdge ? 0 : fade;
    });
    this.t = t;
    if (this.onRender) this.onRender(t);
  };

  Anim.prototype.play = function () {
    if (this.playing) return;
    this.playing = true;
    var self = this, last = null;
    function frame(now) {
      if (!self.playing) return;
      if (last !== null) {
        var t = self.t + Math.min(0.1, (now - last) / 1000);
        if (t >= self.spec.total) t -= self.spec.total;
        self.render(t);
      }
      last = now;
      self.raf = requestAnimationFrame(frame);
    }
    this.raf = requestAnimationFrame(frame);
    if (this.onState) this.onState();
  };
  Anim.prototype.pause = function () {
    this.playing = false;
    cancelAnimationFrame(this.raf);
    if (this.onState) this.onState();
  };
  Anim.prototype.seek = function (t) { this.render(t); };

  // ------------------------------------------------------------------ controls
  function icon(kind) {
    return kind === 'pause'
      ? '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="2.5" width="3" height="11" rx="1"/><rect x="9.5" y="2.5" width="3" height="11" rx="1"/></svg>'
      : '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 2.8v10.4a.6.6 0 0 0 .9.5l8.3-5.2a.6.6 0 0 0 0-1L5.4 2.3a.6.6 0 0 0-.9.5z"/></svg>';
  }

  function controls(anim, figure, stages) {
    var spec = anim.spec, CH = spec.chapters;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var bar = document.createElement('div');
    bar.className = 'anim-bar';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', 'Figure animation');
    var playBtn = document.createElement('button');
    playBtn.type = 'button';
    playBtn.className = 'anim-play';
    bar.appendChild(playBtn);
    var chWrap = document.createElement('div');
    chWrap.className = 'anim-chapters';
    chWrap.style.gridTemplateColumns = CH.map(function (c) { return (c.t1 - c.t0).toFixed(1) + 'fr'; }).join(' ');
    var fills = [], btns = [];
    CH.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'anim-ch';
      b.innerHTML = '<span class="anim-ch-track"><span class="anim-ch-fill"></span></span><span class="anim-ch-label">' + c.label + '</span>';
      b.addEventListener('click', function () {
        anim.userPaused = false;
        if (reduce) { anim.pause(); anim.seek(c.t1 - 0.01); } else { anim.seek(c.t0); anim.play(); }
      });
      chWrap.appendChild(b);
      btns.push(b);
      fills.push(b.querySelector('.anim-ch-fill'));
    });
    bar.appendChild(chWrap);
    var note = document.createElement('p');
    note.className = 'anim-note';
    var frame = figure.querySelector('.fig-frame');
    frame.parentNode.insertBefore(bar, frame.nextSibling);
    bar.parentNode.insertBefore(note, bar.nextSibling);

    var lastCh = null, lastCap = null;
    function chapterAt(t) {
      if (t >= spec.end) return -1;
      for (var i = CH.length - 1; i >= 0; i--) if (t >= CH[i].t0) return i;
      return 0;
    }
    function captionAt(t) {
      if (t >= spec.end) return spec.holdCaption;
      var c = spec.captions[0][1];
      for (var i = 0; i < spec.captions.length; i++) if (t >= spec.captions[i][0]) c = spec.captions[i][1];
      return c;
    }
    anim.onRender = function (t) {
      var ch = chapterAt(t);
      CH.forEach(function (c, i) {
        var p = t >= spec.holdEnd ? 1 - ramp(t, spec.holdEnd, spec.total) : clamp((t - c.t0) / (c.t1 - c.t0));
        fills[i].style.transform = 'scaleX(' + p.toFixed(4) + ')';
      });
      if (ch !== lastCh) {
        lastCh = ch;
        btns.forEach(function (b, i) { b.classList.toggle('is-current', i === ch); b.setAttribute('aria-current', i === ch ? 'step' : 'false'); });
        if (stages) for (var i = 0; i < stages.length; i++) stages[i].classList.toggle('is-current', i === ch);
      }
      var cap = captionAt(t);
      if (cap !== lastCap) {
        lastCap = cap;
        note.innerHTML = cap;
        note.classList.remove('is-new');
        void note.offsetWidth;
        note.classList.add('is-new');
      }
    };
    anim.onState = function () {
      playBtn.innerHTML = icon(anim.playing ? 'pause' : 'play');
      playBtn.setAttribute('aria-label', anim.playing ? 'Pause animation' : 'Play animation');
    };
    playBtn.addEventListener('click', function () {
      if (anim.playing) { anim.userPaused = true; anim.pause(); }
      else { anim.userPaused = false; anim.play(); }
    });
    anim.onState();

    if (reduce) { anim.seek(spec.end + 1); return; }
    anim.seek(0);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && e.intersectionRatio >= 0.2) { if (!anim.userPaused) anim.play(); }
          else anim.pause();
        });
      }, { threshold: [0, 0.2, 0.5] }).observe(figure);
    } else {
      anim.play();
    }
  }

  // ------------------------------------------------------------------ boot
  var SPECS = { fig1: fig1, fig2: fig2 };
  window.PrefGeoAnims = {};

  function bootOne(figure) {
    var make = SPECS[figure.getAttribute('data-anim')];
    var src = figure.getAttribute('data-svg');
    if (!make || !src || !window.fetch || !window.DOMParser) return;
    var frame = figure.querySelector('.fig-frame');
    fetch(src).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); }).then(function (txt) {
      var doc = new DOMParser().parseFromString(txt, 'image/svg+xml');
      var svg = document.importNode(doc.documentElement, true);
      var img = frame.querySelector('img');
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', img ? img.getAttribute('alt') : '');
      if (img) img.replaceWith(svg); else frame.appendChild(svg);
      var go = function () {
        var anim = new Anim(make(), figure, svg);
        window.PrefGeoAnims[figure.id] = anim;
        var stages = figure.getAttribute('data-stages') ? document.querySelectorAll(figure.getAttribute('data-stages')) : null;
        controls(anim, figure, stages);
      };
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else go();
    }).catch(function () { /* keep the static image */ });
  }

  function boot() {
    var figs = document.querySelectorAll('figure[data-anim]');
    for (var i = 0; i < figs.length; i++) bootOne(figs[i]);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
