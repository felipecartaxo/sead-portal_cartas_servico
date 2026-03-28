// Módulo específico do tutorial de Cadastro de Serviços
const CadastroServicosModule = (() => {
    
    // Inicializa o módulo do tutorial
    const init = () => {
        UtilsModule.log('Módulo de Cadastro de Serviços inicializado', 'info');
        setupEventListeners();
        setupInteractiveElements();
    };

    // Configura os listeners de eventos
    const setupEventListeners = () => {
        // Expandir/colapsar detalhes
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

    // Configura elementos interativos
    const setupInteractiveElements = () => {
        // Adicionar highlight nos passos
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            step.setAttribute('data-step', index + 1);
        });
    };

    // Handler para expandir/colapsar detalhes
    const handleDetailsToggle = (e) => {
        const isOpen = e.currentTarget.open;
        UtilsModule.log(`FAQ item ${isOpen ? 'aberto' : 'fechado'}`, 'debug');
    };

    return {
        init
    };
})();
