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

// ===================== БРОСОК КУБИКОВ =====================
document.addEventListener('DOMContentLoaded', () => {
  const rollBtn = document.getElementById('roll-btn');
  const resultDisplay = document.getElementById('result');         // основной элемент результата
  const diceTypeSelect = document.getElementById('dice-type');     // селект с типом кубика
  const diceAnim = document.getElementById('dice-animation');      // анимируемый кубик
  const resultValue = document.getElementById('result-value');     // текст результата

  if (!rollBtn || !resultDisplay) {
    console.warn("Не найдены основные элементы броска кубика");
    return;
  }

  rollBtn.addEventListener('click', () => {
    // Блокируем кнопку на время анимации
    rollBtn.disabled = true;

    // Сбрасываем стили и текст
    resultDisplay.style.transition = 'none';
    resultDisplay.style.transform = 'rotate(0) scale(1)';
    resultDisplay.style.color = '#D4A017';
    resultDisplay.textContent = 'Кручу...';

    if (diceAnim) diceAnim.textContent = '…';

    // Запускаем вращение
    let angle = 0;
    const spinInterval = setInterval(() => {
      angle += 60;
      resultDisplay.style.transform = `rotate(${angle}deg) scale(1.25)`;
    }, 80);

    // Через 1.2 секунды показываем результат
    setTimeout(() => {
      clearInterval(spinInterval);

      const selectedType = diceTypeSelect?.value || 'd20';
      const sides = parseInt(selectedType.replace('d', '')) || 20;
      const roll = Math.floor(Math.random() * sides) + 1;

      // Цвет результата
      let color = '#D4A017';
      if (roll >= sides * 0.75) color = '#4ade80';     // круто
      else if (roll <= sides * 0.25) color = '#f87171'; // плохо

      resultDisplay.style.transition = 'transform 0.5s ease-out, color 0.4s';
      resultDisplay.style.transform = 'rotate(0) scale(1)';
      resultDisplay.style.color = color;
      resultDisplay.textContent = `${selectedType}: ${roll}`;

      // Если есть анимируемый кубик показываем число там
      if (diceAnim) {
        diceAnim.textContent = roll;
        diceAnim.style.background = color;
      }

      // Если есть отдельный текст результата
      if (resultValue) {
        resultValue.textContent = roll;
        resultValue.style.color = color;
      }

      rollBtn.disabled = false;
    }, 1200);
  });
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
            { text: "Бить врагов на расстоянии луком или арбалетом", class: "Следопыт" }
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
            { text: "Исследовать мир и быть свободным", class: "Следопыт" }
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
            { text: "Исследовать мир и быть свободным", class: "Следопыт" },
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
        console.warn("Кнопка 'restart-btn' НЕ НАЙДЕНА - тест будет работать без неё");
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
        "Воин": "Ты надёжный защитник и сильный боец. Ты всегда на передовой!",
        "Волшебник": "Ты любишь магию и интеллект. Ты настоящий маг!",
        "Плут": "Ты хитрый и ловкий. Идеальный разведчик и мастер скрытности.",
        "Варвар": "Ты неудержимая сила! Ярость твоё главное оружие.",
        "Жрец": "Ты добрый и заботливый. Ты всегда помогаешь друзьям.",
        "Монах": "Ты мастер дисциплины и боевых искусств.",
        "Следопыт": "Ты отличный стрелок и следопыт. Природа твой дом.",
        "Друид": "Ты чувствуешь связь с природой и животными.",
        "Колдун": "Ты заключил сделку с могущественной силой.",
        "Паладин": "Ты святой воин, полный чести и света.",
        "Бард": "Ты душа компании! Твоё слово твоя сила."
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

// ===================== МОДАЛЬНОЕ ОКНО =====================

// Подробная информация
const cardDetails = {
  // ================== КЛАССЫ ==================
  "Воин": {
    title: "Воин",
    body: "<p>Воин - классический боец ближнего боя. Самый простой и надёжный класс для новичков.</p><ul><li>Много хитов и высокий урон в ближнем бою</li><li>Носит тяжёлые доспехи и щиты</li><li>Умеет использовать любое оружие</li><li>Подклассы: Чемпион (просто и сильно), Мастер битвы (тактические манёвры), Мистический рыцарь (немного магии)</li><li>Идеален, если хочешь быть танком или дамагером</li></ul>"
  },
  "Волшебник": {
    title: "Волшебник",
    body: "<p>Волшебник - мастер тайной магии. Самый «магический» класс с огромным выбором заклинаний.</p><ul><li>Может бросать Огненный шар, Телепортацию, Полиморф и т.д.</li><li>Самый большой список заклинаний в игре</li><li>Хрупкий - мало хитов и слабые доспехи</li><li>Подклассы: Школа эвокации (урон), Школа иллюзий, Школа некромантии и др.</li><li>Для тех, кто любит стратегию и мощные эффекты</li></ul>"
  },
  "Плут": {
    title: "Плут",
    body: "<p>Плут - мастер скрытности, ловкости и ударов в спину. Идеален для разведки и воровства.</p><ul><li>Скрытная атака - огромный дополнительный урон</li><li>Отлично взламывает замки, обманывает, прячется</li><li>Подклассы: Убийца (смертельные удары), Вор (ловкость рук), Мистический трюкач (немного магии)</li><li>Для тех, кто любит хитрить и играть умом</li></ul>"
  },
  "Варвар": {
    title: "Варвар",
    body: "<p>Варвар - воплощение ярости и физической мощи. Не носит доспехи - зато очень живучий.</p><ul><li>Ярость - даёт сопротивление урону и бонус к урону</li><li>Огромное количество хитов</li><li>Подклассы: Берсерк (ещё больше ярости), Тотемный воин (духи животных)</li><li>Для тех, кто хочет крушить всё и всех</li></ul>"
  },
  "Жрец": {
    title: "Жрец",
    body: "<p>Жрец - служитель богов. Лечит, поддерживает и карает врагов божественной силой.</p><ul><li>Много заклинаний лечения и защиты</li><li>Может носить средние доспехи и щиты</li><li>Подклассы: Домены Жизни, Света, Войны и др.</li><li>Идеален для поддержки группы</li></ul>"
  },
  "Монах": {
    title: "Монах",
    body: "<p>Монах - мастер боевых искусств и внутренней энергии (ци). Бьёт руками и ногами.</p><ul><li>Много быстрых атак без оружия</li><li>Может бегать по стенам, уклоняться от стрел</li><li>Подклассы: Путь открытой руки, Путь тени</li><li>Для любителей кунг-фу и акробатики</li></ul>"
  },
  "Следопыт": {
    title: "Следопыт",
    body: "<p>Следопыт - мастер выживания, стрельбы и выслеживания. Лучший в дикой природе.</p><ul><li>Отличный стрелок из лука или арбалета</li><li>Любимый враг + любимая местность</li><li>Подклассы: Охотник, Повелитель зверей</li><li>Для тех, кто любит природу и разведку</li></ul>"
  },
  "Друид": {
    title: "Друид",
    body: "<p>Друид - повелитель природы. Превращается в животных и управляет силами стихий.</p><ul><li>Дикая форма - превращение в медведя, волка и т.д.</li><li>Заклинания природы и исцеления</li><li>Подклассы: Круг Луны (мощные превращения), Круг Земли</li><li>Для любителей животных и магии природы</li></ul>"
  },
  "Колдун": {
    title: "Колдун",
    body: "<p>Колдун получает силу от сделки с могущественным существом (демон, фея, древний дракон).</p><ul><li>Мало заклинаний, но их можно часто использовать</li><li>Элдрич бласт - мощный луч</li><li>Подклассы: Архимаг, Великий Древний, Фея</li><li>Для тех, кто любит тёмную магию и сделки</li></ul>"
  },
  "Паладин": {
    title: "Паладин",
    body: "<p>Паладин - святой воин. Карает зло клятвой и божественной силой.</p><ul><li>Накладывает ауры защиты и урона</li><li>Божественный удар - дополнительный урон</li><li>Подклассы: Клятва преданности, Клятва мести</li><li>Для тех, кто хочет быть героем и рыцарем</li></ul>"
  },
  "Бард": {
    title: "Бард",
    body: "<p>Бард - душа компании. Вдохновляет союзников, обезоруживает врагов песнями и магией.</p><ul><li>Бардское вдохновение - даёт бонус союзникам</li><li>Много навыков убеждения и обмана</li><li>Подклассы: Колледж знаний, Колледж доблести</li><li>Для тех, кто любит ролевую игру и поддержку</li></ul>"
  },

  // ================== РАСЫ ==================
  "Человек": {
    title: "Человек",
    body: "<p>Самая универсальная раса. Подходит для любого класса.</p><ul><li>+1 ко всем характеристикам или +1 к двум + навык и черта</li><li>Дополнительный навык и черта</li><li>Может быть кем угодно</li></ul>"
  },
  "Эльф": {
    title: "Эльф",
    body: "<p>Долгожитель с острым зрением и грацией.</p><ul><li>Тёмное зрение</li><li>Преимущество против очарования</li><li>Не спит - медитирует</li><li>Подрасы: Высший эльф (магия), Лесной эльф (скрытность)</li></ul>"
  },
  "Дварф": {
    title: "Дварф",
    body: "<p>Крепкий, выносливый, любит подземелья и пиво.</p><ul><li>Сопротивление яду</li><li>Тёмное зрение</li><li>Подрасы: Горный дварф (сила), Холмовой дварф (мудрость)</li></ul>"
  },
  "Полурослик": {
    title: "Полурослик",
    body: "<p>Маленький, ловкий и очень удачливый.</p><ul><li>Удачливый - перебрасывает 1 на d20</li><li>Храбрый - преимущество против страха</li><li>Подрасы: Легконогий (скрытность), Кряжистый (сила)</li></ul>"
  },
  "Гном": {
    title: "Гном",
    body: "<p>Маленький изобретатель и любитель магии.</p><ul><li>Преимущество против магии</li><li>Тёмное зрение</li><li>Подрасы: Лесной гном (иллюзии), Скальный гном (техника)</li></ul>"
  },
  "Тифлинг": {
    title: "Тифлинг",
    body: "<p>С демонической/дьявольской кровью. Харизматичный и загадочный.</p><ul><li>Сопротивление огню</li><li>Тёмное зрение</li><li>Врождённые заклинания (Адское наследие)</li></ul>"
  },
  "Плазмоид": {
    title: "Плазмоид",
    body: "<p>Плазмоид - живое разумное желе/слизь/плазма. Полностью аморфное существо, которое может менять форму тела по своему желанию.</p><ul><li>Может просачиваться сквозь решётки и узкие щели</li><li>Руки превращаются в щупальца, копья или что угодно</li><li>Не нуждается в воздухе, может «дышать» через любую часть тела</li><li>Не боится удушья и может изменять размер</li><li>Идеален для скрытного прохода и творческого боя</li></ul>"
  },
  "Драконорождённый": {
    title: "Драконорождённый",
    body: "<p>Гордый гуманоид с драконьей кровью. Имеет чешую, рога, хвост и мощное дыхательное оружие, унаследованное от предка-дракона.</p><ul><li>Дыхание: огонь, кислота, молния, холод или яд (в зависимости от цвета)</li><li>Естественное сопротивление урону своего типа</li><li>Чешуя даёт +1 к Классу Доспеха без доспехов</li><li>Выглядит устрашающе - преимущество на запугивание</li><li>Для тех, кто хочет быть мощным и харизматичным ящером</li></ul>"
  },
  "Табакси": {
    title: "Табакси",
    body: "<p>Кошачьи гуманоиды. Ловкие, любопытные и быстрые.</p><ul><li>Кошачья ловкость - удвоение скорости лазания</li><li>Тёмное зрение</li><li>Когти как оружие</li></ul>"
  },
  "Аасимар": {
    title: "Аасимар",
    body: "<p>Небесное происхождение. Свет и исцеление.</p><ul><li>Сопротивление некротическому урону</li><li>Сияние - дополнительный урон</li><li>Тёмное зрение</li></ul>"
  },
  "Дженази": {
    title: "Дженази",
    body: "<p>Элементальное происхождение. Стихия в крови.</p><ul><li>Сопротивление выбранной стихие</li><li>Заклинания элементов</li><li>Тёмное зрение</li></ul>"
  },

  // ================== МЕХАНИКИ ==================
  "d20": {
    title: "d20 - основной кубик",
    body: "<p>Самый важный кубик в игре. Решает почти все действия.</p><ul><li>Бросок d20 + модификатор характеристики + бонусы</li><li>20 - критический успех (часто двойной урон)</li><li>1 - критический провал (часто провал даже при бонусах)</li></ul>"
  },
  "Проверки характеристик": {
    title: "Проверки характеристик",
    body: "<p>Основной способ проверить, получается ли действие.</p><ul><li>Сила - поднять тяжести, сломать дверь</li><li>Ловкость - спрятаться, акробатика</li><li>Телосложение - выдержать яд</li><li>Интеллект - вспомнить знания</li><li>Мудрость - заметить скрытое</li><li>Харизма - убедить, запугать</li></ul>"
  },
  "Класс Доспеха (КД)": {
    title: "Класс Доспеха (КД)",
    body: "<p>Показатель защиты персонажа. Чем выше КД - тем сложнее попасть по тебе.</p><ul><li>Обычно 10 + модификатор Ловкости + доспехи</li><li>Атака должна быть ≥ КД, чтобы попасть</li><li>Щит +2 к КД</li></ul>"
  },
  "Хиты (HP)": {
    title: "Хиты (HP)",
    body: "<p>Твоё здоровье. Когда хиты падают до 0 - ты теряешь сознание.</p><ul><li>Максимум хитов = кубик класса + модификатор Телосложения</li><li>На высоких уровнях - много хитов</li><li>Смерть - если не стабилизироваться в 3 раунда</li></ul>"
  },
  "Спасброски": {
    title: "Спасброски",
    body: "<p>Броски на защиту от опасностей (яд, огонь, магия и т.д.).</p><ul><li>d20 + модификатор характеристики + бонус мастерства (если есть)</li><li>Провал - получаешь полный эффект</li><li>Успех - половина урона или ничего</li></ul>"
  }
};

// Открытие модалки
document.addEventListener('click', function(e) {
  const card = e.target.closest('.card');
  if (!card) return;

  const titleEl = card.querySelector('h3');
  if (!titleEl) return;

  const title = titleEl.textContent.trim();

  if (cardDetails[title]) {
    document.getElementById('modal-title').textContent = cardDetails[title].title;
    document.getElementById('modal-body').innerHTML = cardDetails[title].body;
    document.getElementById('modal').classList.add('active');
  }
});

// Закрытие модалки
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-close') || e.target.id === 'modal') {
    document.getElementById('modal').classList.remove('active');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('modal').classList.remove('active');
  }
});

