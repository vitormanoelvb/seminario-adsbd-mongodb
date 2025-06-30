// zettaPayments.js – lógica dinâmica para ZettaPayments.html

document.addEventListener('DOMContentLoaded', () => {
  // Filiais e PDVs
  const branches = ['Zetta Norte','Zetta Sul','Zetta Leste','Zetta Oeste','Zetta Centro'];
  const sel = document.getElementById('branchSelect');
  branches.forEach(b => {
    const opt = document.createElement('option');
    opt.value = b; opt.textContent = b;
    sel.appendChild(opt);
  });

  // KPI elements
  const totalEl    = document.getElementById('totalTx');
  const okEl       = document.getElementById('okTx');
  const pendEl     = document.getElementById('pendingTx');
  const denEl      = document.getElementById('deniedTx');
  const lastEl     = document.getElementById('lastStatus');
  const fraudEl    = document.getElementById('fraudAlert');
  const feed       = document.getElementById('paymentsFeed');
  const aiList     = document.getElementById('aiSuggestions');
  const pdvActive  = document.getElementById('pdvActive');
  const pdvOff     = document.getElementById('pdvOff');
  const schedEl    = document.getElementById('scheduledTx');

  // Counters
  let total=0, ok=0, pend=0, den=0, fraudCount=0;

  // Atualiza PDV status
  function updatePdv() {
    const active = Math.floor(Math.random()*10 + 5);
    const off    = Math.floor(Math.random()*5);
    pdvActive.textContent = active;
    pdvOff.textContent    = off;
  }

  // Gera transação
  function genTx() {
    const branch = sel.value;
    const statuses = ['Aprovado','Pendente','Negado'];
    const status   = statuses[Math.floor(Math.random()*statuses.length)];
    const now      = new Date().toLocaleTimeString();
    total++;
    if(status==='Aprovado') ok++;
    if(status==='Pendente') pend++;
    if(status==='Negado')  den++;
    const isFraud = Math.random()<0.05;
    if(isFraud) fraudCount++;

    // Atualiza KPIs
    totalEl.textContent   = total;
    okEl.innerHTML        = `<span class="status-ok"></span> ${ok}`;
    pendEl.innerHTML      = `<span class="status-pending"></span> ${pend}`;
    denEl.innerHTML       = `<span class="status-denied"></span> ${den}`;
    lastEl.innerHTML      = `${branch}: <span class="status-${status.toLowerCase()}"></span> ${status} às ${now}`;
    fraudEl.textContent   = fraudCount;

    // Alerta de fraude
    if(isFraud) {
      fraudEl.classList.add('blink');
      setTimeout(()=> fraudEl.classList.remove('blink'), 1000);
    }

    // Feed
    const li = document.createElement('li');
    li.textContent = `${branch} → ${status} (${now})`;
    feed.prepend(li);
    if(feed.children.length>10) feed.removeChild(feed.lastChild);

    // Sugestões de AI
    if(Math.random()<0.3){
      const ideas = [
        'Configurar modo offline fallback',
        'Agendar cobrança automática',
        'Alertar reconciliação diária',
        'Monitorar falhas de PDV',
        'Gerar relatório de tentativas'
      ];
      const ai = document.createElement('li');
      ai.textContent = ideas[Math.floor(Math.random()*ideas.length)];
      aiList.prepend(ai);
      if(aiList.children.length>5) aiList.removeChild(aiList.lastChild);
    }

    // Agendadas
    schedEl.textContent = Math.floor(Math.random()*5);
  }

  // Reset counters on branch change
  sel.onchange = () => {
    total=ok=pend=den=fraudCount=0;
    updatePdv();
  };

  // Inicial
  updatePdv();
  genTx();
  setInterval(() => { updatePdv(); genTx(); }, 4000);
});
