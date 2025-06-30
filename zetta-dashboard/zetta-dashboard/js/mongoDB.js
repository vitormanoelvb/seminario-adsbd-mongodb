// js/mongoDB.js
document.addEventListener('DOMContentLoaded', () => {
  const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);

  function updateKPIs() {
    document.getElementById('kpiApps').textContent       = rand(5, 20);
    document.getElementById('kpiNodes').textContent      = rand(3, 10);
    document.getElementById('kpiQueries').textContent    = rand(100, 500);
    document.getElementById('kpiBlocked').textContent    = rand(0, 20);
    document.getElementById('kpiIndexes').textContent    = rand(50, 200);
    document.getElementById('kpiGrants').textContent     = rand(10, 60);
    document.getElementById('kpiClusterOps').textContent = rand(20, 100);
    document.getElementById('kpiStorageIO').textContent  = `${rand(50,300)} MB/s`;
    document.getElementById('kpiBackups').textContent    = rand(0,5);
    document.getElementById('kpiIntrusions').textContent = rand(0,3);
  }

  const svcIds = [
    'Metadata','Schema','Migration','Security','Governance',
    'BI','Federation','Streams','Tables','Orders','Cross','Audit'
  ];
  function updateServices() {
    svcIds.forEach(key => {
      const el = document.getElementById('svc' + key);
      let val = 0;
      switch (key) {
        case 'Metadata':   val = rand(100,500);  break;
        case 'Schema':     val = rand(50,200);   break;
        case 'Migration':  val = rand(10,50);    break;
        case 'Security':   val = rand(5,25);     break;
        case 'Governance': val = rand(8,30);     break;
        case 'BI':         val = rand(15,60);    break;
        case 'Federation': val = rand(3,15);     break;
        case 'Streams':    val = rand(20,80);    break;
        case 'Tables':     val = rand(50,150);   break;
        case 'Orders':     val = rand(100,300);  break;
        case 'Cross':      val = rand(5,20);     break;
        case 'Audit':      val = rand(2,10);     break;
      }
      if (el) el.textContent = val;
    });
  }

  function updateAlerts() {
    const msgs = [
      'Bloqueio de consulta suspeita',
      'Tentativa de injeção detectada',
      'Grant não autorizado bloqueado',
      'Excesso de conexões rejeitadas',
      'Alteração de privilégios detectada'
    ];
    const list = document.getElementById('alertList');
    list.innerHTML = '';
    msgs.sort(() => 0.5 - Math.random())
        .slice(0,3)
        .forEach(text => {
          const li = document.createElement('li');
          li.textContent = text;
          list.appendChild(li);
        });
  }

  const queryIds = ['find','agg','stats','watch','listdb','collmod'];
  function updateQueryCounts() {
    queryIds.forEach(id => {
      const el = document.getElementById(`qc-${id}`);
      if (el) el.textContent = rand(0,1000);
    });
  }

  function tick() {
    updateKPIs();
    updateServices();
    updateAlerts();
    updateQueryCounts();
  }

  tick();
  setInterval(tick, 8000);
});
