document.addEventListener('DOMContentLoaded', function() {

  // Плавный скролл по якорным ссылкам в навигации
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

  // Интерактивная карта: обработка наведения на пины
  const pins = document.querySelectorAll('.map-pin');
  const tooltip = document.getElementById('map-tooltip');

  pins.forEach(pin => {
    pin.addEventListener('mouseenter', function(e) {
      const initiative = this.getAttribute('data-initiative');
      tooltip.textContent = initiative;
      // Размещаем подсказку рядом с пином
      tooltip.style.left = (this.offsetLeft + 20) + 'px';
      tooltip.style.top = (this.offsetTop - 30) + 'px';
      tooltip.classList.add('visible');
    });

    pin.addEventListener('mouseleave', function() {
      tooltip.classList.remove('visible');
    });
  });

  // AJAX-вкладки: загрузка контента без перезагрузки страницы
  const tabContent = document.getElementById('tab-content');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const contentData = {
    'cabinet': 'Добро пожаловать в ваш личный кабинет. Здесь вы можете видеть ваш прогресс, обновления проектов и персональные достижения.',
    'initiative': 'Здесь представлена новая инициатива: «Энергия будущего». Примите участие и внесите свой вклад в создание нового мира.',
    'news': 'Последние новости: запуск месяца, обновления в проектах и интервью с лидерами мнений.',
    'events': 'Ближайшие мероприятия: конференция инноваций, воркшоп по будущим технологиям, вечер творческого общения.'
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Снимаем активный класс со всех кнопок и добавляем текущей
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const tabId = this.getAttribute('data-tab');
      tabContent.innerHTML = '<p>Загрузка...</p>';
      // Симуляция AJAX-запроса с задержкой
      setTimeout(() => {
        tabContent.innerHTML = '<div class="tab-panel">' + contentData[tabId] + '</div>';
      }, 500);
    });
  });

  // Чат с "Консультантом будущего"
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatMessages = document.getElementById('chat-messages');

  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  function sendMessage() {
    const messageText = chatInput.value.trim();
    if (messageText === '') return;
    addMessage('user', messageText);
    chatInput.value = '';
    // Симуляция ответа ИИ с задержкой
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText);
      addMessage('ai', aiResponse);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
  }

  function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    const textSpan = document.createElement('span');
    textSpan.classList.add('text');
    textSpan.textContent = text;
    messageDiv.appendChild(textSpan);
    chatMessages.appendChild(messageDiv);
  }

  function generateAIResponse(userMessage) {
    // Простейшая генерация ответа – рандомный выбор из массива вариантов
    const responses = [
      'Ваш вопрос очень интересен. Давайте подумаем над этим...',
      'Спасибо за внимание! Скоро я дам вам подробный ответ.',
      'Это действительно важный вопрос для будущего. Подумайте об этом в свете новых технологий.',
      'Я понимаю ваш запрос. Наш проект направлен на объединение усилий для создания лучшего мира.'
    ];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }

});
