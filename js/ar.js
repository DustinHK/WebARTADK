let currentHat = 1;
const hatEntities = {};
const TOTAL_HATS = 8;
let infoPanelVisible = false;
let uiVisible = true;
let _pendingPhotoUrl = null;

/* ── Build hat selector buttons ── */
function buildHatSelector() {
    const sel = document.getElementById('hat-selector');
    TOPI_DATA.forEach((topi, i) => {
        const btn = document.createElement('div');
        btn.className = 'hat-btn' + (i === 0 ? ' active' : '');
        btn.id = `hat-btn-${topi.id}`;
        btn.onclick = () => selectHat(topi.id, btn);

        const img = document.createElement('img');
        img.src = topi.gambar;
        img.alt = topi.nama;
        img.onerror = () => {
            img.style.display = 'none';
            const em = document.createElement('span');
            em.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="M4 20c0-4 2-8 8-10 6 2 8 6 8 10"/></svg>`;
            em.style.fontSize = '1.5rem';
            btn.insertBefore(em, btn.firstChild);
        };

        const label = document.createElement('span');
        label.textContent = topi.nama;

        btn.appendChild(img);
        btn.appendChild(label);
        sel.appendChild(btn);
    });
}

/* ── Boot ── */
window.addEventListener('load', () => {
    buildHatSelector();
    startAR();
});

function startAR() {
    document.getElementById('ar-container').classList.add('active');
    document.getElementById('hud').classList.add('active');

    const scene = document.getElementById('ar-scene');

    scene.addEventListener('arReady', () => {


        document.getElementById('loading-overlay').classList.add('hidden');
        showToast('AR siap! Arahkan wajah ke kamera 😊');
        // Cache entities
        for (let n = 1; n <= TOTAL_HATS; n++) {
            hatEntities[n] = document.getElementById(`hat${n}`);
        }
        
        // Activate models
        for (let n = 1; n <= TOTAL_HATS; n++) {
            const modelEl = document.getElementById(`hat${n}-model`);
            const placeholder = document.getElementById(`hat${n}-placeholder`);
            if (!modelEl) continue;

            const activate = () => {
                modelEl.setAttribute('visible', true);
                if (placeholder) placeholder.setAttribute('visible', false);
                const obj = modelEl.getObject3D('mesh');
                if (obj) obj.traverse(node => { if (node.isMesh) node.renderOrder = 1; });
            };

            if (modelEl.getObject3D && modelEl.getObject3D('mesh')) activate();
            else modelEl.addEventListener('model-loaded', activate, { once: true });
        }

        // Show info panel & update
        document.getElementById('info-panel').classList.add('visible');
        infoPanelVisible = true;
        updateInfoPanel(1);
        // Tampilkan warning saat AR ready (belum ada wajah)
        const statusEl = document.getElementById('face-status');
        if (statusEl) statusEl.classList.remove('face-status-hidden');
    }, { once: true });

    scene.addEventListener('arError', () => {
        document.getElementById('loading-overlay').classList.add('hidden');
        showToast('⚠️ Gagal memuat AR. Coba reload halaman.');
    }, { once: true });

    scene.addEventListener('loaded', () => {
        // Load occluder
        const occluderAnchor = document.getElementById('occluder-anchor');
        if (occluderAnchor) {
            const loader = new THREE.GLTFLoader();
            loader.load('/assets/models/headOccluder.glb', (gltf) => {
                const model = gltf.scene;
                model.position.set(0, 0, 0.04);
                model.scale.set(0.054, 0.054, 0.054);
                model.renderOrder = -1;
                model.traverse(node => {
                    if (node.isMesh) {
                        node.material = new THREE.MeshBasicMaterial({
                            colorWrite: false, depthWrite: true, side: THREE.FrontSide
                        });
                        node.renderOrder = -1;
                    }
                });
                occluderAnchor.object3D.add(model);
            }, undefined, () => console.warn('headOccluder.glb tidak ditemukan'));
        }
    }, { once: true });

    // autoStart: true di a-scene — MindAR mulai otomatis, tidak perlu manual start
    // Fallback: sembunyikan loading jika arReady tidak fired dalam 25 detik
    setTimeout(() => {
        const overlay = document.getElementById('loading-overlay');
        if (overlay && !overlay.classList.contains('hidden')) {
            overlay.classList.add('hidden');
            showToast('⚠️ AR timeout. Pastikan kamera diizinkan & coba reload.');
        }
    }, 25000);
}

function stopAR() {
    const scene = document.getElementById('ar-scene');
    try { scene.systems['mindar-face-system'].stop(); } catch (e) { }
    window.location.href = 'index.html';
}

/* ── Hat Selection ── */
function selectHat(num, btn) {
    for (let i = 1; i <= TOTAL_HATS; i++) {
        if (hatEntities[i]) hatEntities[i].setAttribute('visible', false);
    }
    currentHat = num;
    if (hatEntities[num]) hatEntities[num].setAttribute('visible', true);

    document.querySelectorAll('.hat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateInfoPanel(num);

}

/* ── Info Panel ── */
function updateInfoPanel(num) {
    const topi = TOPI_DATA[num - 1];
    if (!topi) return;
    document.getElementById('ip-name').textContent = topi.nama;
    document.getElementById('ip-user').textContent = topi.pengguna;
    document.getElementById('ip-fungsi').textContent = topi.fungsi;
    document.getElementById('ip-link').href = `detail-topi.html?id=${topi.id}`;
}

function toggleInfoPanel() {
  const panel = document.getElementById('info-panel');
  infoPanelVisible = !infoPanelVisible;
  panel.classList.toggle('visible', infoPanelVisible);

  // Ganti ikon tombol Info
  const btn = document.querySelector('button[onclick="toggleInfoPanel()"]');
  btn.innerHTML = infoPanelVisible
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
       </svg><span>Info</span>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
        <line x1="2" y1="2" x2="22" y2="22"/>
       </svg><span>Info</span>`;
}
function resetAR() {
  const scene = document.getElementById('ar-scene');
  try {
    scene.systems['mindar-face-system'].stop();
    setTimeout(() => {
      scene.systems['mindar-face-system'].start();
      showToast('AR di-refresh 🔄');
    }, 500);
  } catch(e) {
    showToast('Gagal refresh, coba reload halaman.');
  }
}


function toggleUI() {
  uiVisible = !uiVisible;
  const elements = [
    document.querySelector('.hud-bottom'),
    document.querySelector('button[onclick="stopAR()"]'),
    document.querySelector('button[onclick="toggleInfoPanel()"]'),
    document.getElementById('info-panel'),
  ];
  elements.forEach(el => {
    if (!el) return;
    el.style.opacity = uiVisible ? '1' : '0';
    el.style.pointerEvents = uiVisible ? 'auto' : 'none';
  });

  // Ganti ikon mata
  const btn = document.querySelector('button[onclick="toggleUI()"]');
  btn.innerHTML = uiVisible
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="2" y1="2" x2="22" y2="22"/>`;
}

/* ── Screenshot ── */

function takeScreenshot() {
    // Flash animation
    const flash = document.getElementById('flash-overlay');
    flash.classList.add('flash');
    setTimeout(() => flash.classList.remove('flash'), 150);

    showToast('Mengambil foto…');

    setTimeout(() => {
        try {
            const arCanvas = document.querySelector('canvas');
            if (!arCanvas) { showToast('Canvas tidak ditemukan'); return; }

            const w = arCanvas.width;
            const h = arCanvas.height;
            const combined = document.createElement('canvas');
            combined.width = w;
            combined.height = h;
            const ctx = combined.getContext('2d');

            const video = document.querySelector('video');
            if (video && video.readyState >= 2) {
                ctx.save();
                ctx.translate(w, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(video, 0, 0, w, h);
                ctx.restore();
            }

            ctx.drawImage(arCanvas, 0, 0, w, h);

            _pendingPhotoUrl = combined.toDataURL('image/png');
            document.getElementById('preview-img').src = _pendingPhotoUrl;
            document.getElementById('preview-modal').classList.add('visible');
        } catch (e) {
            showToast('Gagal: ' + e.message);
            console.error(e);
        }
    }, 300);
}

function savePhoto() {
    if (!_pendingPhotoUrl) return;
    const link = document.createElement('a');
    link.download = `topi-dayak-${Date.now()}.png`;
    link.href = _pendingPhotoUrl;
    link.click();
    closePreview();
    showToast('📸 Foto tersimpan!');
}

function closePreview() {
    document.getElementById('preview-modal').classList.remove('visible');
    _pendingPhotoUrl = null;
}

/* ── Toast ── */
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
}

