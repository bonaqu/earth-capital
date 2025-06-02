document.addEventListener('DOMContentLoaded', () => {
  // Preloader скрытие после загрузки страницы
  window.onload = function() {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  };

  // Плавный скролл по якорям (навигация)
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

  // Intersection Observer для анимации секций
  const animatedSections = document.querySelectorAll('.animated-section');
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  animatedSections.forEach(section => {
    observer.observe(section);
  });

  // Переключение тёмной темы
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')){
      themeToggle.textContent = "☀️";
    } else {
      themeToggle.textContent = "🌙";
    }
  });

  // Обработка клика по пинам на карте для открытия модального окна
  const modal = document.getElementById('initiative-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalImage = document.getElementById('modal-image');

  const pins = document.querySelectorAll('.map-pin');
  pins.forEach(pin => {
    pin.addEventListener('click', () => {
      const title = pin.getAttribute('data-initiative');
      const description = pin.getAttribute('data-description');
      modalTitle.textContent = title;
      modalDescription.textContent = description;
      // Загружаем изображение по ключевому слову инициативы
      modalImage.src = `https://source.unsplash.com/featured/?${encodeURIComponent(title)}`;
      modal.classList.add('show');
    });
  });

  modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
  });
  window.addEventListener('click', (e) => {
    if(e.target == modal){
      modal.classList.remove('show');
    }
  });

  // AJAX-вкладки: динамическая загрузка контента
  const tabContent = document.getElementById('tab-content');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const contentData = {
    'cabinet': `<h3>Добро пожаловать, Искатель Будущего!</h3>
                <p>
                  Здесь отображаются ваши достижения, личный прогресс и персональные обновления проекта.
                  Узнайте о новейших технологиях, инициативах и мероприятиях, которые помогут вам расти вместе с нашим сообществом.
                </p>
                <img src="https://source.unsplash.com/featured/?technology,progress" alt="Личный кабинет" class="tab-image">`,
    'initiative': `<h3>Инновационные Инициативы</h3>
                <p>
                  Мы готовы изменить мир! Узнайте подробнее об актуальных проектах, где технологии встречаются с вдохновением.
                </p>
                <img src="https://source.unsplash.com/featured/?innovation" alt="Инициатива" class="tab-image">`,
    'news': `<h3>Последние Новости</h3>
                <p>
                  Будьте в курсе обновлений, нововведений и событий, влияющих на будущее проекта.
                </p>
                <img src="https://source.unsplash.com/featured/?news,technology" alt="Новости" class="tab-image">`,
    'events': `<h3>Будущие Мероприятия</h3>
                <p>
                  Подключайтесь к предстоящим мероприятиям, семинарам и конференциям, посвящённым технологиям, искусству и инновациям.
                </p>
                <img src="https://source.unsplash.com/featured/?conference,event" alt="Мероприятия" class="tab-image">`
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

  // Реализация чата с ИИ-консультантом
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatMessages = document.getElementById('chat-messages');

  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', function(e) {
    if(e.key === 'Enter'){
      sendMessage();
    }
  });

  function sendMessage() {
    const messageText = chatInput.value.trim();
    if(messageText === '') return;
    appendMessage('user', messageText);
    chatInput.value = '';
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText);
      appendMessage('ai', aiResponse);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
  }

  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    const msgText = document.createElement('span');
    msgText.classList.add('text');
    msgText.textContent = text;
    msgDiv.appendChild(msgText);
    chatMessages.appendChild(msgDiv);
  }

  function generateAIResponse(userMsg) {
    const responses = [
      'Спасибо за ваш запрос. Наши системы анализируют данные, чтобы дать вам лучший совет.',
      'Ваш вопрос затрагивает важные тенденции. Подождите немного, и я представлю прогноз.',
      'Интересный вопрос! Возможно, стоит обратить внимание на новые инициативы и технологические тренды.',
      'Этот вопрос поднимает бесконечные возможности для будущего. Я работаю над ответом!'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
});
