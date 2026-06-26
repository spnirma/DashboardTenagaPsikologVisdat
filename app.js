const rawData = [
  {"nama_provinsi":"PAPUA PEGUNUNGAN","puskesmas":0,"rumah_sakit":1,"faskes_lainnya":0},
  {"nama_provinsi":"PAPUA BARAT","puskesmas":0,"rumah_sakit":2,"faskes_lainnya":2},
  {"nama_provinsi":"MALUKU","puskesmas":0,"rumah_sakit":7,"faskes_lainnya":7},
  {"nama_provinsi":"PAPUA SELATAN","puskesmas":0,"rumah_sakit":2,"faskes_lainnya":0},
  {"nama_provinsi":"PAPUA","puskesmas":0,"rumah_sakit":2,"faskes_lainnya":0},
  {"nama_provinsi":"KALIMANTAN UTARA","puskesmas":0,"rumah_sakit":2,"faskes_lainnya":6},
  {"nama_provinsi":"KEPULAUAN BANGKA BELITUNG","puskesmas":0,"rumah_sakit":10,"faskes_lainnya":16},
  {"nama_provinsi":"MALUKU UTARA","puskesmas":0,"rumah_sakit":4,"faskes_lainnya":3},
  {"nama_provinsi":"KEPULAUAN RIAU","puskesmas":0,"rumah_sakit":16,"faskes_lainnya":15},
  {"nama_provinsi":"SULAWESI UTARA","puskesmas":0,"rumah_sakit":13,"faskes_lainnya":6},
  {"nama_provinsi":"GORONTALO","puskesmas":0,"rumah_sakit":2,"faskes_lainnya":5},
  {"nama_provinsi":"BENGKULU","puskesmas":0,"rumah_sakit":11,"faskes_lainnya":10},
  {"nama_provinsi":"JAMBI","puskesmas":0,"rumah_sakit":19,"faskes_lainnya":20},
  {"nama_provinsi":"NUSA TENGGARA TIMUR","puskesmas":0,"rumah_sakit":6,"faskes_lainnya":7},
  {"nama_provinsi":"KALIMANTAN TIMUR","puskesmas":0,"rumah_sakit":22,"faskes_lainnya":41},
  {"nama_provinsi":"KALIMANTAN TENGAH","puskesmas":0,"rumah_sakit":15,"faskes_lainnya":21},
  {"nama_provinsi":"PAPUA BARAT DAYA","puskesmas":1,"rumah_sakit":2,"faskes_lainnya":1},
  {"nama_provinsi":"PAPUA TENGAH","puskesmas":1,"rumah_sakit":2,"faskes_lainnya":1},
  {"nama_provinsi":"SUMATERA BARAT","puskesmas":1,"rumah_sakit":26,"faskes_lainnya":16},
  {"nama_provinsi":"KALIMANTAN SELATAN","puskesmas":1,"rumah_sakit":44,"faskes_lainnya":29},
  {"nama_provinsi":"SULAWESI BARAT","puskesmas":1,"rumah_sakit":2,"faskes_lainnya":3},
  {"nama_provinsi":"BANTEN","puskesmas":1,"rumah_sakit":70,"faskes_lainnya":60},
  {"nama_provinsi":"BALI","puskesmas":1,"rumah_sakit":30,"faskes_lainnya":44},
  {"nama_provinsi":"LAMPUNG","puskesmas":2,"rumah_sakit":13,"faskes_lainnya":17},
  {"nama_provinsi":"NUSA TENGGARA BARAT","puskesmas":2,"rumah_sakit":20,"faskes_lainnya":9},
  {"nama_provinsi":"SULAWESI SELATAN","puskesmas":2,"rumah_sakit":16,"faskes_lainnya":16},
  {"nama_provinsi":"SULAWESI TENGGARA","puskesmas":2,"rumah_sakit":7,"faskes_lainnya":11},
  {"nama_provinsi":"KALIMANTAN BARAT","puskesmas":4,"rumah_sakit":14,"faskes_lainnya":17},
  {"nama_provinsi":"RIAU","puskesmas":4,"rumah_sakit":43,"faskes_lainnya":23},
  {"nama_provinsi":"SUMATERA UTARA","puskesmas":4,"rumah_sakit":32,"faskes_lainnya":25},
  {"nama_provinsi":"JAWA TENGAH","puskesmas":4,"rumah_sakit":182,"faskes_lainnya":125},
  {"nama_provinsi":"JAWA BARAT","puskesmas":4,"rumah_sakit":161,"faskes_lainnya":195},
  {"nama_provinsi":"SULAWESI TENGAH","puskesmas":5,"rumah_sakit":28,"faskes_lainnya":17},
  {"nama_provinsi":"SUMATERA SELATAN","puskesmas":6,"rumah_sakit":38,"faskes_lainnya":19},
  {"nama_provinsi":"ACEH","puskesmas":22,"rumah_sakit":43,"faskes_lainnya":27},
  {"nama_provinsi":"JAWA TIMUR","puskesmas":35,"rumah_sakit":138,"faskes_lainnya":119},
  {"nama_provinsi":"DKI JAKARTA","puskesmas":47,"rumah_sakit":172,"faskes_lainnya":235},
  {"nama_provinsi":"DAERAH ISTIMEWA YOGYAKARTA","puskesmas":59,"rumah_sakit":56,"faskes_lainnya":99}
];

