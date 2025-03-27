document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.querySelector('input[name="remember"]').checked;
        
        // Buscar usuários do localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Encontrar usuário com email e senha correspondentes
        const user = users.find(u => 
            u.email === email && 
            u.password === btoa(password) // Comparar com senha criptografada
        );
        
        if (user) {
            // Criar sessão do usuário
            const session = {
                name: user.name,
                username: user.username,
                email: user.email,
                isLoggedIn: true
            };
            
            // Salvar sessão
            localStorage.setItem('currentUser', JSON.stringify(session));
            
            // Salvar dados se "Lembrar-me" estiver marcado
            if (remember) {
                localStorage.setItem('userEmail', email);
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('userEmail');
                localStorage.removeItem('rememberMe');
            }
            
            // Redirecionar para a página principal
            window.location.href = 'index.html';
        } else {
            alert('Email ou senha incorretos!');
        }
    });
    
    // Verificar se há dados salvos para "Lembrar-me"
    const savedEmail = localStorage.getItem('userEmail');
    const rememberMe = localStorage.getItem('rememberMe');
    
    if (savedEmail && rememberMe === 'true') {
        document.getElementById('email').value = savedEmail;
        document.querySelector('input[name="remember"]').checked = true;
    }
}); 