
async function preloadAssets() {
    const splashText = document.getElementById('splash-text');
    const progressFill = document.querySelector('.progress-fill');

    if (typeof TOPI_DATA === 'undefined') { finishSplash(); return; }

    const images = ['./assets/images/ui/logo.png'];
    TOPI_DATA.forEach(topi => {
        if (topi.gambar) images.push(topi.gambar);
        if (topi.gambarDetail) images.push(topi.gambarDetail);
    });

    const modelFiles = ['headOccluder.glb'];
    TOPI_DATA.forEach((_, i) => modelFiles.push(`hat${i + 1}.glb`));

    const total = images.length + modelFiles.length;
    let loaded = 0;

    const update = (name) => {
        loaded++;
        const pct = Math.round((loaded / total) * 100);
        progressFill.style.width = pct + '%';
        splashText.textContent = `Memuat ${name}… ${pct}%`;
    };

    // Load gambar
    await Promise.all(images.map(url => new Promise(res => {
        const img = new Image();
        img.onload = img.onerror = () => { update(url.split('/').pop()); res(); };
        img.src = url;
    })));

    // Load GLB via A-Frame assets
    await Promise.all(modelFiles.map(file => new Promise(res => {
        fetch(`./assets/models/${file}`)
            .then(r => r.arrayBuffer())
            .then(() => { update(file); res(); })
            .catch(() => { update(file); res(); });
    })));

    splashText.textContent = 'Siap! ✓';
    setTimeout(finishSplash, 400);
}

function finishSplash() {
    document.getElementById('splash').classList.add('fade-out');
    setTimeout(() => {
        document.getElementById('splash').style.display = 'none';
        document.getElementById('main').classList.add('visible');
        buildThumbs();
    }, 800);
}

document.addEventListener('DOMContentLoaded', preloadAssets);

function buildThumbs() {
    const wrap = document.getElementById('hero-thumbs');
    if (typeof TOPI_DATA === 'undefined') return;
    TOPI_DATA.forEach(topi => {
        const div = document.createElement('div');
        div.className = 'thumb-item';
        div.title = topi.nama;
        div.onclick = () => window.location.href = `detail-topi.html?id=${topi.id}`;
        const img = document.createElement('img');
        img.src = topi.gambar;
        img.alt = topi.nama;
        img.onerror = () => {
            img.remove();
            const fb = document.createElement('div');
            fb.className = 'thumb-fallback';
            fb.textContent = '🎩';
            div.appendChild(fb);
        };
        div.appendChild(img);
        wrap.appendChild(div);
    });
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
}
