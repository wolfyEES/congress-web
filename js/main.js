// ==============================
// HEADER - ANIMACIÓN AL SCROLL
// ==============================

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Ocultar/mostrar header al hacer scroll
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }

  // Agregar clase cuando se hace scroll
  header.classList.toggle('scrolled', currentScroll > 50);

  lastScroll = currentScroll;
});

// ==============================
// MENÚ MÓVIL - HAMBURGUESA
// ==============================

const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    
    // Animar las barras del menú
    const spans = menuToggle.querySelectorAll('span');
    if (nav.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Cerrar menú al hacer clic en un enlace
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

// ==============================
// ANIMACIÓN DE ELEMENTOS AL SCROLL
// ==============================

const animateOnScroll = () => {
  const elements = document.querySelectorAll('.card, .timeline-item, .team-member');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100); // Delay escalonado
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
};

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
  animateOnScroll();
}

// ==============================
// PARTÍCULAS FLOTANTES (OPCIONAL)
// ==============================

const createFloatingParticles = () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const particleCount = 15;
  const particles = ['★', '✦', '◆', '✨'];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
    particle.style.cssText = `
      position: absolute;
      color: var(--gold);
      font-size: ${Math.random() * 15 + 10}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.3 + 0.1};
      pointer-events: none;
      animation: float ${Math.random() * 5 + 5}s ease-in-out infinite;
      animation-delay: ${Math.random() * 3}s;
    `;
    hero.appendChild(particle);
  }
};

// Crear partículas solo en la página de inicio
if (document.querySelector('.hero')) {
  createFloatingParticles();
}

// ==============================
// EFECTO DE PARALLAX SUAVE
// ==============================

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - scrolled / 600;
  }
});

// ==============================
// CURSOR PERSONALIZADO (OPCIONAL)
// ==============================

const createCustomCursor = () => {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid var(--gold);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 10000;
    transition: transform 0.2s ease, background 0.2s ease;
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);

  const cursorFollower = document.createElement('div');
  cursorFollower.className = 'cursor-follower';
  cursorFollower.style.cssText = `
    width: 8px;
    height: 8px;
    background: var(--gold);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 10001;
    transition: transform 0.15s ease;
  `;
  document.body.appendChild(cursorFollower);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    
    setTimeout(() => {
      cursorFollower.style.left = e.clientX - 4 + 'px';
      cursorFollower.style.top = e.clientY - 4 + 'px';
    }, 50);
  });

  // Efecto hover en elementos interactivos
  document.querySelectorAll('a, button, .card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursor.style.background = 'rgba(212, 175, 55, 0.2)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.background = 'transparent';
    });
  });
};

// Activar cursor personalizado solo en desktop
if (window.innerWidth > 768) {
  // createCustomCursor(); // Descomentar si quieres el cursor personalizado
}

// ==============================
// SMOOTH SCROLL PARA ENLACES INTERNOS
// ==============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==============================
// LOADING ANIMATION (OPCIONAL)
// ==============================

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Agregar animación de entrada a elementos principales
  const mainElements = document.querySelectorAll('main > section');
  mainElements.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    setTimeout(() => {
      section.style.transition = 'all 0.8s ease';
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

// ==============================
// FORMULARIO DE CONTACTO
// ==============================

const contactForm = document.querySelector('.contacto-container form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Aquí puedes agregar la lógica de envío
    const submitBtn = contactForm.querySelector('button[type="submit"]');
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
  });
}

// ==============================
// CONTADOR REGRESIVO (PARA EL CONGRESO)
// ==============================

const createCountdown = (targetDate) => {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

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
      countdownEl.innerHTML = '<h2>¡El evento ha comenzado! 🎉</h2>';
    }
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
};

// Activar countdown si existe el elemento (fecha del congreso: 17 de octubre 2026)
if (document.getElementById('countdown')) {
  createCountdown('October 17, 2026 00:00:00');
}

console.log('Beauty Boss Lash Congress - Scripts cargados');