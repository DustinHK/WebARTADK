
function buildGrid() {
    const grid = document.getElementById('topi-grid');
    grid.innerHTML = '';

    TOPI_DATA.forEach(topi => {
        const a = document.createElement('a');
        a.className = 'topi-card';
        a.href = `detail-topi.html?id=${topi.id}`;

        const badgeClass = topi.kategori === 'Tapung' ? 'badge-tapung' : 'badge-bluko';

        a.innerHTML = `
        <div class="topi-card-img-wrap">
          <img class="topi-card-img" src="${topi.gambar}" alt="${topi.nama}"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div class="img-placeholder" style="display:none">
            <span class="img-placeholder-icon">🎩</span>
            <span class="img-placeholder-text">Tambahkan gambar</span>
          </div>
  
        </div>
        <div class="topi-card-body">
          <div class="topi-card-name">${topi.nama}</div>
          <div class="topi-card-user">👤 ${topi.pengguna.split('(')[0].trim()}</div>
        </div>
        <span class="topi-card-arrow">→</span>
      `;

        grid.appendChild(a);
    });
}

buildGrid();