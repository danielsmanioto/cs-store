document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            window.location.href = 'produtos.html';
            localStorage.setItem('token', data.token);
        } else {
            alert('Usuário ou senha inválidos.')
            throw new Error('Usuário ou senha inválidos.');
        }
    } catch (error) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
    }
});
