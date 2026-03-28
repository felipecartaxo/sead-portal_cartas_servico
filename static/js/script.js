/**
 * Script de controle do menu lateral colapsível
 * 
 * Funcionalidade de toggle com subitens de tutoriais
 */

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
    const tutorialTitles = document.querySelectorAll('.tutorial-title');
    const menuLinks = sideMenu.querySelectorAll('.tutorial-submenu a');

    // ========== Toggle do menu principal (mobile) ==========
    menuToggle.addEventListener('click', function() {
        sideMenu.classList.toggle('collapsed');
        menuToggle.classList.toggle('active');
    });

    // ========== Toggle de comprimir/expandir menu (desktop) ==========
    sidebarCollapseBtn.addEventListener('click', function() {
        sideMenu.classList.toggle('compressed');
    });

    // ========== Função para fechar todos os submenus ==========
    function closeAllTutorials() {
        tutorialTitles.forEach(btn => {
            const tutId = btn.getAttribute('data-tutorial');
            const submenu = document.getElementById(tutId);
            submenu.classList.remove('show');
            btn.classList.remove('active');
        });
    }

    // ========== Função para abrir um tutorial específico ==========
    function openTutorial(tutorialId) {
        const button = document.querySelector(`[data-tutorial="${tutorialId}"]`);
        const submenu = document.getElementById(tutorialId);
        
        if (button && submenu) {
            submenu.classList.add('show');
            button.classList.add('active');
        }
    }

    // ========== Toggle dos subitens ==========
    tutorialTitles.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tutorialId = this.getAttribute('data-tutorial');
            const submenu = document.getElementById(tutorialId);
            const isAlreadyOpen = submenu.classList.contains('show');

            if (isAlreadyOpen) {
                // Se já está aberto, fechar
                closeAllTutorials();
            } else {
                // Se não está aberto, fechar todos e abrir este
                closeAllTutorials();
                openTutorial(tutorialId);
            }
        });
    });

    // ========== Comportamento dos links ==========
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            const targetElement = document.querySelector(href);
            
            // Em telas pequenas, fechar o menu após clicar
            if (window.innerWidth <= 768) {
                sideMenu.classList.add('collapsed');
                menuToggle.classList.remove('active');
            }

            // Garantir que o tutorial pai está aberto
            const submenu = this.closest('.tutorial-submenu');
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
        });
    });

    // ========== Fechar o menu ao clicar fora ==========
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = sideMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggle && window.innerWidth <= 768) {
            sideMenu.classList.add('collapsed');
            menuToggle.classList.remove('active');
        }
    });

    // ========== Responsividade ao redimensionar ==========
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Em desktop, abrir o menu
            sideMenu.classList.remove('collapsed');
            menuToggle.classList.remove('active');
            // Remover o estado compressed ao voltar para desktop
            sideMenu.classList.remove('compressed');
        }
    });

    // ========== Inicializar: abrir primeiro tutorial ==========
    openTutorial('tutorial1');
});
