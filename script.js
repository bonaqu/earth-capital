function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// GPT-консультант будущего (эмуляция)
function sendMessage() {
  const input = document.getElementById('chat-input');
  const chatLog = document.getElementById('chat-log');

  if (input.value.trim() !== '') {
    const userMsg = document.createElement('p');
    userMsg.innerHTML = `<strong>Вы:</strong> ${input.value}`;
    chatLog.appendChild(userMsg);

    const botMsg = document.createElement('p');
    botMsg.innerHTML = `<strong>Консультант:</strong> ${getFakeGPTResponse(input.value)}`;
    chatLog.appendChild(botMsg);

    input.value = '';
    chatLog.scrollTop = chatLog.scrollHeight;
  }
}

function getFakeGPTResponse(text) {
  const replies = [
    'Это отличная идея! Мы уже рассматриваем подобные инициативы.',
    'В Столице Земли мы используем ИИ для моделирования решений.',
    'Спасибо за вопрос! Мы передадим его в Совет Устойчивого Развития.',
    'Такая тема обсуждается на форуме городской синергии.',
    'Вы можете подать инициативу в личном кабинете.'
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

// Карта инициатив
document.addEventListener('DOMContentLoaded', () => {
  const map = L.map('initiative-map').setView([55.751244, 37.618423], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Пример добавления маркера
  L.marker([55.751244, 37.618423]).addTo(map)
    .bindPopup('Инициатива: Зеленый парк будущего')
    .openPopup();
});
