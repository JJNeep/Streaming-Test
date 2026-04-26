// Connect to StreamElements for live chat
const se = new EventSource('https://your-streamelements-widget-url');

se.onmessage = (e) => {
  const data = JSON.parse(e.data);
  if (data.type === 'chat') addMessage(data);
};

function addMessage({ username, message, badges }) {
  const box = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'chat-msg';

  const role = badges.includes('moderator') ? 'mod'
             : badges.includes('subscriber') ? 'sub'
             : 'viewer';

  div.innerHTML = `
    <span class="name ${role}">${username}</span>
    <span class="text">${message}</span>
  `;

  box.appendChild(div);

  // Keep only last 20 messages
  while (box.children.length > 20) {
    box.removeChild(box.firstChild);
  }
}
