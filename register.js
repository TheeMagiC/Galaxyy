document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validações
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        
        if (password.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres!');
            return;
        }
        
        // Verificar se o email já está cadastrado
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(user => user.email === email)) {
            alert('Este email já está cadastrado!');
            return;
        }
        
        // Verificar se o username já está em uso
        if (users.some(user => user.username === username)) {
            alert('Este nome de usuário já está em uso!');
            return;
        }
        
        // Criar novo usuário
        const newUser = {
            name,
            username,
            email,
            password: btoa(password), // Criptografia básica (não recomendada para produção)
            createdAt: new Date().toISOString()
        };
        
        // Adicionar usuário à lista
        users.push(newUser);
        
        // Salvar no localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Criar sessão do usuário
        const session = {
            name,
            username,
            email,
            isLoggedIn: true
        };
        localStorage.setItem('currentUser', JSON.stringify(session));
        
        // Redirecionar para a página principal
        window.location.href = 'index.html';
    });
}); 