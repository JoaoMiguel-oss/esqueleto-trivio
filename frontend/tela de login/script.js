document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Simulate login validation (in a real app, check credentials)
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            // Simulate successful login
            // alert('Login realizado com sucesso!');
            // Redirect to success page
            window.location.href = '../login realizado/index.html';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
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
});