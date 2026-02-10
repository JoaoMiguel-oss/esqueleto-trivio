/**
 * Configurações - Módulo de Funcionalidade da Página de Configurações
 * Gerencia a navegação por abas e alternância de conteúdo
 */

// Variável para controlar a aba ativa
let activeTab = 'perfil';

/**
 * Inicializa os event listeners quando o DOM está pronto
 */
function initializeSettingsTabs() {
    // Define a primeira aba como ativa por padrão
    const firstTabButton = document.querySelector('.settings-nav-item');
    if (firstTabButton) {
        firstTabButton.classList.add('settings-nav-active');
    }
    
    // Exibe o conteúdo da aba inicial
    showTabContent('perfil');
}

/**
 * Carrega uma aba de configuração específica
 * @param {string} tabId - ID da aba a ser carregada
 * @param {HTMLElement} button - Botão que foi clicado
 */
function loadSettingsTab(tabId, button) {
    // Remove a classe active de todos os botões
    const allButtons = document.querySelectorAll('.settings-nav-item');
    allButtons.forEach(btn => {
        btn.classList.remove('settings-nav-active');
        btn.style.backgroundColor = '';
    });
    
    // Adiciona a classe active ao botão clicado
    button.classList.add('settings-nav-active');
    button.style.backgroundColor = 'var(--color-primary)';
    
    // Atualiza a variável de aba ativa
    activeTab = tabId;
    
    // Exibe o conteúdo da aba selecionada
    showTabContent(tabId);
}

/**
 * Exibe o conteúdo da aba especificada e esconde os outros
 * @param {string} tabId - ID da aba a ser exibida
 */
function showTabContent(tabId) {
    // Esconde todos os conteúdos de abas
    const allTabContents = document.querySelectorAll('.settings-tab-content');
    allTabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Exibe o conteúdo da aba selecionada
    const selectedContent = document.getElementById('tab-' + tabId);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
}

/**
 * Alterna a visibilidade da sidebar (mobile)
 */
function toggleSettingsSidebar() {
    const sidebar = document.getElementById('settings-sidebar');
    const overlay = document.getElementById('settings-overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('mobile-open');
        overlay.classList.toggle('active');
        
        // Impede scroll do body quando sidebar está aberta
        document.body.style.overflow = sidebar.classList.contains('mobile-open') ? 'hidden' : '';
    }
}

/**
 * Salva as configurações do formulário ativo
 * @param {string} tabId - ID da aba atual
 */
function saveSettings(tabId) {
    const saveButton = document.querySelector(`#tab-${tabId} .btn-save`);
    if (saveButton) {
        saveButton.textContent = 'Salvando...';
        saveButton.disabled = true;
        
        // Simula salvamento
        setTimeout(() => {
            saveButton.textContent = 'Salvo!';
            saveButton.disabled = false;
            
            // Retorna ao texto original após 2 segundos
            setTimeout(() => {
                saveButton.textContent = 'Salvar alterações';
            }, 2000);
        }, 1000);
    } else {
        // Feedback geral
        alert('Configurações salvas com sucesso!');
    }
}

// Exporta funções para uso global
window.loadSettingsTab = loadSettingsTab;
window.toggleSettingsSidebar = toggleSettingsSidebar;
window.saveSettings = saveSettings;
