// Script for Configurações page
document.addEventListener('DOMContentLoaded', function() {
    // Add any interactions here if needed
    const saveButton = document.querySelector('button.bg-blue-800');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            alert('Configurações salvas com sucesso!');
        });
    }
});