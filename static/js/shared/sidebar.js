// Controla o comportamento do menu lateral
const SidebarModule = (() => {
    const getMenuToggle = () => document.getElementById('menuToggle');
    const getSideMenu = () => document.getElementById('sideMenu');
    const getSidebarCollapseBtn = () => document.getElementById('sidebarCollapseBtn');

    // Ajusta os links do sidebar conforme a página atual
    const normalizeLinks = () => {
        const sideMenu = getSideMenu();
        if (!sideMenu) return;

        const normalizedPath = window.location.pathname.replace(/\\/g, '/');
        const isTutorialPage = normalizedPath.includes('/html/tutoriais/');
        const isHtmlIndexPage = normalizedPath.endsWith('/html/index.html');
        const tutorialPrefix = isTutorialPage ? '' : (isHtmlIndexPage ? 'tutoriais/' : 'html/tutoriais/');

        const routeLinks = sideMenu.querySelectorAll('.route-link');
        routeLinks.forEach(link => {
            const route = link.getAttribute('data-route');
            if (route) {
                link.setAttribute('href', `${tutorialPrefix}${route}`);
            }
        });

        const homeLink = sideMenu.querySelector('.home-link');
        if (homeLink) {
            const homeHref = isTutorialPage ? '../../index.html' : (isHtmlIndexPage ? '../index.html' : 'index.html');
            homeLink.setAttribute('href', homeHref);
        }
    };

    // Inicializa os listeners do sidebar
    const init = () => {
        const menuToggle = getMenuToggle();
        const sideMenu = getSideMenu();
        const sidebarCollapseBtn = getSidebarCollapseBtn();

        normalizeLinks();

        // Menu toggle para mobile
        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMobileMenu);
        }

        // Botão de compressão para desktop
        if (sidebarCollapseBtn) {
            sidebarCollapseBtn.addEventListener('click', toggleCompressionMenu);
        }

        // Links do menu
        if (sideMenu) {
            const menuLinks = sideMenu.querySelectorAll('.menu-link');
            menuLinks.forEach(link => {
                link.addEventListener('click', handleMenuLink);
            });
        }

        // Fechar menu ao clicar fora
        document.addEventListener('click', handleClickOutside);

        // Responsividade
        window.addEventListener('resize', handleResize);

        UtilsModule.log('Sidebar initialized', 'info');
    };

    // Toggle do menu mobile (burger button)
    const toggleMobileMenu = () => {
        const menuToggle = getMenuToggle();
        const sideMenu = getSideMenu();
        if (!sideMenu) return;

        UtilsModule.toggleClass(sideMenu, 'collapsed');
        if (menuToggle) {
            UtilsModule.toggleClass(menuToggle, 'active');
        }
    };

    // Toggle de compressão do menu (desktop)
    const toggleCompressionMenu = () => {
        const sideMenu = getSideMenu();
        if (!sideMenu) return;

        UtilsModule.toggleClass(sideMenu, 'compressed');
    };

    // Fecha o menu em telas pequenas
    const closeMobileMenu = () => {
        const menuToggle = getMenuToggle();
        const sideMenu = getSideMenu();
        if (!sideMenu) return;

        if (UtilsModule.isMobile()) {
            UtilsModule.addClass(sideMenu, 'collapsed');
            menuToggle && UtilsModule.removeClass(menuToggle, 'active');
        }
    };

    // Abre o menu em telas pequenas
    const openMobileMenu = () => {
        const menuToggle = getMenuToggle();
        const sideMenu = getSideMenu();
        if (!sideMenu) return;

        if (UtilsModule.isMobile()) {
            UtilsModule.removeClass(sideMenu, 'collapsed');
            menuToggle && UtilsModule.addClass(menuToggle, 'active');
        }
    };

    // Comportamento ao clicar em um link do menu
    const handleMenuLink = (e) => {
        // Fechar menu após clique em telas pequenas
        if (UtilsModule.isMobile()) {
            closeMobileMenu();
        }
    };

    // Fechar menu ao clicar fora
    const handleClickOutside = (event) => {
        const menuToggle = getMenuToggle();
        const sideMenu = getSideMenu();
        if (!sideMenu || !menuToggle) return;

        const isClickInsideMenu = sideMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggle && UtilsModule.isMobile()) {
            closeMobileMenu();
        }
    };

    // Responsividade ao redimensionar
    const handleResize = () => {
        const menuToggle = getMenuToggle();
        const sideMenu = getSideMenu();
        if (!sideMenu) return;

        if (UtilsModule.isDesktop()) {
            // Limpar classes mobile em desktop
            UtilsModule.removeClass(sideMenu, 'collapsed');
            menuToggle && UtilsModule.removeClass(menuToggle, 'active');
        }
    };

    return {
        init,
        toggleMobileMenu,
        toggleCompressionMenu,
        closeMobileMenu,
        openMobileMenu
    };
})();
