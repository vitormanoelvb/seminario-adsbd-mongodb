// bi.js – gera KPIs e mini-gráficos sem canvas
document.addEventListener('DOMContentLoaded', () => {
  const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);

  // inicializa barras: cria 5 div.bar em cada container
  function initBars(id) {
    const container = document.getElementById(id);
    container.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const b = document.createElement('div');
      b.className = 'bar';
      container.appendChild(b);
    }
  }
  ['chartSales','chartPays','chartRH','chartFin','chartFis']
    .forEach(initBars);

  // atualiza altura das barras dinamicamente
  function updateBars(id, minH=10, maxH=80) {
    const bars = document.getElementById(id).children;
    for (let b of bars) {
      const h = rand(minH, maxH);
      b.style.height = h + 'px';
    }
  }

  // Atualiza todos os mini-charts
  function tickCharts() {
    updateBars('chartSales');
    updateBars('chartPays');
    updateBars('chartRH');
    updateBars('chartFin');
    updateBars('chartFis');
  }

  // Atualiza KPIs
  function tickKPIs() {
    // consolidados
    document.getElementById('kpiSales').textContent = rand(100, 300);
    document.getElementById('kpiPayments').textContent = rand(150, 450);
    document.getElementById('kpiOps').textContent = rand(80, 200);
    document.getElementById('kpiFraud').textContent = rand(5, 25);
    // RH
    document.getElementById('kpiRHActive').textContent = rand(50, 200);
    document.getElementById('kpiRHAus').textContent = rand(0, 30);
    document.getElementById('kpiRHNew').textContent = rand(1, 15);
    // Financeiro
    document.getElementById('kpiFinRev').textContent = rand(200000, 800000);
    document.getElementById('kpiFinExp').textContent = rand(100000, 600000);
    document.getElementById('kpiFinProfit').textContent =
      document.getElementById('kpiFinRev').textContent - document.getElementById('kpiFinExp').textContent;
    // Fiscal
    document.getElementById('kpiFisDue').textContent = rand(50000, 200000);
    document.getElementById('kpiFisPaid').textContent = rand(20000, 150000);
    document.getElementById('kpiFisFines').textContent = rand(0, 10000);
  }

  // Executa imediatamente e a cada 5s
  function tickAll() {
    tickKPIs();
    tickCharts();
  }
  tickAll();
  setInterval(tickAll, 5000);
});