const data = rawData.map(d => ({
  ...d,
  total: d.puskesmas + d.rumah_sakit + d.faskes_lainnya
}));
const grandTotal = data.reduce((s, d) => s + d.total, 0);
const totalRS = data.reduce((s, d) => s + d.rumah_sakit, 0);
const totalPusk = data.reduce((s, d) => s + d.puskesmas, 0);
const totalFaskes = data.reduce((s, d) => s + d.faskes_lainnya, 0);
const sorted = [...data].sort((a, b) => b.total - a.total);
const top10 = sorted.slice(0, 10);

// KPI COUNT-UP
function countUp(el, target, duration = 1200) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target.toLocaleString('id-ID'); clearInterval(timer); }
    else el.textContent = Math.floor(start).toLocaleString('id-ID');
  }, 16);
}

function buildKPI() {
  const kpis = [
    { label: 'Total Psikolog Klinis', value: grandTotal, sub: 'Di seluruh Indonesia' },
    { label: 'Di Rumah Sakit', value: totalRS, sub: `${((totalRS/grandTotal)*100).toFixed(1)}% dari total` },
    { label: 'Di Puskesmas', value: totalPusk, sub: `${((totalPusk/grandTotal)*100).toFixed(1)}% dari total` },
    { label: 'Faskes Lainnya', value: totalFaskes, sub: `${((totalFaskes/grandTotal)*100).toFixed(1)}% dari total` },
    { label: 'Jumlah Provinsi', value: data.length, sub: 'Tercatat dalam dataset' }
  ];
  const row = document.getElementById('kpiRow');
  kpis.forEach(k => {
    const card = document.createElement('div');
    card.className = 'kpi-card';
    card.innerHTML = `<div class="kpi-label">${k.label}</div><div class="kpi-value" data-val="${k.value}">0</div><div class="kpi-sub">${k.sub}</div>`;
    row.appendChild(card);
  });
  document.querySelectorAll('.kpi-value').forEach(el => {
    countUp(el, parseInt(el.dataset.val));
  });
}

// CHART DEFAULTS
Chart.defaults.font.family = "'DM Sans', sans-serif";
Chart.defaults.plugins.legend.labels.padding = 16;
Chart.defaults.plugins.legend.labels.usePointStyle = true;

const GREEN = 'rgba(46,204,113,0.75)';
const YELLOW = 'rgba(244,208,63,0.75)';
const ORANGE = 'rgba(243,156,18,0.75)';
const ORANGE2 = 'rgba(230,126,34,0.75)';

