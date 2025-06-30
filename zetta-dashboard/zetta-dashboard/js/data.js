/* === js/data.js === */

// Gera data aleatória entre duas datas (YYYY-MM-DD)
function randomDate(start, end) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split('T')[0];
}

// Gera valor entre 10 e 500
function randomAmount() {
  return (Math.random() * 490 + 10).toFixed(2);
}

// Métodos de pagamento disponíveis
const paymentMethods = ['Dinheiro', 'Cartão', 'PIX', 'Vale'];

// Arrays globais que simulam coleções MongoDB
window.zettaMarket   = [];
window.zettaPayments = [];

// Popula 50 registros de ZettaMarket
for (let i = 1; i <= 50; i++) {
  window.zettaMarket.push({
    id: i,
    origem: 'ZettaMarket',
    date: randomDate(new Date(2025, 0, 1), new Date()),
    location: `Loja ${i}`,
    amount: randomAmount(),
    method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)]
  });
}

// Popula 70 registros de ZettaPayments
for (let i = 1; i <= 70; i++) {
  window.zettaPayments.push({
    id: i,
    origem: 'ZettaPayments',
    date: randomDate(new Date(2025, 0, 1), new Date()),
    location: `Filial ${i}`,
    amount: randomAmount(),
    method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)]
  });

