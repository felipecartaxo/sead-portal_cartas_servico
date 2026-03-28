// Controla o comportamento do menu lateral
const SidebarModule = (() => {
    const getMenuToggle = () => document.getElementById('menuToggle');
    const getSideMenu = () => document.getElementById('sideMenu');
    let hoverCloseTimeout = null;

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

        normalizeLinks();
        initTutorialToggles();

        // Mantém o menu oculto inicialmente em todas as telas
        if (sideMenu) {
            UtilsModule.addClass(sideMenu, 'collapsed');
        }

        if (menuToggle) {
            UtilsModule.removeClass(menuToggle, 'active');
        }

        // Menu toggle para mobile
        if (menuToggle) {
            menuToggle.addEventListener('mouseenter', handleMenuToggleHoverEnter);
            menuToggle.addEventListener('mouseleave', handleHoverLeave);
        }

        if (sideMenu) {
            sideMenu.addEventListener('mouseenter', handleMenuHoverEnter);
            sideMenu.addEventListener('mouseleave', handleHoverLeave);
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

    // Inicializa o comportamento de expandir/colapsar os submenus
    const initTutorialToggles = () => {
        const sideMenu = getSideMenu();
        if (!sideMenu) return;

        const tutorialTitles = sideMenu.querySelectorAll('.tutorial-section .tutorial-title:not(.home-link)');

        tutorialTitles.forEach(title => {
            title.classList.remove('active');

            title.addEventListener('click', () => {
                const submenu = title.nextElementSibling;
                if (!submenu || !submenu.classList.contains('tutorial-submenu')) return;

                submenu.classList.toggle('show');
                title.classList.toggle('active');
            });
        });
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

    const clearHoverTimeout = () => {
        if (hoverCloseTimeout) {
            clearTimeout(hoverCloseTimeout);
            hoverCloseTimeout = null;
        }
    };

    const handleMenuToggleHoverEnter = () => {
        clearHoverTimeout();
        openMobileMenu();
    };

    const handleMenuHoverEnter = () => {
        clearHoverTimeout();
    };

    const handleHoverLeave = () => {
        clearHoverTimeout();
        hoverCloseTimeout = setTimeout(() => {
            closeMobileMenu();
        }, 120);
    };

    // Fecha o menu em telas pequenas
    const closeMobileMenu = () => {
        const menuToggle = getMenuToggle();
        const sideMenu = getSideMenu();
        if (!sideMenu) return;

        UtilsModule.addClass(sideMenu, 'collapsed');
        menuToggle && UtilsModule.removeClass(menuToggle, 'active');
    };

    // Abre o menu em telas pequenas
    const openMobileMenu = () => {
        const menuToggle = getMenuToggle();
        const sideMenu = getSideMenu();
        if (!sideMenu) return;

        UtilsModule.removeClass(sideMenu, 'collapsed');
        menuToggle && UtilsModule.addClass(menuToggle, 'active');
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

        if (!isClickInsideMenu && !isClickOnToggle && !UtilsModule.hasClass(sideMenu, 'collapsed')) {
            closeMobileMenu();
        }
    };

    // Responsividade ao redimensionar
    const handleResize = () => {
        const menuToggle = getMenuToggle();
        const sideMenu = getSideMenu();
        if (!sideMenu) return;

        if (UtilsModule.isDesktop()) {
            return;
        }
    };

    return {
        init,
        toggleMobileMenu,
        closeMobileMenu,
        openMobileMenu
    };
})();
