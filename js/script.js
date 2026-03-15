// Меню
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
let isOpen = false;

hamburger.addEventListener('click', () => {
    isOpen = !isOpen;
    menu.classList.toggle('open');
    document.body.classList.toggle('menu-open');
});

document.querySelectorAll('.menu a').forEach(a => {
    a.addEventListener('click', () => {
        menu.classList.remove('open');
        document.body.classList.remove('menu-open');
        isOpen = false;
    });
});

// Плавная прокрутка (чтобы кнопка "Начать путь героя" работала нормально)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// УЛУЧШЕННЫЙ БРОСОК d20
const rollBtn = document.getElementById('roll-btn');
const result = document.getElementById('result');

rollBtn.addEventListener('click', () => {
    result.style.transition = 'none';
    result.textContent = 'Кручу...';
    rollBtn.disabled = true;

    // Анимация вращения + тряска
    let rotations = 0;
    const interval = setInterval(() => {
        rotations += 45;
        result.style.transform = `rotate(${rotations}deg) scale(1.3)`;
    }, 60);

    setTimeout(() => {
        clearInterval(interval);
        const roll = Math.floor(Math.random() * 20) + 1;
        
        result.style.transition = 'transform 0.6s, color 0.3s';
        result.style.transform = 'rotate(0) scale(1)';
        
        if (roll >= 15) result.style.color = '#4ade80';      // зелёный - хорошо
        else if (roll <= 5) result.style.color = '#f87171';  // красный - плохо
        else result.style.color = '#D4A017';
        
        result.textContent = roll;
        rollBtn.disabled = false;
    }, 1200);
});