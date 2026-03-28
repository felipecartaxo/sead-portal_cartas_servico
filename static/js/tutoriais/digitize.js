// Módulo específico do tutorial de Digitize
const DigitizeModule = (() => {
    
    // Inicializa o módulo do tutorial
    const init = () => {
        UtilsModule.log('Módulo de Digitize inicializado', 'info');
        setupEventListeners();
        setupSecurityFeatures();
    };

    // Configura os listeners de eventos
    const setupEventListeners = () => {
        // Expandir/colapsar detalhes (FAQ)
        const detailsElements = document.querySelectorAll('details');
        detailsElements.forEach(details => {
            details.addEventListener('toggle', (e) => {
                handleDetailsToggle(e);
            });
        });

        // Smooth scroll para seções
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                UtilsModule.scrollToElement(href);
            });
        });
    };

    // Configura elementos de segurança
    const setupSecurityFeatures = () => {
        const features = document.querySelectorAll('.feature');
        features.forEach((feature, index) => {
            feature.setAttribute('data-feature', index + 1);
        });
    };

    // Handler para expandir/colapsar detalhes
    const handleDetailsToggle = (e) => {
        const isOpen = e.currentTarget.open;
        UtilsModule.log(`Questão técnica ${isOpen ? 'expandida' : 'recolhida'}`, 'debug');
    };

    return {
        init
    };
})();
