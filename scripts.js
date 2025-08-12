// Animaciones y efectos interactivos para webNovart

// Animación de burbujas al hacer scroll
window.addEventListener('scroll', function() {
    document.querySelectorAll('.bubble').forEach(bubble => {
        bubble.style.transform = 'scale(1.05) rotate(' + (window.scrollY % 360) + 'deg)';
        setTimeout(() => bubble.style.transform = '', 300);
    });
});

// Efecto animado en cards
document.querySelectorAll('.interactive-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.transform = `rotateX(${-(y-rect.height/2)/14}deg) rotateY(${(x-rect.width/2)/14}deg) scale(1.04)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// FAQ interactivo
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('open');
        let p = item.querySelector('p');
        if (item.classList.contains('open')) {
            p.style.display = 'block';
        } else {
            p.style.display = 'none';
        }
    });
    // Mostrar solo la pregunta inicialmente
    item.querySelector('p').style.display = 'none';
});

// Efecto bounce en immersive experience
document.querySelectorAll('.interactive-bounce').forEach(el => {
    el.addEventListener('mouseover', () => {
        el.style.transform = 'scale(1.15) rotate(-5deg)';
    });
    el.addEventListener('mouseout', () => {
        el.style.transform = '';
    });
});

// Formulario de contacto (sin backend, solo feedback visual)
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', function(e){
        e.preventDefault();
        document.getElementById('formSuccess').style.display = 'block';
        document.getElementById('formSuccess').textContent = '¡Mensaje enviado! Nos contactaremos pronto.';
        setTimeout(() => {
            document.getElementById('formSuccess').style.display = 'none';
            contactForm.reset();
        }, 3500);
    });
}

// Hero animado (opcional, si tienes SVGs o imágenes animadas)
const heroImg = document.querySelector('.animated-graphic');
if(heroImg) {
    heroImg.addEventListener('mouseenter', () => {
        heroImg.style.filter = 'drop-shadow(0 0 25px #2f80ed)';
        heroImg.style.transform = 'scale(1.07) rotate(-2deg)';
    });
    heroImg.addEventListener('mouseleave', () => {
        heroImg.style.filter = '';
        heroImg.style.transform = '';
    });
}
// Dibujo en canvas para mouse y touch
document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById('draw-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let drawing = false;

    // Funciones utilitarias para obtener posición relativa
    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      if (e.touches && e.touches[0]) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      } else {
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    }

    // Mouse events
    canvas.addEventListener('mousedown', (e) => {
      drawing = true;
      ctx.beginPath();
      const {x, y} = getPos(e);
      ctx.moveTo(x, y);
    });
    canvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });
    canvas.addEventListener('mouseout', () => { drawing = false; ctx.beginPath(); });
    canvas.addEventListener('mousemove', (e) => {
      if (!drawing) return;
      const {x, y} = getPos(e);
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#2f80ed';
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    });

    // Touch events
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      drawing = true;
      ctx.beginPath();
      const {x, y} = getPos(e);
      ctx.moveTo(x, y);
    }, {passive: false});
    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      drawing = false;
      ctx.beginPath();
    }, {passive: false});
    canvas.addEventListener('touchcancel', (e) => {
      e.preventDefault();
      drawing = false;
      ctx.beginPath();
    }, {passive: false});
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!drawing) return;
      const {x, y} = getPos(e);
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#2f80ed';
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }, {passive: false});
  }
});

// Cambio de tema
const themeBtn = document.getElementById('theme-btn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      themeBtn.textContent = 'Modo Claro';
    } else {
      themeBtn.textContent = 'Modo Oscuro';
    }
  });
}

// Efecto partículas en botón
const particlesBtn = document.getElementById('particles-btn');
const particlesContainer = document.getElementById('particles-container');
if (particlesBtn && particlesContainer) {
  particlesBtn.addEventListener('click', () => {
    for (let i = 0; i < 15; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.position = 'absolute';
      p.style.left = '45px';
      p.style.top = '25px';
      p.style.width = '9px';
      p.style.height = '9px';
      p.style.borderRadius = '50%';
      p.style.background = `linear-gradient(90deg, #ff6a00, #2f80ed)`;
      p.style.opacity = Math.random() * 0.8 + 0.2;
      p.style.transform = `translate(-50%, -50%)`;
      particlesContainer.appendChild(p);
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 35 + 18;
      setTimeout(() => {
        p.style.transition = 'all .8s cubic-bezier(.7,.2,.4,1)';
        p.style.transform = `translate(${Math.cos(angle)*radius}px, ${Math.sin(angle)*radius}px) scale(0.5)`;
        p.style.opacity = 0;
      }, 10);
      setTimeout(() => particlesContainer.removeChild(p), 900);
    }
  });
}

