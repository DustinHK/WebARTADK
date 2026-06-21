const id   = parseInt(new URLSearchParams(window.location.search).get('id')) || 1;
  const topi = getTopiById(id);

  if (!topi) {
    document.getElementById('left-nama').textContent = 'Topi tidak ditemukan';
  } else {
    document.title = `${topi.nama} — Dayak Kenyah`;
    document.getElementById('left-nama').textContent = topi.nama;

    // Image
    const placeholder = document.getElementById('img-placeholder');
    const img = document.createElement('img');
    img.alt = topi.nama;
    img.src = topi.gambarDetail;
    img.onerror = function() { /* placeholder tetap */ };
    img.onload  = function() { placeholder.replaceWith(img); };

   
   

    // Info rows dalam satu card
    const rows = [
      { label: 'Bahan',    value: topi.bahan    },
      { label: 'Pengguna', value: topi.pengguna },
      { label: 'Kegunaan', value: topi.fungsi   },
    ];
    document.getElementById('info-card-main').innerHTML = rows.map(r => `
      <div class="info-card-row">
        <div class="info-card-label">${r.label}</div>
        <div class="info-card-value">${r.value}</div>
      </div>
    `).join('');

    // Makna
    if (topi.makna) {
      document.getElementById('makna-text').textContent = topi.makna;
      document.getElementById('makna-wrap').style.display = '';
    }

    // Prev / Next
    const navWrap  = document.getElementById('nav-prev-next');
    const prevTopi = TOPI_DATA.find(t => t.id === id - 1);
    const nextTopi = TOPI_DATA.find(t => t.id === id + 1);

    navWrap.innerHTML = `
      ${prevTopi
        ? `<a class="nav-card prev" href="detail-topi.html?id=${prevTopi.id}">
             <span class="nav-card-dir">← Sebelumnya</span>
             <span class="nav-card-name">${prevTopi.nama}</span>
           </a>`
        : '<div></div>'}
      ${nextTopi
        ? `<a class="nav-card next" href="detail-topi.html?id=${nextTopi.id}">
             <span class="nav-card-dir">Selanjutnya →</span>
             <span class="nav-card-name">${nextTopi.nama}</span>
           </a>`
        : '<div></div>'}
    `;
  }