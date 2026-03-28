/**
 * MAIN JS
 * 
 * Inicialização da aplicação
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar módulos
    MenuModule.init();

    // Log de inicialização
    UtilsModule.log('Portal de Tutoriais inicializado com sucesso!', 'success');
});

// Tratar erros globais
window.addEventListener('error', (event) => {
    UtilsModule.log(`Erro: ${event.message}`, 'error');
});
