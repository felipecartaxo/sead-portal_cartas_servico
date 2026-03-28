// Funções utilitárias compartilhadas para todos os tutoriais
const UtilsModule = (() => {
    // Scroll suave até um elemento
    const scrollToElement = (elementId) => {
        const element = document.querySelector(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            return true;
        }
        return false;
    };

    // Verifica se o dispositivo é mobile
    const isMobile = () => {
        return window.innerWidth <= 768;
    };

    // Verifica se o dispositivo é tablet
    const isTablet = () => {
        return window.innerWidth <= 1024 && window.innerWidth > 768;
    };

    // Verifica se o dispositivo é desktop
    const isDesktop = () => {
        return window.innerWidth > 1024;
    };

    // Adiciona uma classe com transition
    const addClass = (element, className, transitionDuration = null) => {
        if (transitionDuration && element) {
            element.style.transition = `all ${transitionDuration}ms ease`;
        }
        element && element.classList.add(className);
    };

    // Remove uma classe
    const removeClass = (element, className, transitionDuration = null) => {
        if (transitionDuration && element) {
            element.style.transition = `all ${transitionDuration}ms ease`;
        }
        element && element.classList.remove(className);
    };

    // Toggle de uma classe
    const toggleClass = (element, className) => {
        element && element.classList.toggle(className);
    };

    // Verifica se um elemento tem uma classe
    const hasClass = (element, className) => {
        return element && element.classList.contains(className);
    };

    // Debounce para eventos
    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // Log com prefix
    const log = (message, type = 'info') => {
        const prefix = '[Portal Tutoriais]';
        const timestamp = new Date().toLocaleTimeString();
        console.log(`${prefix} [${timestamp}] [${type.toUpperCase()}] ${message}`);
    };

    // Delay com Promise
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    return {
        scrollToElement,
        isMobile,
        isTablet,
        isDesktop,
        addClass,
        removeClass,
        toggleClass,
        hasClass,
        debounce,
        log,
        delay
    };
})();
