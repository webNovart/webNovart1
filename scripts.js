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
