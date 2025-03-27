function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const loginLink = document.querySelector('.login-link');
    
    if (currentUser && currentUser.isLoggedIn) {
        // Criar menu dropdown para usuário logado
        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu';
        userMenu.innerHTML = `
            <div class="user-menu-trigger">
                <svg class="user-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>${currentUser.name}</span>
                <div class="user-menu-dropdown">
                    <a href="#" class="profile-link">Meu Perfil</a>
                    <a href="#" class="settings-link">Configurações</a>
                    <a href="#" class="logout-link">Sair</a>
                </div>
            </div>
        `;
        
        // Substituir link de login pelo menu do usuário
        loginLink.parentNode.replaceChild(userMenu, loginLink);
        
        // Adicionar eventos aos links do menu
        const logoutLink = userMenu.querySelector('.logout-link');
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.reload();
        });
    } else {
        // Mostrar link de login para usuário não logado
        if (!loginLink) {
            const navMenu = document.querySelector('.nav-menu');
            const newLoginLink = document.createElement('a');
            newLoginLink.href = 'login.html';
            newLoginLink.className = 'login-link';
            newLoginLink.textContent = 'Login';
            navMenu.appendChild(newLoginLink);
        }
    }
}

// Adicionar estilos para o menu do usuário
const style = document.createElement('style');
style.textContent = `
    .user-menu {
        position: relative;
    }
    
    .user-menu-trigger {
        cursor: pointer;
        padding: 0.5rem 1rem;
        color: white;
        display: flex;
        align-items: center;
        gap: 0.8rem;
    }
    
    .user-icon {
        opacity: 0.8;
        transition: all 0.3s ease;
    }
    
    .user-menu-trigger:hover .user-icon {
        opacity: 1;
        transform: scale(1.1);
    }
    
    .user-menu-trigger span {
        border-bottom: 2px solid rgba(255, 255, 255, 0.5);
        padding-bottom: 2px;
        transition: all 0.3s ease;
    }
    
    .user-menu-trigger:hover span {
        border-bottom-color: white;
    }
    
    .user-menu-trigger:hover {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
    }
    
    .user-menu-dropdown {
        display: none;
        position: absolute;
        top: 100%;
        right: 0;
        background: rgba(0, 0, 0, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        padding: 0.5rem;
        min-width: 150px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
    
    .user-menu:hover .user-menu-dropdown {
        display: block;
    }
    
    .user-menu-dropdown a {
        display: block;
        padding: 0.5rem 1rem;
        color: white;
        text-decoration: none;
        transition: all 0.3s ease;
    }
    
    .user-menu-dropdown a:hover {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
    }
    
    .logout-link {
        color: #ff6b6b !important;
    }
    
    .logout-link:hover {
        background: rgba(255, 107, 107, 0.1) !important;
    }
`;
document.head.appendChild(style);

// Executar quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', updateAuthUI); 