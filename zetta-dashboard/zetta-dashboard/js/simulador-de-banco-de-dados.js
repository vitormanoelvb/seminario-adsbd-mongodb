// 1) Navegação interna por abas
document.querySelectorAll('.section-nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.section-nav a').forEach(a => a.classList.remove('active'));
    document.querySelectorAll('main section').forEach(s => s.classList.remove('active'));
    link.classList.add('active');
    document.getElementById(link.getAttribute('href').slice(1)).classList.add('active');
  });
});

// 2) Tooltips Tippy.js
tippy('[data-tippy-content]');

// 3) Dark Mode Toggle
document.getElementById('toggle-theme').addEventListener('click', () =>
  document.body.classList.toggle('dark-mode')
);

// 4) Busca global
const sections = document.querySelectorAll('main section');
document.getElementById('global-search').addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  if (!term) return;
  for (const s of sections) {
    if (s.querySelector('h2')?.textContent.toLowerCase().includes(term)) {
      document.querySelectorAll('.section-nav a').forEach(a => a.classList.remove('active'));
      sections.forEach(x => x.classList.remove('active'));
      const link = document.querySelector(`.section-nav a[href="#${s.id}"]`);
      link.classList.add('active');
      s.classList.add('active');
      s.scrollIntoView({ behavior: 'smooth' });
      break;
    }
  }
});

// 5) Filtros Aba 2 (se houver .theme-filter)
document.querySelectorAll('.theme-filter').forEach(cb => {
  cb.addEventListener('change', () => {
    document.querySelectorAll(`.theme-block.${cb.dataset.target}`)
      .forEach(el => el.style.display = cb.checked ? 'block' : 'none');
  });
});

// 6) Ordenação Aba 3 (#cross-table)
document.querySelectorAll('#cross-table th').forEach((th, i) => {
  th.addEventListener('click', () => {
    const table = th.closest('table');
    const rows = Array.from(table.tBodies[0].rows);
    const asc  = !th.asc;
    rows.sort((a, b) => {
      const A = a.cells[i].textContent.trim(), B = b.cells[i].textContent.trim();
      return isNaN(A)
        ? (asc ? A.localeCompare(B) : B.localeCompare(A))
        : (asc ? A - B : B - A);
    });
    th.asc = asc;
    rows.forEach(r => table.tBodies[0].appendChild(r));
  });
});

// 7) Expand IA log (Aba 3)
document.querySelectorAll('.expand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tr = document.getElementById(btn.dataset.target);
    tr.style.display = (tr.style.display === 'none' ? 'table-row' : 'none');
  });
});

// 8) Recalcular scores Aba 7
const weights = document.querySelectorAll('.weight');
weights.forEach(w => {
  w.addEventListener('input', () =>
    document.getElementById(`w-${w.dataset.target}`).textContent = w.value + '%'
  );
});
document.getElementById('recalc-scores')?.addEventListener('click', () => {
  const w = {};
  weights.forEach(i => w[i.dataset.target] = +i.value / 100);
  document.querySelectorAll('#score-table tbody tr').forEach(tr => {
    let total = 0;
    ['Loja','IA','Pagamento','ChatRT'].forEach(k => {
      total += (+tr.querySelector(`.s-${k}`).textContent) * w[k];
    });
    tr.querySelector('.s-Total').textContent = total.toFixed(1);
  });
});

// 9) Export CSV
document.getElementById('export-csv')?.addEventListener('click', () => {
  let csv = '', rows = document.querySelectorAll('#score-table tr');
  rows.forEach(r => {
    csv += Array.from(r.querySelectorAll('td,th'))
      .map(c => `"${c.textContent.trim()}"`).join(',') + '\n';
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'scoreboard.csv';
  a.click();
  URL.revokeObjectURL(url);
});

// 10) Export PDF
document.getElementById('export-pdf')?.addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Scoreboard de Bancos de Dados", 10, 10);
  doc.autoTable({ html: '#score-table', startY: 20 });
  doc.save('scoreboard.pdf');
});

// 11) Deep-link via hash
if (location.hash) {
  const link = document.querySelector(`.section-nav a[href="${location.hash}"]`);
  link?.click();
}
