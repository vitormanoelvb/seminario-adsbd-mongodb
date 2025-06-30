// utilitário para inteiros aleatórios
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// gera feed fake de tickets
function gerarFeedFake(count = 15) {
  const canais   = ['Chat','Telefone','E-mail'];
  const assuntos = [
    'Cobrança incorreta','Erro no checkout','Sugestão de UI',
    'Reclamação de produto','Solicitação de estorno','Confirmação de entrega',
    'Feedback positivo','Dúvida técnica'
  ];
  const now = Date.now();
  return Array.from({length: count}, () => {
    const d  = new Date(now - randInt(0,3600*1000));
    const hh = String(d.getHours()).padStart(2,'0');
    const mm = String(d.getMinutes()).padStart(2,'0');
    const ss = String(d.getSeconds()).padStart(2,'0');
    return `[${hh}:${mm}:${ss}] ${canais[randInt(0,canais.length-1)]} → ${assuntos[randInt(0,assuntos.length-1)]}`;
  });
}

const lojas = [
  'ZettaMarket Central',
  'ZettaPayments Express',
  'ZettaShop Premium',
  'ZettaOutlet',
  'ZettaMall Norte'
];
const colaboradores = [
  'Ana Silva','Bruno Costa','Carla Souza','Diego Lima','Elena Rocha'
];

function atualizarDashboard() {
  // 1) KPIs gerais
  document.getElementById('kpiTotal').textContent   = randInt(50,200);
  document.getElementById('kpiAbertos').textContent = randInt(0,50);
  document.getElementById('kpiUrgentes').textContent= randInt(0,20);
  document.getElementById('kpiTempo').textContent  =
    `${String(randInt(0,2)).padStart(2,'0')}:${String(randInt(0,59)).padStart(2,'0')}`;
  document.getElementById('kpiSat').textContent    =
    `${(Math.random()*2+3).toFixed(1)} ★`;

  // 2) Feedback counts
  document.getElementById('kpiReclam').textContent = randInt(5,30);
  document.getElementById('kpiSugest').textContent = randInt(10,50);
  document.getElementById('kpiElog').textContent   = randInt(20,70);

  // 3) Ranking NPS por loja
  const rankingEl = document.getElementById('rankingNPS');
  rankingEl.innerHTML = '';
  lojas
    .map(nome => ({nome, nps: randInt(60,100)}))
    .sort((a,b)=>b.nps-a.nps)
    .forEach(({nome,nps}) => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${nome}</span><strong>${nps}</strong>`;
      rankingEl.appendChild(li);
    });

  // 4) Top colaborador
  const topCol = colaboradores
    .map(nome=>({nome,qtd:randInt(5,30)}))
    .sort((a,b)=>b.qtd-a.qtd)[0];
  document.getElementById('colaboradorElog').textContent =
    `${topCol.nome} — ${topCol.qtd} elogio(s)`;

  // 5) Distribuição de canais
  const chan = {
    chat: randInt(10,100),
    telefone: randInt(5,80),
    email: randInt(8,90)
  };
  const totalChan = chan.chat+chan.telefone+chan.email;
  document.getElementById('pctChat').textContent    = `${Math.round(chan.chat/totalChan*100)}%`;
  document.getElementById('pctTelefone').textContent= `${Math.round(chan.telefone/totalChan*100)}%`;
  document.getElementById('pctEmail').textContent   = `${Math.round(chan.email/totalChan*100)}%`;

  // 6) Tipos de solicitação
  const ty = {
    reclam: randInt(5,50),
    sugest: randInt(10,60),
    outros: randInt(0,30)
  };
  const totalTy = ty.reclam+ty.sugest+ty.outros;
  document.getElementById('pctReclamPct').textContent = `${Math.round(ty.reclam/totalTy*100)}%`;
  document.getElementById('pctSugestPct').textContent = `${Math.round(ty.sugest/totalTy*100)}%`;
  document.getElementById('pctOutrosPct').textContent = `${Math.round(ty.outros/totalTy*100)}%`;

  // 7) Feed de tickets
  const feed = document.getElementById('feedTickets');
  feed.innerHTML = '';
  gerarFeedFake(15).forEach(txt => {
    const li = document.createElement('li');
    li.textContent = txt;
    feed.appendChild(li);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  atualizarDashboard();
  setInterval(atualizarDashboard, 2000);
});
