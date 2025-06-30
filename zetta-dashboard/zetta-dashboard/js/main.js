// main.js - Recebimentos + Anomalias (index.html)
const THRESHOLD = 500;
const tableBody = document.querySelector('#dataTable tbody');
const feedEl    = document.getElementById('feed');
const banner    = document.getElementById('alertBanner');

if ('Notification' in window && Notification.permission!=='granted') {
  Notification.requestPermission();
}

function addRecord(rec) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${rec.id}</td>
    <td>${rec.origem}</td>
    <td>${rec.date}</td>
    <td>${rec.location}</td>
    <td>${parseFloat(rec.amount).toLocaleString('pt-BR',{minimumFractionDigits:2})}</td>
    <td>${rec.method}</td>`;
  tableBody.prepend(tr);
  if (tableBody.children.length>20) tableBody.removeChild(tableBody.lastChild);

  const li = document.createElement('li');
  li.textContent = `${rec.date} | ${rec.location} → R$ ${rec.amount}`;
  feedEl.prepend(li);
  if (feedEl.children.length>20) feedEl.removeChild(feedEl.lastChild);
}

function alertAnomaly(amount) {
  const msg = `⚠️ Transação alta: R$ ${parseFloat(amount).toLocaleString('pt-BR',{minimumFractionDigits:2})}`;
  banner.textContent = msg;
  banner.style.display = 'block';
  setTimeout(()=> banner.style.display='none', 5000);
  if (Notification.permission==='granted') {
    new Notification('Alerta de Anomalia', { body: msg, icon:'assets/logo.png' });
  }
}

let counter = 1;
setInterval(()=>{
  const origem = Math.random()<0.5? 'ZettaMarket':'ZettaPayments';
  const rec = {
    id: counter++,
    origem,
    date: randomDate(new Date(2025,0,1), new Date()),
    location: origem==='ZettaMarket'
      ? `Loja ${Math.ceil(Math.random()*50)}`
      : `Filial ${Math.ceil(Math.random()*70)}`,
    amount: randomAmount(1200),
    method: paymentMethods[Math.floor(Math.random()*paymentMethods.length)]
  };
  addRecord(rec);
  if (parseFloat(rec.amount)>THRESHOLD) alertAnomaly(rec.amount);
}, 3000);
