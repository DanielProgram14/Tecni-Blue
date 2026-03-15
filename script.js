// ==========================================================================
// Seleccin de Elementos del DOM
// ==========================================================================
// Se guardan en constantes las referencias a los elementos HTML que se van a manipular.
const navToggle = document.querySelector('.nav-toggle'); // Botn de men hamburguesa
const navMobile = document.querySelector('.nav-mobile');   // Men de navegacin mvil
const navToggleIcon = document.querySelector('.nav-toggle i'); // Icono dentro del botn de men
const header = document.querySelector('.site-header');       // Cabecera del sitio

// ==========================================================================
// Funcin para gestionar la Navegacin Mvil
// ==========================================================================
/**
 * Muestra u oculta el men de navegacin mvil.
 * @param {boolean} isOpen - `true` para abrir el men, `false` para cerrarlo.
 */
const toggleMobileNav = isOpen => {
    // Si alguno de los elementos no existe, la funcin no hace nada.
    if (!navToggle || !navMobile || !navToggleIcon) {
        return;
    }

    // Aade o quita la clase 'active' para mostrar u ocultar el men con CSS.
    navMobile.classList.toggle('active', isOpen);
    // Actualiza los atributos ARIA para la accesibilidad.
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navMobile.setAttribute('aria-hidden', String(!isOpen));

    // Cambia el icono de hamburguesa a una 'X' y viceversa.
    if (isOpen) {
        navToggleIcon.classList.remove('fa-bars');
        navToggleIcon.classList.add('fa-times');
    } else {
        navToggleIcon.classList.remove('fa-times');
        navToggleIcon.classList.add('fa-bars');
    }
};

// ==========================================================================
// Gestin del Scroll Suave para Anclas
// ==========================================================================
// Se seleccionan todos los enlaces que apuntan a una seccin de la misma pgina.
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', event => {
        const targetId = anchor.getAttribute('href');
        // Si el enlace no tiene un destino vlido, no hace nada.
        if (!targetId || targetId === '#') {
            return;
        }

        const targetElement = document.querySelector(targetId);
        // Si el elemento de destino no existe, no hace nada.
        if (!targetElement) {
            return;
        }

        // Previene el comportamiento por defecto del enlace.
        event.preventDefault();
        // Realiza un scroll suave hacia el elemento de destino.
        window.scrollTo({
            top: targetElement.offsetTop - 90, // Se resta 90px para compensar la altura de la cabecera fija.
            behavior: 'smooth'
        });

        // Si el men mvil est abierto, lo cierra despus de hacer clic en un enlace.
        if (navMobile && navMobile.classList.contains('active')) {
            toggleMobileNav(false);
        }
    });
});

// ==========================================================================
// Efecto en la Cabecera al Hacer Scroll
// ==========================================================================
// Aade una clase a la cabecera cuando el usuario se desplaza hacia abajo.
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Si el scroll vertical es mayor a 50px
            header.classList.add('scrolled'); // Aade la clase para cambiar su estilo (ms compacto, fondo opaco).
        } else {
            header.classList.remove('scrolled'); // La quita si se vuelve a la parte superior.
        }
    });
}

// ==========================================================================
// Event Listener para el Botn del Men Mvil
// ==========================================================================
// Al hacer clic en el botn de men, se llama a la funcin `toggleMobileNav`.
if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
        // Comprueba si el men est actualmente abierto o cerrado para pasar el estado contrario.
        const isOpen = !navMobile.classList.contains('active');
        toggleMobileNav(isOpen);
    });
}

// ==========================================================================
// Animaciones de Aparicin con Intersection Observer
// ==========================================================================
// Selecciona todos los elementos que deben aparecer con una animacin de "fade-in".
const faders = document.querySelectorAll('.fade-in');
// Opciones para el Intersection Observer.
const appearOptions = {
    threshold: 0.3, // El elemento se considera visible cuando el 30% de l est en pantalla.
    rootMargin: '0px 0px -80px 0px' // Reduce el rea de deteccin para que la animacin se active un poco ms tarde.
};

// Crea un observador que vigila cundo los elementos entran en la pantalla.
const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Si el elemento no est intersectando (visible), no hace nada.
        if (!entry.isIntersecting) {
            return;
        }

        // Aade la clase 'visible' para activar la animacin CSS.
        entry.target.classList.add('visible');
        // Deja de observar el elemento una vez que ha sido animado.
        observer.unobserve(entry.target);
    });
}, appearOptions);

// Aplica el observador a cada uno de los elementos "fader".
faders.forEach(fader => {
    appearOnScroll.observe(fader);
});
