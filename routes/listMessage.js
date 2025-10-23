const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ creationDate: -1 });

  const html = `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>Liste des Messages</title>
    <style>
      body { font-family: Arial; margin: 40px; }
      .message { padding: 15px; border: 1px solid #ddd; margin-bottom: 10px; border-radius: 10px; }
      .author { font-weight: bold; color: #333; }
      .date { font-size: 0.9em; color: gray; }
      .answers { margin-left: 20px; border-left: 2px solid #ccc; padding-left: 10px; }
    </style>
  </head>
  <body>
    <h1>📋 Liste des Messages</h1>
    <div id="messages"></div>

    <script>
      async function loadMessages() {
        const res = await fetch('/index');
        const posts = await res.json();
        const container = document.getElementById('messages');
        container.innerHTML = '';

        posts.forEach(p => {
          const div = document.createElement('div');
          div.classList.add('message');
          div.innerHTML = \`
            <p><span class="author">\${p.author}</span> — <span class="date">\${new Date(p.creationDate).toLocaleString()}</span></p>
            <p>\${p.message}</p>
            \${p.answers.length > 0 ? renderAnswers(p.answers) : ''}
          \`;
          container.appendChild(div);
        });
      }

      function renderAnswers(answers) {
        let html = '<div class="answers">';
        for (const ans of answers) {
          html += \`
            <p><strong>\${ans.author}</strong> → \${ans.message}</p>
            \${ans.answers?.length ? renderAnswers(ans.answers) : ''}
          \`;
        }
        html += '</div>';
        return html;
      }

      loadMessages();
    </script>
  </body>
  </html>`;
  
  res.send(html);
});

module.exports = router;
