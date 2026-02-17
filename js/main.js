// main.js - VERSIÓN COMPLETA Y FUNCIONAL
console.log('🎪 Beauty Boss Lash Congress - Script cargado');

// ==============================
// VARIABLES GLOBALES
// ==============================
let isMenuOpen = false;
let menuToggle, nav, header;

// ==============================
// CONFIGURACIÓN DEL MENÚ MÓVIL
// ==============================
function initializeMenu() {
  menuToggle = document.getElementById('menuToggle');
  nav = document.querySelector('.nav');
  header = document.querySelector('.header');
  
  if (!menuToggle || !nav) {
    console.warn('⚠️ Elementos del menú no encontrados');
    return false;
  }
  
  console.log('✅ Elementos del menú encontrados');
  
  // Configurar eventos
  menuToggle.addEventListener('click', handleMenuToggle);
  
  // Cerrar menú al hacer clic en enlaces
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (isMenuOpen && 
        !nav.contains(e.target) && 
        e.target !== menuToggle && 
        !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });
  
  // Cerrar menú con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) closeMenu();
  });
  
  return true;
}

function handleMenuToggle(e) {
  e.stopPropagation();
  
  isMenuOpen = !isMenuOpen;
  nav.classList.toggle('active', isMenuOpen);
  menuToggle.classList.toggle('active', isMenuOpen);
  
  if (header) header.classList.toggle('menu-open', isMenuOpen);
  
  // Controlar scroll SOLO en móvil
  if (isMenuOpen && window.innerWidth <= 768) {
    document.body.classList.add('menu-open');
  } else {
    document.body.classList.remove('menu-open');
  }
  
  console.log(isMenuOpen ? '📱 Menú abierto' : '📱 Menú cerrado');
}

function closeMenu() {
  if (!isMenuOpen) return;
  
  isMenuOpen = false;
  nav.classList.remove('active');
  menuToggle.classList.remove('active');
  if (header) header.classList.remove('menu-open');
  document.body.classList.remove('menu-open');
}

// ==============================
// HEADER - ANIMACIÓN AL SCROLL
// ==============================
function initHeaderScroll() {
  if (!header) return;
  
  let lastScroll = 0;
  let isScrolling = false;
  
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      isScrolling = true;
      
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;
        
        // Solo si el menú NO está abierto
        // if (!isMenuOpen) {
        //   if (currentScroll > lastScroll && currentScroll > 100) {
        //     header.style.transform = 'translateY(-100%)';
        //   } else {
        //     header.style.transform = 'translateY(0)';
        //   }
        // }
        
        // Agregar clase cuando se hace scroll
        header.classList.toggle('scrolled', currentScroll > 50);
        
        lastScroll = currentScroll;
        isScrolling = false;
      });
    }
  });
}

// ==============================
// ANIMACIÓN DE ELEMENTOS AL SCROLL
// ==============================
function animateOnScroll() {
  const elements = document.querySelectorAll('.card, .timeline-item, .team-member, .fade-section');
  
  if (elements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('visible');
          }, index * 100);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.6s ease';
      observer.observe(element);
    });
    
    console.log(`✅ Animaciones configuradas para ${elements.length} elementos`);
  }
}

// ==============================
// FADE SECTIONS
// ==============================
function initFadeSections() {
  const fadeSections = document.querySelectorAll('.fade-section');
  
  if (fadeSections.length > 0) {
    const fadeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { 
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    });
    
    fadeSections.forEach(section => {
      // Inicializar con estilos si no los tiene
      if (!section.style.opacity) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      }
      fadeObserver.observe(section);
    });
    
    console.log(`✅ Fade sections configuradas: ${fadeSections.length}`);
  }
}

// ==============================
// SMOOTH SCROLL PARA ENLACES INTERNOS
// ==============================
function initSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  
  if (internalLinks.length > 0) {
    internalLinks.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            // Cerrar menú si está abierto
            if (isMenuOpen) {
              closeMenu();
            }
            
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
    
    console.log(`✅ Smooth scroll configurado para ${internalLinks.length} enlaces`);
  }
}

// ==============================
// FORMULARIO DE CONTACTO
// ==============================
function initContactForm() {
  const contactForm = document.querySelector('.contacto-container form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simulación de envío
        setTimeout(() => {
          submitBtn.textContent = '¡Enviado! ✓';
          submitBtn.style.background = 'var(--gold)';
          submitBtn.style.color = 'var(--black)';
          
          setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
          }, 2000);
        }, 1500);
      }
    });
    
    console.log('✅ Formulario de contacto configurado');
  }
}

