// Funções utilitárias compartilhadas
const UtilsModule = (() => {

    // Função para rolar suavemente até um elemento
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

    // Adiciona uma classe com transição
    const addClass = (element, className, transitionDuration = null) => {
        if (transitionDuration) {
            element.style.transition = `all ${transitionDuration}ms ease`;
        }
        element.classList.add(className);
    };

    // Remove uma classe com transição
    const removeClass = (element, className, transitionDuration = null) => {
        if (transitionDuration) {
            element.style.transition = `all ${transitionDuration}ms ease`;
        }
        element.classList.remove(className);
    };
    
    // Toggle de uma classe
    const toggleClass = (element, className) => {
        element.classList.toggle(className);
    };

    // Debounce para eventos de resize, scroll, etc
    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // Log com prefixo
    const log = (message, type = 'info') => {
        const prefix = '[Tutorial Portal]';
        console.log(`${prefix} [${type.toUpperCase()}] ${message}`);
    };

    return {
        scrollToElement,
        isMobile,
        isTablet,
        addClass,
        removeClass,
        toggleClass,
        debounce,
        log
    };
})();
