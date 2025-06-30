// zettaMarket.js – lógica dinâmica para ZettaMarket.html

document.addEventListener('DOMContentLoaded', () => {
  // Regiões e cidades
  const regions = {
    'Minas Gerais': ['Belo Horizonte','Governador Valadares','Uberlândia'],
    'Espírito Santo': ['Vitória','ZettaPraia','ZettaCentro']
  };
  const selRegion = document.getElementById('regionSelect');
  Object.keys(regions).forEach(r => {
    const opt = document.createElement('option');
    opt.value = r;
    opt.textContent = r;
    selRegion.appendChild(opt);
  });

  // Elementos KPI
  const kpiSales      = document.getElementById('kpiSales');
  const kpiLossPct    = document.getElementById('kpiLossPct');
  const kpiProfitPct  = document.getElementById('kpiProfitPct');
  const kpiEmployees  = document.getElementById('kpiEmployees');
  const kpiClosed     = document.getElementById('kpiClosed');
  const kpiPaymentSum = document.getElementById('kpiPaymentSum');

  // Tabela de setores
  const sectorTbody = document.querySelector('#sectorTable tbody');
  const sectors     = ['Mercearia','Bebidas','Higiene','Limpeza','Eletrônicos'];

  // Listas de sugestões e alertas
  const offerList  = document.getElementById('offerList');
  const expiryList = document.getElementById('expiryList');

  // Botões de relatório
  document.getElementById('btnPrint').onclick = () => window.print();
  document.getElementById('btnExport').onclick = () =>
    alert('Exportando relatório CSV...');

  function updateDashboard() {
    const region = selRegion.value;
    const cities = regions[region] || [];

    // Vendas totais
    const totalSales = Math.floor(Math.random() * 100000 + 50000);
    kpiSales.textContent = `R$ ${totalSales.toLocaleString('pt-BR')}`;

    // Perdas ≤2% e lucros ≥45%
    const lossPct   = (Math.random() * 2).toFixed(1);
    const profitPct = (Math.random() * 15 + 45).toFixed(1);
    kpiLossPct.textContent   = lossPct + '%';
    kpiProfitPct.textContent = profitPct + '%';

    // Funcionários e lojas fechadas
    const employees = Math.floor(Math.random() * 2000 + 500);
    const closed    = Math.floor(Math.random() * 2);
    kpiEmployees.textContent = employees;
    kpiClosed.textContent    = closed;

    // Pagamentos por tipo
    const cash   = Math.floor(Math.random() * totalSales * 0.3);
    const pix    = Math.floor(Math.random() * totalSales * 0.3);
    const debit  = Math.floor(Math.random() * totalSales * 0.2);
    const credit = totalSales - (cash + pix + debit);
    kpiPaymentSum.innerHTML = `
      💵 R$ ${cash.toLocaleString('pt-BR')} |
      PIX ${pix.toLocaleString('pt-BR')}<br/>
      🏧 R$ ${debit.toLocaleString('pt-BR')} |
      💳 R$ ${credit.toLocaleString('pt-BR')}
    `;

    // Preencha tabela de setores
    sectorTbody.innerHTML = '';
    sectors.forEach(sec => {
      const stock  = Math.floor(Math.random() * 500 + 100);
      const losses = Math.floor(stock * (Math.random() * 0.02));
      const pct    = ((losses / stock) * 100).toFixed(1);
      const tr     = document.createElement('tr');
      tr.innerHTML = `
        <td>${sec}</td>
        <td>${stock}</td>
        <td>${losses}</td>
        <td>${pct}%</td>
      `;
      sectorTbody.appendChild(tr);
    });

    // Ofertas agressivas (5 de 8)
    const aggressiveIdeas = [
      '🔥 Mega 70% OFF em Mercearia',
      '🥤 Bebidas: 10 por preço de 5',
      '🧼 Higiene Premium: 5 itens por R$49',
      '⚡ Eletrônicos Relâmpago: 50% OFF',
      '🧹 Kit Limpeza Turbo: R$29',
      '🍪 Snacks 2x1 no corredor',
      '🥫 Enlatados: 4x R$10',
      '🍫 Doces Flash Sale –60% até meia-noite'
    ];
    offerList.innerHTML = '';
    aggressiveIdeas
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)
      .forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        offerList.appendChild(li);
      });

    // Alertas de validade para mercearia
    expiryList.innerHTML = '';
    const prods = ['Arroz','Feijão','Leite'];
    for (let i = 0; i < 3; i++) {
      const product = prods[i];
      const city    = cities[Math.floor(Math.random() * cities.length)] || '—';
      const days    = Math.ceil(Math.random() * 5);
      const li      = document.createElement('li');
      li.innerHTML  = `<span class="blink">⚠️ ${product}: ${days}d</span> <small>${city}</small>`;
      expiryList.appendChild(li);
    }
  }

  selRegion.onchange = updateDashboard;
  updateDashboard();
  setInterval(updateDashboard, 8000);
});
