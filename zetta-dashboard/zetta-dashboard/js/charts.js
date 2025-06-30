// charts.js - BI.html
document.addEventListener('DOMContentLoaded', () => {
  new Chart(document.getElementById('chartReceita').getContext('2d'), {
    type:'line',
    data:{ labels:['Jan','Fev','Mar','Abr','Mai','Jun'],
           datasets:[{ label:'Receita (R$)', data:[120,150,180,170,200,230], fill:false }] }
  });
  new Chart(document.getElementById('chartPagamentos').getContext('2d'), {
    type:'bar',
    data:{ labels:['Dinheiro','Cartão','PIX','Vale'],
           datasets:[{ label:'Qtd Transações', data:[300,450,600,150] }] }
  });
});
