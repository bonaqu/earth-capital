document.addEventListener('DOMContentLoaded', () => {
  // Скрытие прелоадера после полной загрузки страницы
  window.onload = function() {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = "0";
    setTimeout(() => { preloader.style.display = "none"; }, 500);
  };

  // Плавный скролл по якорным ссылкам
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Анимация секций через Intersection Observer
  const animatedSections = document.querySelectorAll('.animated-section');
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  animatedSections.forEach(section => {
    observer.observe(section);
  });

  // Переключатель темы (Dark Mode)
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? "☀️" : "🌙";
  });

  // Модальное окно для детальной информации по инициативе
  const modal = document.getElementById('initiative-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalImage = document.getElementById('modal-image');

  const detailButtons = document.querySelectorAll('.btn-details');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-initiative');
      const description = btn.getAttribute('data-description');
      modalTitle.textContent = title;
      modalDescription.textContent = description;
      // Используем ту же картинку, можно динамически менять по необходимости
      modalImage.src = "https://images.unsplash.com/photo-1581091012184-94a0bb97a5b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80";
      modal.classList.add('show');
    });
  });
  modalClose.addEventListener('click', () => { modal.classList.remove('show'); });
  window.addEventListener('click', (e) => {
    if(e.target == modal) modal.classList.remove('show');
  });

  // Функционал AJAX-вкладок
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContent = document.getElementById('tab-content');
  const contentData = {
    'cabinet': `
      <h3>Добро пожаловать, Искатель будущего!</h3>
      <p>
        Это ваш персональный кабинет — место, где вы можете отслеживать свой прогресс, просматривать отчёты и получать персональные рекомендации. Здесь отображается статистика ваших достижений, новости проекта и предстоящие события.
      </p>
      <div class="dashboard">
        <div class="dashboard-card">
          <h4>Ваш прогресс</h4>
          <p>80%</p>
        </div>
        <div class="dashboard-card">
          <h4>Новый уровень</h4>
          <p>Технологии будущего</p>
        </div>
        <div class="dashboard-card">
          <h4>Активность</h4>
          <p>Участвовали в 3 инициативах</p>
        </div>
      </div>
      <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
           onerror="this.onerror=null; this.src='https://via.placeholder.com/800x600?text=Image+not+found';"
           alt="Личный кабинет" class="tab-image">
    `,
    'initiative': `
      <h3>Наши инициативы</h3>
      <p>
        В этом разделе вы найдете подробное описание всех инициатив проекта. Каждая инициатива разработана с учетом самых современных исследований — от возобновляемой энергии до умного транспорта.
      </p>
      <ul class="initiative-list">
        <li>
          <strong>Энергия будущего:</strong> внедрение возобновляемых источников энергии, оптимизация распределения ресурсов, снижение выбросов.
        </li>
        <li>
          <strong>Зеленый город:</strong> создание эко-парков, озеленение городской среды, умное управление инфраструктурой.
        </li>
        <li>
          <strong>Транспорт будущего:</strong> развитие автономного транспорта, повышение мобильности и экологичности городских маршрутов.
        </li>
      </ul>
      <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
           onerror="this.onerror=null; this.src='https://via.placeholder.com/800x600?text=Image+not+found';"
           alt="Инициатива" class="tab-image">
    `,
    'news': `
      <h3>Последние Новости</h3>
      <p>
        Следите за актуальными событиями проекта Auroria. Здесь публикуются отчёты о новых разработках, партнерских соглашениях и международных инициативах.
      </p>
      <div class="news-list">
        <article class="news-item">
          <h4>Запуск нового энергетического комплекса</h4>
          <p>Сегодня мы запустили уникальный комплекс возобновляемой энергии, который уже начал обеспечивать энергией сотни домов.</p>
        </article>
        <article class="news-item">
          <h4>Озеленение столицы</h4>
          <p>В рамках инициативы "Зеленый город" начинается масштабное озеленение центральных районов Auroria.</p>
        </article>
        <article class="news-item">
          <h4>Инновации в транспорте</h4>
          <p>Новая технология автономного транспорта уже применяется на главных маршрутах города, снижая нагрузку на инфраструктуру.</p>
        </article>
      </div>
      <img src="https://images.unsplash.com/photo-1515169067865-df77f5bc6b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
           onerror="this.onerror=null; this.src='https://via.placeholder.com/800x600?text=Image+not+found';"
           alt="Новости" class="tab-image">
    `,
    'events': `
      <h3>Будущие Мероприятия</h3>
      <p>
        Ознакомьтесь с предстоящими конференциями, семинарами и выставками, которые проводятся в Auroria. Здесь вы найдете календарь мероприятий, где можно встретиться с экспертами и единомышленниками.
      </p>
      <div class="events-calendar">
        <div class="event-item">
          <h4>Конференция "Будущее цифрового мира"</h4>
          <p>Дата: 10.07.2025</p>
          <p>Место: Главный конгресс-холл Auroria</p>
        </div>
        <div class="event-item">
          <h4>Семинар по возобновляемой энергии</h4>
          <p>Дата: 22.07.2025</p>
          <p>Место: Центр инноваций Auroria</p>
        </div>
        <div class="event-item">
          <h4>Выставка транспортных решений</h4>
          <p>Дата: 05.08.2025</p>
          <p>Место: Выставочный центр Auroria</p>
        </div>
      </div>
      <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
           onerror="this.onerror=null; this.src='https://via.placeholder.com/800x600?text=Image+not+found';"
           alt="Мероприятия" class="tab-image">
    `
  };
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      tabContent.innerHTML = `<p>Загрузка...</p>`;
      setTimeout(() => {
        tabContent.innerHTML = contentData[tabId];
      }, 500);
    });
  });

  // "Живой" ИИ-чат (с ключевыми ответами по теме)
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatMessages = document.getElementById('chat-messages');
  const aiTyping = document.getElementById('ai-typing');

  chatSend.addEventListener('click', handleSendMessage);
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') handleSendMessage();
  });
  
  function handleSendMessage() {
    const messageText = chatInput.value.trim();
    if (messageText === "") return;
    appendMessage('user', messageText);
    chatInput.value = "";
    simulateAIResponse(messageText);
  }
  
  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    const msgText = document.createElement('span');
    msgText.classList.add('text');
    msgText.textContent = text;
    msgDiv.appendChild(msgText);
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  function simulateAIResponse(userMsg) {
    aiTyping.classList.remove('hidden');
    let lowerMsg = userMsg.toLowerCase();
    let responseText = "";
    if(lowerMsg.includes("технолог")) {
      responseText = "Наш проект использует передовые технологии в сфере искусственного интеллекта, облачных вычислений и устойчивой энергетики. Эти решения лежат в основе Auroria.";
    } else if(lowerMsg.includes("инициатив")) {
      responseText = "Каждая инициатива нашего проекта создавалась с учётом новейших разработок и исследований, чтобы изменить жизнь к лучшему.";
    } else if(lowerMsg.includes("капитал")) {
      responseText = "Auroria – столица будущего, где инновации, экология и единство объединяют людей со всего мира.";
    } else {
      const responses = [
        "Спасибо за ваш вопрос. Мои алгоритмы уже анализируют ситуацию...",
        "Интересное замечание! Сейчас я собираю для вас информацию...",
        "Ваш вопрос требует вдумчивого подхода — дайте мне пару секунд для анализа.",
        "Обработка данных... Подготавливаю подробный ответ."
      ];
      responseText = responses[Math.floor(Math.random() * responses.length)];
    }
    typeText(responseText, 0, () => { aiTyping.classList.add('hidden'); });
  }
  
  function typeText(text, index, callback) {
    const aiMsg = document.createElement('div');
    aiMsg.classList.add('message', 'ai');
    const aiTextSpan = document.createElement('span');
    aiTextSpan.classList.add('text');
    aiMsg.appendChild(aiTextSpan);
    chatMessages.appendChild(aiMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    function typeLetter() {
      if (index < text.length) {
        aiTextSpan.textContent += text[index];
        index++;
        chatMessages.scrollTop = chatMessages.scrollHeight;
        setTimeout(typeLetter, 50);
      } else {
        if (callback) callback();
      }
    }
    typeLetter();
  }
});