// Flip Card
const flipCard = document.querySelector('.flip-card');
if (flipCard) {
  flipCard.addEventListener('click', () => {
    flipCard.classList.toggle('flipped');
  });
}

// Dark mode body (opcional para tema)
if (document.body.classList.contains('dark-mode')) {
  document.body.style.background = "#23272f";
}
const revealBox = document.getElementById('revealBox');
if (revealBox) {
  revealBox.addEventListener('mouseenter', function() {
    revealBox.textContent = '¡Sorpresa! 😃';
    revealBox.classList.add('active');
  });
  revealBox.addEventListener('mouseleave', function() {
    revealBox.textContent = '¿Qué hay aquí?';
    revealBox.classList.remove('active');
  });
}


document.addEventListener('DOMContentLoaded', function() {
    const wspNumber = "3113200214"; // Tu número sin signos ni espacios
    document.querySelectorAll('.btn-wsp-plan').forEach(btn => {
        btn.addEventListener('click', function() {
            const planCard = btn.closest('.plan-card');
            const plan = btn.getAttribute('data-plan');
            const precio = btn.getAttribute('data-precio');
            // Tomar características del plan
            const features = Array.from(planCard.querySelectorAll('ul li')).map(li => `• ${li.textContent}`).join('%0A');
            // El mensaje, dejando Observaciones en blanco
            let mensaje = `Hola, estoy interesado en el plan *${plan}* de webNovart.%0A%0A*Características:*%0A${features}%0A%0A*Precio:* ${precio}%0A%0A*Observaciones:*`;
            const wspUrl = `https://wa.me/${wspNumber}?text=${mensaje}`;
            window.open(wspUrl, '_blank');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = new FormData(form);
        fetch(form.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                form.innerHTML = "<p style='color:green;'>¡Gracias por tu mensaje! Pronto te contactaremos.</p>";
            } else {
                form.innerHTML = "<p style='color:red;'>Ocurrió un error. Intenta de nuevo o usa WhatsApp/Correo.</p>";
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
  // Solo ejecuta en la ventana principal, no en iframes
  if (window.top === window.self) {
    var seccion = document.getElementById('nivel-negocio');
    if(seccion) {
      seccion.scrollIntoView({behavior: "smooth"});
    }
  }
});

// Botón "Ir arriba"
const scrollTopBtn = document.createElement('button');
scrollTopBtn.id = 'scrollTopBtn';
scrollTopBtn.title = 'Ir arriba';
scrollTopBtn.innerText = '↑';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', function() {
  if (window.scrollY > 200) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});
scrollTopBtn.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener("DOMContentLoaded", function() {
  // Solo ejecuta en la ventana principal, no en iframes
  if (window.top === window.self) {
    var destino = document.getElementById('contactForm');
    if(destino) {
      destino.scrollIntoView({behavior: "smooth"});
    }
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Solo ejecuta en la ventana principal, no en iframes
  if (window.top === window.self) {
    var destino = document.getElementById('contactenosId');
    if(destino) {
      destino.scrollIntoView({behavior: "smooth"});
    }
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Solo ejecuta en la ventana principal, no en iframes
  if (window.top === window.self) {
    var destino = document.getElementById('preguntas');
    if(destino) {
      destino.scrollIntoView({behavior: "smooth"});
    }
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Solo ejecuta en la ventana principal, no en iframes
  if (window.top === window.self) {
    var destino = document.getElementById('sobre');
    if(destino) {
      destino.scrollIntoView({behavior: "smooth"});
    }
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Solo ejecuta en la ventana principal, no en iframes
  if (window.top === window.self) {
    var destino = document.getElementById('planes');
    if(destino) {
      destino.scrollIntoView({behavior: "smooth"});
    }
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Solo ejecuta en la ventana principal, no en iframes
  if (window.top === window.self) {
    var destino = document.getElementById('portafolio');
    if(destino) {
      destino.scrollIntoView({behavior: "smooth"});
    }
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Solo ejecuta en la ventana principal, no en iframes
  if (window.top === window.self) {
    var destino = document.getElementById('terminos');
    if(destino) {
      destino.scrollIntoView({behavior: "smooth"});
    }
  }
});