// ===================== БРОСОК КУБИКОВ =====================
document.addEventListener('DOMContentLoaded', () => {
  const rollBtn = document.getElementById('roll-btn');
  const diceType = document.getElementById('dice-type');
  const diceAnim = document.getElementById('dice-animation');

  if (!rollBtn || !diceAnim) {
    console.error("Не найдены элементы броска кубика");
    return;
  }

  // Показываем кубик сразу
  diceAnim.style.display = 'flex';

  rollBtn.addEventListener('click', () => {
    rollBtn.disabled = true;

    // Сброс
    diceAnim.textContent = '?';
    diceAnim.style.background = '#D4A017';
    diceAnim.style.transform = 'rotate(0deg) scale(1)';
    diceAnim.style.animation = 'none';
    void diceAnim.offsetWidth; // сброс анимации

    let angle = 0;
    const spin = setInterval(() => {
      angle += 60;
      diceAnim.style.transform = `rotate(${angle}deg) scale(1.15)`;
    }, 70);

    setTimeout(() => {
      clearInterval(spin);

      const type = diceType?.value || 'd20';
      const max = parseInt(type.slice(1)) || 20;
      const roll = Math.floor(Math.random() * max) + 1;

      let color = '#D4A017';
      if (roll >= max * 0.75) color = '#4ade80';
      else if (roll <= max * 0.25) color = '#f87171';

      diceAnim.style.transition = 'transform 0.5s ease-out, background 0.4s';
      diceAnim.style.transform = 'rotate(0deg) scale(1)';
      diceAnim.style.background = color;
      diceAnim.textContent = roll;

      rollBtn.disabled = false;
    }, 1100);
  });
});