// ==============================
// CONTADOR REGRESIVO
// ==============================
function initCountdown() {
  const countdownEl = document.getElementById('countdown');
  
  if (countdownEl) {
    const createCountdown = (targetDate) => {
      const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = new Date(targetDate).getTime() - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownEl.innerHTML = `
          <div class="countdown-item">
            <span class="countdown-number">${days}</span>
            <span class="countdown-label">Días</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-number">${hours}</span>
            <span class="countdown-label">Horas</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-number">${minutes}</span>
            <span class="countdown-label">Minutos</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-number">${seconds}</span>
            <span class="countdown-label">Segundos</span>
          </div>
        `;
        
        if (distance < 0) {
          countdownEl.innerHTML = '<h2>¡El evento ha comenzado!</h2>';
          clearInterval(interval);
        }
      };
      
      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
    };
    
    createCountdown('October 17, 2026 00:00:00');
    console.log('✅ Countdown configurado');
  }
}

// ==============================
// EFECTO DE PARALLAX SUAVE
// ==============================
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      heroContent.style.opacity = 1 - scrolled / 600;
    }
  });
}

// ==============================
// INICIALIZACIÓN PRINCIPAL
// ==============================
function initApp() {
  console.log('🚀 Inicializando aplicación...');
  
  // Asegurar que el body tenga scroll normal
  document.body.style.overflow = 'auto';
  document.body.classList.remove('menu-open');
  
  // 1. Menú móvil (CRÍTICO)
  if (!initializeMenu()) {
    console.error('❌ No se pudo inicializar el menú');
    // Continuar con otras funciones aunque falle el menú
  }
  
  // 2. Header scroll animation
  initHeaderScroll();
  
  // 3. Animaciones al scroll
  animateOnScroll();
  
  // 4. Fade sections
  initFadeSections();
  
  // 5. Smooth scroll
  initSmoothScroll();
  
  // 6. Formulario de contacto
  initContactForm();
  
  // 7. Countdown
  initCountdown();
  
  // 8. Parallax (opcional)
  initParallax();
  
  // Añadir clase loaded al body
  document.body.classList.add('loaded');
  
  console.log('🎉 Aplicación inicializada correctamente');
}

// ==============================
// EVENT LISTENERS
// ==============================

// Escuchar cuando los componentes estén cargados
document.addEventListener('componentsLoaded', () => {
  console.log('📦 Evento componentsLoaded recibido');
  setTimeout(initApp, 150);
});

// También en DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM cargado');
  
  // Intentar inicializar si ya están los elementos
  if (document.getElementById('menuToggle')) {
    console.log('⚡ Elementos ya disponibles');
    initApp();
  } else {
    console.log('⏳ Esperando carga de componentes...');
    // Backup: intentar después de 2 segundos
    setTimeout(() => {
      if (document.getElementById('menuToggle')) {
        initApp();
      }
    }, 2000);
  }
});

// Reset scroll al cambiar tamaño de ventana
window.addEventListener('resize', () => {
  if (!isMenuOpen || window.innerWidth > 768) {
    document.body.classList.remove('menu-open');
  }
});

// ==============================
// ESTILOS DINÁMICOS
// ==============================
const globalStyles = document.createElement('style');
globalStyles.textContent = `
  /* KEYFRAMES */
  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(10deg);
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes marquee {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.3;
      transform: translateX(-50%) scale(1);
    }
    50% {
      opacity: 0.6;
      transform: translateX(-50%) scale(1.2);
    }
  }
  
  /* TRANSICIONES */
  .fade-section,
  .card,
  .timeline-item,
  .team-member {
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  .fade-section.visible,
  .card.visible,
  .timeline-item.visible,
  .team-member.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  
  /* MENÚ MÓVIL */
  @media (max-width: 768px) {
    body.menu-open {
      overflow: hidden !important;
      position: fixed;
      width: 100%;
      height: 100%;
    }
  }
  
  /* DEBUG VISUAL */
  .loaded {
    opacity: 1 !important;
  }
  
  /* PRELOADER REMOVAL */
  body.loaded .preloader {
    display: none !important;
  }
`;
document.head.appendChild(globalStyles);

// ==============================
// CLEANUP INICIAL
// ==============================
// Asegurar que al cargar la página, el body tenga scroll normal
window.addEventListener('load', () => {
  console.log('🔄 Página completamente cargada');
  document.body.classList.add('loaded');
  document.body.style.overflow = 'auto';
  document.body.classList.remove('menu-open');
});

console.log('🎯 Script principal listo y esperando');