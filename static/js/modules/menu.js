// Controla o comportamento do menu lateral e tutoriais
const MenuModule = (() => {
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
    const tutorialTitles = document.querySelectorAll('.tutorial-title');
    const menuLinks = sideMenu.querySelectorAll('.tutorial-submenu a');

    // Inicializa todos os listeners do menu
    const init = () => {
        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMobileMenu);
        }

        if (sidebarCollapseBtn) {
            sidebarCollapseBtn.addEventListener('click', toggleCompressionMenu);
        }

        tutorialTitles.forEach(button => {
            button.addEventListener('click', handleTutorialToggle);
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', handleMenuLink);
        });

        document.addEventListener('click', handleClickOutside);
        window.addEventListener('resize', handleResize);

        // Inicializar primeiro tutorial aberto
        openTutorial('tutorial1');
    };

    // Toggle do menu mobile (burger button)
    const toggleMobileMenu = () => {
        sideMenu.classList.toggle('collapsed');
        menuToggle.classList.toggle('active');
    };

    // Toggle de compressão do menu (desktop)
    const toggleCompressionMenu = () => {
        sideMenu.classList.toggle('compressed');
    };

    // Fecha todos os tutoriais
    const closeAllTutorials = () => {
        tutorialTitles.forEach(btn => {
            const tutId = btn.getAttribute('data-tutorial');
            const submenu = document.getElementById(tutId);
            submenu.classList.remove('show');
            btn.classList.remove('active');
        });
    };

    // Abre um tutorial específico
    const openTutorial = (tutorialId) => {
        const button = document.querySelector(`[data-tutorial="${tutorialId}"]`);
        const submenu = document.getElementById(tutorialId);

        if (button && submenu) {
            submenu.classList.add('show');
            button.classList.add('active');
        }
    };

    // Toggle de um tutorial específico
    const handleTutorialToggle = (e) => {
        e.preventDefault();
        const tutorialId = e.currentTarget.getAttribute('data-tutorial');
        const submenu = document.getElementById(tutorialId);
        const isAlreadyOpen = submenu.classList.contains('show');

        if (isAlreadyOpen) {
            closeAllTutorials();
        } else {
            closeAllTutorials();
            openTutorial(tutorialId);
        }
    };

    // Comportamento ao clicar em um link do menu
    const handleMenuLink = (e) => {
        e.preventDefault();

        const href = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(href);

        // Em telas pequenas, fechar o menu
        if (window.innerWidth <= 768) {
            sideMenu.classList.add('collapsed');
            menuToggle.classList.remove('active');
        }

        // Garantir que o tutorial pai está aberto
        const submenu = e.currentTarget.closest('.tutorial-submenu');
        if (submenu && !submenu.classList.contains('show')) {
            const tutId = submenu.id;
            closeAllTutorials();
            openTutorial(tutId);
        }

        // Scroll para a seção
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Fechar menu ao clicar fora em telas pequenas
    const handleClickOutside = (event) => {
        const isClickInsideMenu = sideMenu.contains(event.target);
        const isClickOnToggle = menuToggle && menuToggle.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggle && window.innerWidth <= 768) {
            sideMenu.classList.add('collapsed');
            menuToggle && menuToggle.classList.remove('active');
        }
    };

    // Responsividade ao redimensionar
    const handleResize = () => {
        if (window.innerWidth > 768) {
            sideMenu.classList.remove('collapsed');
            menuToggle && menuToggle.classList.remove('active');
            sideMenu.classList.remove('compressed');
        }
    };

    return {
        init
    };
})();