// BAR CHART — top 15 by total, stacked
function buildBar() {
  const top15 = sorted.slice(0, 15);
  const labels = top15.map(d => d.nama_provinsi.replace('DAERAH ISTIMEWA ', 'D.I. '));
  const ctx = document.getElementById('barChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Puskesmas', data: top15.map(d => d.puskesmas), backgroundColor: GREEN, borderRadius: 4 },
        { label: 'Rumah Sakit', data: top15.map(d => d.rumah_sakit), backgroundColor: YELLOW, borderRadius: 4 },
        { label: 'Faskes Lainnya', data: top15.map(d => d.faskes_lainnya), backgroundColor: ORANGE, borderRadius: 4 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { tooltip: { callbacks: { footer: (items) => `Total: ${items.reduce((s,i)=>s+i.parsed.y,0)}` } } },
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { font: { size: 10 } } },
        y: { stacked: true, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { size: 10 } } }
      },
      animation: { duration: 900, easing: 'easeOutQuart' }
    }
  });
  document.getElementById('insightBar').textContent =
    `DKI Jakarta memimpin dengan ${sorted[0].total} psikolog klinis — hampir ${Math.round(sorted[0].total/sorted[1].total)}x lebih banyak dari provinsi kedua (${sorted[1].nama_provinsi.replace('DAERAH ISTIMEWA ', 'D.I. ')}, ${sorted[1].total}).`;
}

// PIE — proporsi fasilitas nasional
function buildPie() {
  const ctx = document.getElementById('pieChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Puskesmas', 'Rumah Sakit', 'Faskes Lainnya'],
      datasets: [{ data: [totalPusk, totalRS, totalFaskes], backgroundColor: [GREEN, YELLOW, ORANGE], borderWidth: 2, borderColor: '#fff', hoverOffset: 10 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.raw} (${((c.raw/grandTotal)*100).toFixed(1)}%)` } },
        legend: { position: 'bottom' }
      },
      animation: { animateRotate: true, duration: 900, easing: 'easeOutQuart' }
    }
  });
  const maxType = totalRS > totalFaskes ? 'Rumah Sakit' : 'Faskes Lainnya';
  document.getElementById('insightPie').textContent =
    `${maxType} mendominasi distribusi nasional dengan ${((totalRS/grandTotal)*100).toFixed(0)}% dari total tenaga. Puskesmas hanya menyumbang ${((totalPusk/grandTotal)*100).toFixed(1)}% — menunjukkan ketimpangan akses di layanan primer.`;
}

// DOUGHNUT — top 10 provinsi
function buildDoughnut() {
  const palette = [
    'rgba(26,122,74,0.8)','rgba(46,204,113,0.8)','rgba(168,240,198,0.8)',
    'rgba(244,208,63,0.8)','rgba(243,156,18,0.8)','rgba(230,126,34,0.8)',
    'rgba(52,152,219,0.7)','rgba(155,89,182,0.7)','rgba(231,76,60,0.7)','rgba(127,140,141,0.7)'
  ];
  const ctx = document.getElementById('doughnutChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: top10.map(d => d.nama_provinsi.replace('DAERAH ISTIMEWA ', 'D.I. ')),
      datasets: [{ data: top10.map(d => d.total), backgroundColor: palette, borderWidth: 2, borderColor: '#fff', hoverOffset: 8 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.raw} (${((c.raw/grandTotal)*100).toFixed(1)}% nasional)` } },
        legend: { position: 'bottom', labels: { font: { size: 10 } } }
      },
      animation: { animateRotate: true, duration: 900, easing: 'easeOutQuart' }
    }
  });
  const top10sum = top10.reduce((s,d)=>s+d.total,0);
  document.getElementById('insightDoughnut').textContent =
    `10 provinsi teratas menguasai ${((top10sum/grandTotal)*100).toFixed(0)}% dari seluruh psikolog klinis nasional. 28 provinsi lainnya berbagi ${(100 - (top10sum/grandTotal)*100).toFixed(0)}% sisanya.`;
}

