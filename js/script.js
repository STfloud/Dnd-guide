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

// Плавная прокрутка по якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Бросок d20
const rollBtn = document.getElementById('roll-btn');
const result = document.getElementById('result');

rollBtn.addEventListener('click', () => {
  result.style.transition = 'none';
  result.textContent = 'Кручу...';
  rollBtn.disabled = true;

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

    if (roll >= 15) result.style.color = '#4ade80';
    else if (roll <= 5) result.style.color = '#f87171';
    else result.style.color = '#D4A017';

    result.textContent = roll;
    rollBtn.disabled = false;
  }, 1200);
});

// ===================== ТЕСТ НА КЛАСС =====================
const questions = [
    {
        question: "Что тебе больше всего нравится делать в бою?",
        answers: [
            { text: "Рубиться в ближнем бою и защищать друзей", class: "Воин" },
            { text: "Бросать мощные заклинания и взрывы", class: "Волшебник" },
            { text: "Быть незаметным и наносить удары из тени", class: "Плут" },
            { text: "Входить в ярость и крушить всё вокруг", class: "Варвар" },
            { text: "Лечить союзников и поддерживать их", class: "Жрец" },
            { text: "Бить врагов на расстоянии луком или арбалетом", class: "Охотник" }
        ]
    },
    {
        question: "Какой стиль игры тебе ближе?",
        answers: [
            { text: "Быть в центре внимания и вдохновлять союзников", class: "Бард" },
            { text: "Превращаться в животных и управлять природой", class: "Друид" },
            { text: "Заключать сделки с могущественными силами", class: "Колдун" },
            { text: "Карать зло клятвой и божественной мощью", class: "Паладин" },
            { text: "Мастер боевых искусств и дисциплины", class: "Монах" },
            { text: "Исследовать мир и быть свободным", class: "Охотник" }
        ]
    },
    {
        question: "Как ты обычно решаешь проблемы?",
        answers: [
            { text: "Иду напролом и решаю всё силой", class: "Варвар" },
            { text: "Думаю и нахожу умное магическое решение", class: "Волшебник" },
            { text: "Договариваюсь и убеждаю людей", class: "Бард" },
            { text: "Действую быстро и неожиданно", class: "Плут" },
            { text: "Молюсь богам и ищу их поддержку", class: "Жрец" },
            { text: "Использую знания природы и животных", class: "Друид" }
        ]
    },
    {
        question: "Какой тип силы тебе ближе?",
        answers: [
            { text: "Физическая мощь и выносливость", class: "Воин" },
            { text: "Тайная магия и интеллект", class: "Волшебник" },
            { text: "Сделка с потусторонней сущностью", class: "Колдун" },
            { text: "Божественная сила и святость", class: "Паладин" },
            { text: "Внутренняя энергия и боевые искусства", class: "Монах" },
            { text: "Сила природы и превращения", class: "Друид" }
        ]
    },
    {
        question: "Какой цвет тебе нравится больше всего?",
        answers: [
            { text: "Красный / Оранжевый", class: "Варвар" },
            { text: "Синий / Фиолетовый", class: "Волшебник" },
            { text: "Зелёный", class: "Друид" },
            { text: "Золотой / Белый", class: "Паладин" },
            { text: "Чёрный / Тёмно-красный", class: "Плут" },
            { text: "Яркие цвета", class: "Бард" }
        ]
    },
    {
        question: "Что для тебя важнее в приключении?",
        answers: [
            { text: "Сражаться и побеждать сильных врагов", class: "Воин" },
            { text: "Открывать тайны и древнюю магию", class: "Колдун" },
            { text: "Помогать друзьям и спасать людей", class: "Жрец" },
            { text: "Исследовать мир и быть свободным", class: "Охотник" },
            { text: "Вдохновлять и развлекать всех вокруг", class: "Бард" },
            { text: "Дисциплина и самосовершенствование", class: "Монах" }
        ]
    }
];

let currentQuestion = 0;
let scores = {};

// Запуск теста после полной загрузки страницы
window.addEventListener('load', () => {
    console.log("Страница загружена, запускаем тест");

    const restart = document.getElementById('restart-btn');
    if (restart) {
        restart.addEventListener('click', startQuiz);
        console.log("Кнопка 'Пройти заново' привязана");
    } else {
        console.warn("Кнопка 'restart-btn' НЕ НАЙДЕНА — тест будет работать без неё");
    }

    startQuiz();
});

function startQuiz() {
    currentQuestion = 0;
    scores = {};

    const qc = document.getElementById('question-container');
    const rs = document.getElementById('result-screen');

    if (!qc || !rs) {
        console.error("Блок теста не найден в HTML!");
        return;
    }

    qc.style.display = 'block';
    rs.style.display = 'none';

    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];

    const qt = document.getElementById('question-text');
    const ans = document.getElementById('answers');
    const prog = document.getElementById('current-q');

    if (!qt || !ans || !prog) {
        console.error("Элементы вопроса не найдены!");
        return;
    }

    qt.textContent = q.question;
    prog.textContent = currentQuestion + 1;

    ans.innerHTML = '';

    q.answers.forEach(answer => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer.text;

        btn.addEventListener('click', () => {
            if (!scores[answer.class]) scores[answer.class] = 0;
            scores[answer.class]++;

            currentQuestion++;

            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        });

        ans.appendChild(btn);
    });
}

function showResult() {
    let maxScore = 0;
    let recommended = "Воин";

    Object.keys(scores).forEach(cls => {
        if (scores[cls] > maxScore) {
            maxScore = scores[cls];
            recommended = cls;
        }
    });

    const descriptions = {
        "Воин": "Ты — надёжный защитник и сильный боец. Ты всегда на передовой!",
        "Волшебник": "Ты любишь магию и интеллект. Ты — настоящий маг!",
        "Плут": "Ты хитрый и ловкий. Идеальный разведчик и мастер скрытности.",
        "Варвар": "Ты неудержимая сила! Ярость — твоё главное оружие.",
        "Жрец": "Ты добрый и заботливый. Ты всегда помогаешь друзьям.",
        "Монах": "Ты мастер дисциплины и боевых искусств.",
        "Охотник": "Ты отличный стрелок и следопыт. Природа — твой дом.",
        "Друид": "Ты чувствуешь связь с природой и животными.",
        "Колдун": "Ты заключил сделку с могущественной силой.",
        "Паладин": "Ты — святой воин, полный чести и света.",
        "Бард": "Ты душа компании! Твоё слово — твоя сила."
    };

    const rc = document.getElementById('recommended-class');
    const rd = document.getElementById('result-description');

    if (rc && rd) {
        rc.textContent = recommended;
        rd.textContent = descriptions[recommended] || "Ты отличный авантюрист!";
    }

    document.getElementById('question-container').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
}

// Запуск после полной загрузки
window.addEventListener('load', () => {
  console.log("Страница загружена, запускаем тест");

  const restart = document.getElementById('restart-btn');
  if (restart) {
    restart.addEventListener('click', startQuiz);
    console.log("Кнопка перезапуска привязана");
  } else {
    console.warn("Кнопка перезапуска не найдена");
  }

  startQuiz();
});