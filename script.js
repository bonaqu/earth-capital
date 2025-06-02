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
  const mapContainer = document.getElementById('initiative-map');
  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.google.com/maps/d/embed?mid=1hOgFAK1hD6UvRqAPs4_BkMRDGXJ0p98&ehbc=2E312F';
  iframe.width = '100%';
  iframe.height = '100%';
  iframe.style.border = '0';
  mapContainer.appendChild(iframe);
});
