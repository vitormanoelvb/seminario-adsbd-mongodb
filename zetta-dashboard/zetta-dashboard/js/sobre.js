// sobre.js – controla sidebar e tema, igual às outras páginas
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const btnToggle = document.getElementById('toggleSidebar');
  const btnTheme  = document.getElementById('themeSwitch');

  // Alterna sidebar
  btnToggle.onclick = () => {
    sidebar.classList.toggle('open');
    document.body.style.marginLeft = sidebar.classList.contains('open') ? '220px' : '0';
  };

  // Alterna tema dark/light
  btnTheme.onclick = () => {
    document.body.classList.toggle('dark');
    btnTheme.innerHTML = document.body.classList.contains('dark')
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  };

  // Aplica tema salvo (opcional)
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    btnTheme.innerHTML = '<i class="fas fa-sun"></i>';
  }
});
