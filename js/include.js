
let loadedComponents = 0;
const totalComponents = 2; 

function checkAllLoaded() {
  loadedComponents++;
  if (loadedComponents === totalComponents) {
    initMobileMenu();
  }
}

// Función para el menú hamburguesa
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    const newMenuToggle = menuToggle.cloneNode(true);
    menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
    const newNavMenu = navMenu.cloneNode(true);
    navMenu.parentNode.replaceChild(newNavMenu, navMenu);

    const finalMenuToggle = document.getElementById('menuToggle');
    const finalNavMenu = document.getElementById('navMenu');

    finalMenuToggle.addEventListener('click', function () {
      finalNavMenu.classList.toggle('active');
    });

    const navLinks = finalNavMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        finalNavMenu.classList.remove('active');
      });
    });
  } else {
    console.warn('No se encontraron elementos del menú móvil');
  }
}

fetch('/partials/header.html')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  })
  .then(data => {
    document.getElementById('header').innerHTML = data;
    checkAllLoaded();
  })
  .catch(error => {
    console.error('Error cargando header:', error);
    document.getElementById('header').innerHTML = `
      <div style="color: red; padding: 20px; text-align: center;">
        Error cargando el header. Ver consola.
      </div>
    `;
    checkAllLoaded(); 
  });

// Cargar footer
fetch('/partials/footer.html')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  })
  .then(data => {
    document.getElementById('footer').innerHTML = data;
    console.log('✅ Footer cargado');
    checkAllLoaded();
  })
  .catch(error => {
    console.error('Error cargando footer:', error);
    document.getElementById('footer').innerHTML = `
      <div style="color: red; padding: 20px; text-align: center;">
        Error cargando el footer
      </div>
    `;
    checkAllLoaded();
  });