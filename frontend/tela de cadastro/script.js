document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (password.value !== confirmPassword.value) {
            alert('As senhas não coincidem!');
            return;
        }

        // Simulate registration
        // alert('Cadastro realizado com sucesso!');
        // Redirect to success page
        window.location.href = '../tela de login/index.html';
    });

    // Add some animation on input focus
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});</content>
<parameter name="filePath">/home/lewis/projetos VScode/treinos/TREINO TRIVIO (1)/frontend/tela de cadastro/script.js