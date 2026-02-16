// include.js - Versión corregida
console.log('📁 Incluyendo componentes...');

let loadedComponents = 0;
const totalComponents = 2; // header + footer

function checkAllLoaded() {
  loadedComponents++;
  if (loadedComponents === totalComponents) {
    console.log('✅ Todos los componentes cargados');
    // Inicializar menú móvil AHORA que los elementos existen
    initMobileMenu();
  }
}

// Función para el menú hamburguesa
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    // Eliminar event listeners anteriores (por si acaso)
    const newMenuToggle = menuToggle.cloneNode(true);
    menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
    const newNavMenu = navMenu.cloneNode(true);
    navMenu.parentNode.replaceChild(newNavMenu, navMenu);

    // Volver a obtener las referencias
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
    console.log('✅ Menú móvil inicializado');
  } else {
    console.warn('⚠️ No se encontraron elementos del menú móvil');
  }
}

// Cargar header (ruta relativa a index.html)
fetch('/partials/header.html')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  })
  .then(data => {
    document.getElementById('header').innerHTML = data;
    console.log('✅ Header cargado');
    checkAllLoaded();
  })
  .catch(error => {
    console.error('❌ Error cargando header:', error);
    document.getElementById('header').innerHTML = `
      <div style="color: red; padding: 20px; text-align: center;">
        Error cargando el header. Ver consola.
      </div>
    `;
    checkAllLoaded(); // Aún así contar para continuar
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
    console.error('❌ Error cargando footer:', error);
    document.getElementById('footer').innerHTML = `
      <div style="color: red; padding: 20px; text-align: center;">
        Error cargando el footer
      </div>
    `;
    checkAllLoaded();
  });