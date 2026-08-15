/* product frames */
document.getElementById('frames').innerHTML = FRAMES.map(function (f) {
  return '<article class="frame reveal">' +
    '<span class="step">' + f.step + '</span>' +
    '<h3>' + f.title + '</h3>' +
    '<p>' + f.body + '</p>' +
    '<div class="demo">' + f.demo.map(function (l) { return '<div>' + l + '</div>'; }).join('') + '</div>' +
  '</article>';
}).join('');

/* market table */
document.getElementById('landscape').innerHTML =
  '<thead><tr>' + LANDSCAPE.head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead>' +
  '<tbody>' + LANDSCAPE.rows.map(function (r) {
    return '<tr class="' + (r.us ? 'us' : '') + '"><td>' + r.name + '</td>' +
      r.cells.map(function (c) { return '<td class="mark">' + LANDSCAPE.marks[c] + '</td>'; }).join('') + '</tr>';
  }).join('') + '</tbody>';

/* metrics */
function fmt(n) { return n >= 1000000 ? (n / 1000000) + 'M' : Math.round(n / 1000) + 'K'; }
document.getElementById('metrics').innerHTML = METRICS.map(function (m) {
  return '<div class="metric reveal"><div class="k">' + m.k + '</div>' +
    '<div class="v" data-to="' + m.v + '">0</div>' +
    '<div class="s">' + m.s + '</div></div>';
}).join('');

/* team */
document.getElementById('team').innerHTML = TEAM.map(function (p) {
  return '<div class="person reveal"><div class="name">' + p.name + '</div>' +
    '<div class="role">' + p.role + '</div>' +
    '<div class="bio">' + p.bio + '</div></div>';
}).join('');

/* terms */
document.getElementById('terms').innerHTML = TERMS.map(function (t) {
  return '<div class="term reveal"><div class="k">' + t.k + '</div><div class="v">' + t.v + '</div></div>';
}).join('');

/* dot nav */
var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
var dots = document.querySelector('.dots');
dots.innerHTML = slides.map(function (s, i) {
  return '<button type="button" aria-label="' + s.dataset.label + '" data-i="' + i + '"' +
    (i === 0 ? ' aria-current="true"' : '') + '></button>';
}).join('');
var dotBtns = Array.prototype.slice.call(dots.querySelectorAll('button'));
dots.addEventListener('click', function (e) {
  var b = e.target.closest('button');
  if (b) slides[+b.dataset.i].scrollIntoView({ behavior: 'smooth' });
});

var current = 0;
var slideObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (en) {
    if (!en.isIntersecting) return;
    current = slides.indexOf(en.target);
    dotBtns.forEach(function (b, j) { b.setAttribute('aria-current', j === current ? 'true' : 'false'); });
  });
}, { threshold: 0.5 });
slides.forEach(function (s) { slideObs.observe(s); });

/* keyboard */
addEventListener('keydown', function (e) {
  var map = { ArrowDown: 1, ArrowRight: 1, PageDown: 1, ArrowUp: -1, ArrowLeft: -1, PageUp: -1 };
  var step = map[e.key];
  if (!step) return;
  e.preventDefault();
  var t = Math.min(slides.length - 1, Math.max(0, current + step));
  slides[t].scrollIntoView({ behavior: 'smooth' });
});

/* reveal + count up */
function countUp(el) {
  var to = +el.dataset.to, dur = 800, t0 = performance.now();
  function tick(now) {
    var p = Math.min(1, (now - t0) / dur);
    var e = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(to * e);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = fmt(to);
  }
  requestAnimationFrame(tick);
}

var revObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (en) {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    var v = en.target.querySelector('.v[data-to]');
    if (v && !v.dataset.done) { v.dataset.done = '1'; countUp(v); }
    revObs.unobserve(en.target);
  });
}, { threshold: 0.25 });
Array.prototype.slice.call(document.querySelectorAll('.reveal')).forEach(function (el) { revObs.observe(el); });