// LINE — RS vs Faskes Lainnya, semua provinsi diurutkan total
function buildLine() {
  const sorted20 = sorted.slice(0, 20);
  const labels = sorted20.map(d => d.nama_provinsi.replace('DAERAH ISTIMEWA ', 'D.I. '));
  const ctx = document.getElementById('lineChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Rumah Sakit',
          data: sorted20.map(d => d.rumah_sakit),
          borderColor: 'rgba(26,122,74,0.9)',
          backgroundColor: 'rgba(46,204,113,0.12)',
          tension: 0.4, fill: true, pointRadius: 4, pointHoverRadius: 7,
          borderWidth: 2.5
        },
        {
          label: 'Faskes Lainnya',
          data: sorted20.map(d => d.faskes_lainnya),
          borderColor: 'rgba(243,156,18,0.9)',
          backgroundColor: 'rgba(244,208,63,0.1)',
          tension: 0.4, fill: true, pointRadius: 4, pointHoverRadius: 7,
          borderWidth: 2.5
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 9 }, maxRotation: 45 } },
        y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { size: 10 } } }
      },
      animation: { duration: 900, easing: 'easeOutQuart' }
    }
  });
  document.getElementById('insightLine').textContent =
    `Di DKI Jakarta, faskes lainnya (235) justru melampaui rumah sakit (172) — berbeda dengan mayoritas provinsi lain. Ini menunjukkan ekosistem layanan mental yang lebih beragam di ibu kota.`;
}

// TABLE
let currentSort = 'total';
let currentSearch = '';

function renderTable() {
  let rows = data.filter(d => d.nama_provinsi.toLowerCase().includes(currentSearch.toLowerCase()));
  if (currentSort === 'total') rows.sort((a,b) => b.total - a.total);
  else if (currentSort === 'rs') rows.sort((a,b) => b.rumah_sakit - a.rumah_sakit);
  else if (currentSort === 'pusk') rows.sort((a,b) => b.puskesmas - a.puskesmas);
  const maxTotal = Math.max(...data.map(d=>d.total));
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = rows.map(d => {
    const pct = ((d.total / grandTotal) * 100).toFixed(1);
    const barW = ((d.total / maxTotal) * 100).toFixed(1);
    return `<tr data-prov="${d.nama_provinsi}">
      <td class="td-provinsi">${cap(d.nama_provinsi)}</td>
      <td class="td-num">${d.puskesmas}</td>
      <td class="td-num">${d.rumah_sakit}</td>
      <td class="td-num">${d.faskes_lainnya}</td>
      <td class="td-num td-total">${d.total}</td>
      <td><div class="bar-mini"><div class="bar-mini-track"><div class="bar-mini-fill" style="width:${barW}%"></div></div><span class="bar-pct">${pct}%</span></div></td>
    </tr>`;
  }).join('');
  tbody.querySelectorAll('tr').forEach(tr => {
    tr.addEventListener('click', () => showRowModal(tr.dataset.prov));
  });
}

function cap(str) {
  return str.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// MODAL
const modal = document.getElementById('insightModal');
const modalContent = document.getElementById('modalContent');

const chartInsights = {
  'card-bar': {
    title: 'Distribusi per Provinsi — Bar Chart',
    paragraphs: [
      'Grafik ini menampilkan 15 provinsi dengan jumlah psikolog klinis terbanyak secara bertumpuk (stacked), dibagi berdasarkan jenis fasilitas kesehatan.',
      'DKI Jakarta mendominasi dengan jelas, terutama karena tingginya jumlah psikolog di faskes lainnya (klinik swasta, praktik mandiri, dll). Ini mencerminkan konsentrasi layanan kesehatan mental di ibu kota.',
      'Provinsi Jawa Barat dan Jawa Tengah mengikuti, dengan dominasi di rumah sakit. Ketimpangan distribusi sangat terlihat dibanding provinsi luar Jawa.'
    ]
  },
  'card-pie': {
    title: 'Proporsi Nasional — Pie Chart',
    paragraphs: [
      'Pie chart ini menunjukkan komposisi nasional: dari mana saja psikolog klinis bertugas.',
      `Rumah sakit menyerap ${((totalRS/grandTotal)*100).toFixed(0)}% tenaga, menjadikannya tulang punggung layanan psikologi klinis di Indonesia.`,
      `Faskes lainnya (${((totalFaskes/grandTotal)*100).toFixed(0)}%) mencakup klinik, lembaga, dan praktik mandiri. Sementara puskesmas hanya ${((totalPusk/grandTotal)*100).toFixed(1)}% — mengindikasikan bahwa layanan kesehatan mental primer masih sangat terbatas di tingkat komunitas.`
    ]
  },
  'card-doughnut': {
    title: '10 Provinsi Teratas — Doughnut Chart',
    paragraphs: [
      'Doughnut chart ini membandingkan kontribusi masing-masing dari 10 provinsi teratas terhadap total nasional.',
      'Ketidakmerataan sangat mencolok: DKI Jakarta, Jawa Barat, dan Jawa Tengah saja sudah menguasai lebih dari separuh total nasional.',
      'Provinsi-provinsi di kawasan timur Indonesia seperti Papua dan Maluku hampir tidak terlihat dalam chart ini, mencerminkan kesenjangan akses layanan kesehatan mental yang serius.'
    ]
  },
  'card-line': {
    title: 'RS vs Faskes Lainnya — Line Chart',
    paragraphs: [
      'Line chart ini membandingkan dua jalur utama distribusi psikolog klinis: rumah sakit dan fasilitas kesehatan lainnya, untuk 20 provinsi teratas.',
      'Umumnya rumah sakit mendominasi. Namun DKI Jakarta menjadi anomali menarik — faskes lainnya justru lebih tinggi, mencerminkan suburnya layanan swasta di ibu kota.',
      'Tren menurun tajam setelah posisi ke-5 menunjukkan konsentrasi ekstrem di beberapa provinsi saja.'
    ]
  }
};

document.querySelectorAll('.chart-card').forEach(card => {
  const hint = document.createElement('span');
  hint.className = 'click-hint';
  hint.textContent = 'Klik untuk insight';
  card.appendChild(hint);
  card.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-close')) return;
    const id = card.id;
    const info = chartInsights[id];
    if (!info) return;
    modalContent.innerHTML = `<h3>${info.title}</h3>${info.paragraphs.map(p=>`<p>${p}</p>`).join('')}`;
    modal.classList.add('open');
  });
});

