function createStars() {
    const space = document.getElementById('space');
    const numberOfStars = 200;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        space.appendChild(star);
    }
}

// Inicializa as estrelas quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', createStars); 