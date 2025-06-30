// index.js – toda a lógica de data, valores e transações concentrada aqui
document.addEventListener('DOMContentLoaded', () => {
  // Helpers
  function randomDate(start, end) {
    const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return d.toISOString().split('T')[0];
  }
  function randomAmount() {
    return (Math.random() * (500 - 10) + 10).toFixed(2);
  }
  const paymentMethods = ['Dinheiro', 'Cartão', 'PIX', 'Vale'];

  // Fake login – esconde o modal
  const btnLogin   = document.getElementById('btnLoginIndex');
  const loginModal = document.getElementById('loginModal');
  btnLogin.addEventListener('click', () => {
    loginModal.style.setProperty('display', 'none', 'important');
  });

  // Sidebar toggle
  const sidebar = document.getElementById('sidebar');
  document.getElementById('toggleSidebar').onclick = () => {
    sidebar.classList.toggle('open');
    document.body.style.marginLeft = sidebar.classList.contains('open') ? '220px' : '0';
  };

  // KPI vars
  let txCount          = 0,
      txSum            = 0,
      anomCount        = 0,
      sumPhysical      = 0,
      sumEcommerce     = 0,
      sumZettaMarket   = 0,
      sumZettaPayments = 0;
  const THRESHOLD = 300;

  // Elements
  const txCountEl   = document.getElementById('txCount');
  const txSumEl     = document.getElementById('txSum');
  const txTimeEl    = document.getElementById('txTime');
  const anomEl      = document.getElementById('kpiAnom');
  const pctEl       = document.getElementById('kpiPctAnom');
  const physicalEl  = document.getElementById('txSumPhysical');
  const ecommerceEl = document.getElementById('txSumEcommerce');
  const zmEl        = document.getElementById('sumZettaMarket');
  const zpEl        = document.getElementById('sumZettaPayments');
  const feedEl      = document.getElementById('feed');
  const tableBody   = document.querySelector('#dataTable tbody');

  // Nova transação
  function newTransaction() {
    const isMarket = Math.random() < 0.5;
    const rec = {
      id: ++txCount,
      origem: isMarket ? 'ZettaMarket' : 'ZettaPayments',
      date: randomDate(new Date(2025,0,1), new Date()),
      location: isMarket
        ? `Loja ${Math.ceil(Math.random()*50)}`
        : `Parceiro ${Math.ceil(Math.random()*70)}`,
      amount: randomAmount(),
      method: paymentMethods[Math.floor(Math.random()*paymentMethods.length)]
    };

    // Atualiza somas gerais
    txSum += parseFloat(rec.amount);
    txSumEl.textContent = txSum.toLocaleString('pt-BR',{minimumFractionDigits:2});
    txCountEl.textContent = txCount;
    txTimeEl.textContent  = new Date().toLocaleTimeString();

    // Soma por categoria
    if (rec.location.startsWith('Loja')) {
      sumPhysical += parseFloat(rec.amount);
      physicalEl.textContent = sumPhysical.toLocaleString('pt-BR',{minimumFractionDigits:2});
    } else {
      sumEcommerce += parseFloat(rec.amount);
      ecommerceEl.textContent = sumEcommerce.toLocaleString('pt-BR',{minimumFractionDigits:2});
    }
    if (rec.origem === 'ZettaMarket') {
      sumZettaMarket += parseFloat(rec.amount);
      zmEl.textContent = sumZettaMarket.toLocaleString('pt-BR',{minimumFractionDigits:2});
    } else {
      sumZettaPayments += parseFloat(rec.amount);
      zpEl.textContent = sumZettaPayments.toLocaleString('pt-BR',{minimumFractionDigits:2});
    }

    // Anomalias
    const isAnom = parseFloat(rec.amount) > THRESHOLD;
    if (isAnom) {
      anomCount++;
      anomEl.textContent = anomCount;
      anomEl.classList.add('pulse');
      setTimeout(() => anomEl.classList.remove('pulse'), 500);
    }
    pctEl.textContent = ((anomCount/txCount)*100).toFixed(1) + '%';

    // Preenche tabela
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${rec.id}</td>
      <td>${rec.origem}</td>
      <td>${rec.date}</td>
      <td>${rec.location}</td>
      <td>R$ ${rec.amount}</td>
      <td>${rec.method}</td>
      <td>${
        isAnom
          ? '<span class="status-pending" title="⚠️"></span>'
          : '<span class="status-ok" title="✔️"></span>'
      }</td>`;
    tableBody.prepend(tr);
    if (tableBody.children.length > 20) {
      tableBody.removeChild(tableBody.lastChild);
    }

    // Feed
    const li = document.createElement('li');
    li.textContent = `[${new Date().toLocaleTimeString()}] ${rec.origem} → R$ ${rec.amount}`;
    feedEl.prepend(li);
    if (feedEl.children.length > 10) {
      feedEl.removeChild(feedEl.lastChild);
    }
  }

  // Popula inicial e agenda
  for (let i = 0; i < 5; i++) newTransaction();
  setInterval(newTransaction, 3000);
});
