// ==========================================================================
// Selección de Elementos del DOM
// ==========================================================================
// Se guardan en constantes las referencias a los elementos HTML que se van a manipular.
const navToggle = document.querySelector('.nav-toggle'); // Botón de menú hamburguesa
const navMobile = document.querySelector('.nav-mobile');   // Menú de navegación móvil
const navToggleIcon = document.querySelector('.nav-toggle i'); // Icono dentro del botón de menú
const header = document.querySelector('.site-header');       // Cabecera del sitio

// ==========================================================================
// Función para gestionar la Navegación Móvil
// ==========================================================================
/**
 * Muestra u oculta el menú de navegación móvil.
 * @param {boolean} isOpen - `true` para abrir el menú, `false` para cerrarlo.
 */
const toggleMobileNav = isOpen => {
    // Si alguno de los elementos no existe, la función no hace nada.
    if (!navToggle || !navMobile || !navToggleIcon) {
        return;
    }

    // Añade o quita la clase 'active' para mostrar u ocultar el menú con CSS.
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
// Gestión del Scroll Suave para Anclas
// ==========================================================================
// Se seleccionan todos los enlaces que apuntan a una sección de la misma página.
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', event => {
        const targetId = anchor.getAttribute('href');
        // Si el enlace no tiene un destino válido, no hace nada.
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

        // Si el menú móvil está abierto, lo cierra después de hacer clic en un enlace.
        if (navMobile && navMobile.classList.contains('active')) {
            toggleMobileNav(false);
        }
    });
});

// ==========================================================================
// Efecto en la Cabecera al Hacer Scroll
// ==========================================================================
// Añade una clase a la cabecera cuando el usuario se desplaza hacia abajo.
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Si el scroll vertical es mayor a 50px
            header.classList.add('scrolled'); // Añade la clase para cambiar su estilo (más compacto, fondo opaco).
        } else {
            header.classList.remove('scrolled'); // La quita si se vuelve a la parte superior.
        }
    });
}

// ==========================================================================
// Event Listener para el Botón del Menú Móvil
// ==========================================================================
// Al hacer clic en el botón de menú, se llama a la función `toggleMobileNav`.
if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
        // Comprueba si el menú está actualmente abierto o cerrado para pasar el estado contrario.
        const isOpen = !navMobile.classList.contains('active');
        toggleMobileNav(isOpen);
    });
}

// ==========================================================================
// Animaciones de Aparición con Intersection Observer
// ==========================================================================
// Selecciona todos los elementos que deben aparecer con una animación de "fade-in".
const faders = document.querySelectorAll('.fade-in');
// Opciones para el Intersection Observer.
const appearOptions = {
    threshold: 0.3, // El elemento se considera visible cuando el 30% de él está en pantalla.
    rootMargin: '0px 0px -80px 0px' // Reduce el área de detección para que la animación se active un poco más tarde.
};

// Crea un observador que vigila cuándo los elementos entran en la pantalla.
const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Si el elemento no está intersectando (visible), no hace nada.
        if (!entry.isIntersecting) {
            return;
        }

        // Añade la clase 'visible' para activar la animación CSS.
        entry.target.classList.add('visible');
        // Deja de observar el elemento una vez que ha sido animado.
        observer.unobserve(entry.target);
    });
}, appearOptions);

// Aplica el observador a cada uno de los elementos "fader".
faders.forEach(fader => {
    appearOnScroll.observe(fader);
});
