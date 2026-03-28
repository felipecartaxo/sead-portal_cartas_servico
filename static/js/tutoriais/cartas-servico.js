// Módulo específico do tutorial de Cartas de Serviço
const CartasServicosModule = (() => {
    
    // Inicializa o módulo do tutorial
    const init = () => {
        UtilsModule.log('Módulo de Cartas de Serviço inicializado', 'info');
        setupEventListeners();
        setupBestPractices();
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

    // Configura elementos de boas práticas
    const setupBestPractices = () => {
        const practiceItems = document.querySelectorAll('.practice-item');
        practiceItems.forEach((item, index) => {
            item.setAttribute('data-practice', index + 1);
        });
    };

    // Handler para expandir/colapsar detalhes
    const handleDetailsToggle = (e) => {
        const isOpen = e.currentTarget.open;
        UtilsModule.log(`Pergunta frequente ${isOpen ? 'expandida' : 'recolhida'}`, 'debug');
    };

    return {
        init
    };
})();
