/**
 * APP.JS — Fungsi navigasi & utilitas bersama
 * Topi Adat Dayak Kenyah WebAR
 */

// ── Navigasi ──────────────────────────────────────────────
function goTo(page) {
  window.location.href = page;
}

function goBack() {
  window.location.href = 'index.html';
}

// ── Placeholder image fallback ─────────────────────────────
function handleImgError(img, nama) {
  // Buat placeholder SVG dengan nama topi
  const text = nama || 'Topi';
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'>
    <rect width='300' height='200' fill='%23231c14'/>
    <rect x='0' y='0' width='300' height='200' fill='url(%23g)'/>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='%23392a1a'/>
        <stop offset='1' stop-color='%231a1208'/>
      </linearGradient>
    </defs>
    <text x='150' y='85' text-anchor='middle' font-family='serif' font-size='42' fill='%23C9A84C' opacity='0.4'>🎩</text>
    <text x='150' y='125' text-anchor='middle' font-family='Georgia,serif' font-size='14' fill='%23C9A84C' opacity='0.8'>${text}</text>
    <text x='150' y='150' text-anchor='middle' font-family='Arial,sans-serif' font-size='10' fill='%23888' opacity='0.6'>Tambahkan gambar Anda</text>
  </svg>`;
  img.src = `data:image/svg+xml,${svg}`;
  img.onerror = null;
}

// ── Toast Notification ────────────────────────────────────
function showToast(msg, duration = 2500) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ── URL Params ────────────────────────────────────────────
function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

// ── Ripple effect pada klik tombol ───────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn-primary, .btn-secondary, .menu-card').forEach(el => {
    el.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = this.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
});