function showRowModal(provName) {
  const d = data.find(x => x.nama_provinsi === provName);
  if (!d) return;
  const rank = sorted.findIndex(x => x.nama_provinsi === provName) + 1;
  const pct = ((d.total / grandTotal) * 100).toFixed(2);
  const dominant = d.rumah_sakit >= d.faskes_lainnya && d.rumah_sakit >= d.puskesmas ? 'Rumah Sakit' : d.faskes_lainnya >= d.puskesmas ? 'Faskes Lainnya' : 'Puskesmas';
  modalContent.innerHTML = `
    <h3>${cap(provName)}</h3>
    <p>Peringkat ke-<strong>${rank}</strong> dari ${data.length} provinsi secara nasional, menyumbang <strong>${pct}%</strong> dari total psikolog klinis Indonesia.</p>
    <div class="modal-stat-row">
      <div class="modal-stat"><div class="modal-stat-val">${d.puskesmas}</div><div class="modal-stat-lbl">Puskesmas</div></div>
      <div class="modal-stat"><div class="modal-stat-val">${d.rumah_sakit}</div><div class="modal-stat-lbl">Rumah Sakit</div></div>
      <div class="modal-stat"><div class="modal-stat-val">${d.faskes_lainnya}</div><div class="modal-stat-lbl">Faskes Lainnya</div></div>
      <div class="modal-stat"><div class="modal-stat-val">${d.total}</div><div class="modal-stat-lbl">Total</div></div>
    </div>
    <p>Fasilitas dominan: <strong>${dominant}</strong>. ${d.puskesmas === 0 ? 'Tidak ada psikolog klinis yang bertugas di puskesmas di provinsi ini — akses layanan primer sangat terbatas.' : `Ada ${d.puskesmas} psikolog di puskesmas, yang relatif baik untuk layanan primer.`}</p>
  `;
  modal.classList.add('open');
}

document.getElementById('modalClose').addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });

document.getElementById('searchInput').addEventListener('input', (e) => {
  currentSearch = e.target.value;
  renderTable();
});
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSort = btn.dataset.sort;
    renderTable();
  });
});

// Efek ripple air saat klik
document.querySelectorAll('.card').forEach(card => {
  card.style.position = 'relative';
  card.style.overflow = 'hidden';

  card.addEventListener('click', function(e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.35);
      pointer-events: none;
      animation: rippleWave 0.7s ease-out forwards;
    `;

    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// INIT
buildKPI();
buildBar();
buildPie();
buildDoughnut();
buildLine();
renderTable();


