document.addEventListener('DOMContentLoaded', () => {
  // Прятание прелоадера после загрузки страницы
  window.onload = function() {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  };

  // Плавный скролл по якорным ссылкам
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth' });
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

  // Модальное окно для инициатив
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
      // Подгружаем изображение по ключевому слову инициативы
      modalImage.src = `https://source.unsplash.com/featured/?${encodeURIComponent(title)}`;
      modal.classList.add('show');
    });
  });
  
  modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
  });
  window.addEventListener('click', (e) => {
    if(e.target == modal) modal.classList.remove('show');
  });

  // Функционал AJAX-вкладок
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContent = document.getElementById('tab-content');
  const contentData = {
    'cabinet': `<h3>Добро пожаловать, Искатель будущего!</h3>
                <p>
                  Здесь отображаются ваши достижения, обновления и новейшие технологии, способствующие развитию единого сообщества.
                </p>
                <img src="https://source.unsplash.com/800x600/?technology,workspace" alt="Личный кабинет" class="tab-image">`,
    'initiative': `<h3>Инновационные Инициативы</h3>
                   <p>
                     Узнайте о последних проектах, где технологии встречаются с креативом для построения будущего.
                   </p>
                   <img src="https://source.unsplash.com/800x600/?innovation" alt="Инициатива" class="tab-image">`,
    'news': `<h3>Последние Новости</h3>
             <p>
               Будьте в курсе самых актуальных событий, обновлений и новых технологий, меняющих мир.
             </p>
             <img src="https://source.unsplash.com/800x600/?news,technology" alt="Новости" class="tab-image">`,
    'events': `<h3>Будущие Мероприятия</h3>
               <p>
                Присоединяйтесь к предстоящим конференциям, семинарам и выставкам, посвящённым инновациям.
               </p>
               <img src="https://source.unsplash.com/800x600/?conference,event" alt="Мероприятия" class="tab-image">`
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

  // Реализация "живого" ИИ-чата с имитацией набора текста
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatMessages = document.getElementById('chat-messages');
  const aiTyping = document.getElementById('ai-typing');

  chatSend.addEventListener('click', handleSendMessage);
  chatInput.addEventListener('keypress', function(e) {
    if(e.key === 'Enter'){
      handleSendMessage();
    }
  });
  
  function handleSendMessage(){
    const messageText = chatInput.value.trim();
    if(messageText === "") return;
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
    // Показываем индикатор набора
    aiTyping.classList.remove('hidden');
    // Массив симулированных ответов
    const responses = [
      "Спасибо за ваш вопрос. Мои алгоритмы уже анализируют ситуацию...",
      "Интересное замечание! Позвольте мне собрать для вас информацию...",
      "Ваш запрос касается будущих технологий – давайте посмотрим, что можно предложить!",
      "Обработка данных... Подготовлю для вас подробный ответ..."
    ];
    const responseText = responses[Math.floor(Math.random() * responses.length)];
    // Запускаем эффект набора текста
    typeText(responseText, 0, () => {
      aiTyping.classList.add('hidden');
    });
  }
  
  function typeText(text, index, callback) {
    // Создаем новое сообщение для ИИ
    const aiMsg = document.createElement('div');
    aiMsg.classList.add('message', 'ai');
    const aiTextSpan = document.createElement('span');
    aiTextSpan.classList.add('text');
    aiMsg.appendChild(aiTextSpan);
    chatMessages.appendChild(aiMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    function typeLetter() {
      if(index < text.length) {
        aiTextSpan.textContent += text[index];
        index++;
        chatMessages.scrollTop = chatMessages.scrollHeight;
        setTimeout(typeLetter, 50);
      } else {
        if(callback) callback();
      }
    }
    typeLetter();
  }
});
