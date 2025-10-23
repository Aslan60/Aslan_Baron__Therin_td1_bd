const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>💬 Ajouter un message</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 40px; background: #f6f6f6; }
      h1 { color: #333; }
      form { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); width: 400px; }
      input, textarea, button {
        display: block;
        width: 100%;
        margin-bottom: 15px;
        padding: 10px;
        font-size: 1em;
      }
      button {
        background: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
      }
      button:hover { background: #45a049; }
      .messages { margin-top: 40px; }
      .message { background: white; padding: 15px; border-radius: 10px; margin-bottom: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
      .author { font-weight: bold; }
    </style>
  </head>
  <body>
    <h1>📝 Créer un message</h1>
    <form id="messageForm">
      <label>ID Auteur :</label>
      <input type="number" id="authorId" placeholder="Ex: 1" required>
      <label>Message :</label>
      <textarea id="message" placeholder="Écris ton message..." required></textarea>
      <button type="submit">Envoyer</button>
    </form>

    <div class="messages">
      <h2>💬 Messages existants</h2>
      <div id="messagesContainer"></div>
    </div>

    <script>
      const form = document.getElementById('messageForm');
      const container = document.getElementById('messagesContainer');

      // Quand on envoie le formulaire
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const authorId = document.getElementById('authorId').value;
        const message = document.getElementById('message').value;

        const res = await fetch('/createMessage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ authorId, message })
        });

        const data = await res.json();
        if (data.error) {
          alert('Erreur : ' + data.error);
        } else {
          alert('✅ Message ajouté !');
          form.reset();
          loadMessages();
        }
      });

      // Fonction pour charger tous les messages
      async function loadMessages() {
        const res = await fetch('/index');
        const posts = await res.json();

        container.innerHTML = '';
        posts.forEach(p => {
          const div = document.createElement('div');
          div.classList.add('message');
          div.innerHTML = \`
            <p class="author">\${p.author}</p>
            <p>\${p.message}</p>
            <small>\${new Date(p.creationDate).toLocaleString()}</small>
          \`;
          container.appendChild(div);
        });
      }

      // Charger au démarrage
      loadMessages();
    </script>
  </body>
  </html>
  `;
  res.send(html);
});

module.exports = router;
