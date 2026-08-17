// ---- wall of jellies (slide 04), data lives in data.js ----
(function renderWall() {
  var wall = document.getElementById('wall');
  if (!wall || !window.JELLIES) return;
  wall.innerHTML = window.JELLIES.map(function (j) {
    var tag = '<span class="jtag">' + j.tag + '</span>';
    if (!j.url) {
      return '<div class="jcard empty">' + tag +
        '<span class="jslot" aria-hidden="true"></span>' +
        '<span class="jmeta">open slot</span></div>';
    }
    var thumb = j.thumb
      ? '<img src="' + j.thumb + '" alt="" loading="lazy"><span class="play" aria-hidden="true"></span>'
      : '<span class="play" aria-hidden="true"></span>';
    return '<a class="jcard" href="' + j.url + '" target="_blank" rel="noopener">' + tag +
      '<span class="jthumb">' + thumb + '</span>' +
      '<span class="jtitle">' + j.title + '</span>' +
      '<span class="jmeta">' + j.handle + ' &middot; watch &rarr;</span></a>';
  }).join('');
})();

const deck = document.getElementById('deck');
const slides = [...document.querySelectorAll('.slide')];
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const counter = document.getElementById('counter');

let index = 0;

function paint(i) {
  index = Math.max(0, Math.min(slides.length - 1, i));
  counter.textContent = (index + 1) + ' / ' + slides.length;
  prev.disabled = index === 0;
  next.disabled = index === slides.length - 1;
  slides.forEach(function (s, n) { s.classList.toggle('on', n === index); });
}

function go(i) {
  var target = Math.max(0, Math.min(slides.length - 1, i));
  slides[target].scrollIntoView({ behavior: 'smooth', block: 'start' });
  paint(target);
}

prev.addEventListener('click', function () { go(index - 1); });
next.addEventListener('click', function () { go(index + 1); });

document.addEventListener('keydown', function (e) {
  if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].indexOf(e.key) > -1) { e.preventDefault(); go(index + 1); }
  if (['ArrowLeft', 'ArrowUp', 'PageUp'].indexOf(e.key) > -1) { e.preventDefault(); go(index - 1); }
  if (e.key === 'Home') { e.preventDefault(); go(0); }
  if (e.key === 'End') { e.preventDefault(); go(slides.length - 1); }
});

var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
      paint(slides.indexOf(entry.target));
    }
  });
}, { root: deck, threshold: [0.6] });
slides.forEach(function (s) { io.observe(s); });

var y0 = null;
deck.addEventListener('touchstart', function (e) { y0 = e.touches[0].clientY; }, { passive: true });
deck.addEventListener('touchend', function (e) {
  if (y0 === null) return;
  var dy = y0 - e.changedTouches[0].clientY;
  if (Math.abs(dy) > 60) go(index + (dy > 0 ? 1 : -1));
  y0 = null;
}, { passive: true });

paint(0);
