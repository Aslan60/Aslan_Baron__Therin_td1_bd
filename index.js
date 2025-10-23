const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const addMessageRoutes = require('./routes/addMessage');

const app = express();
app.use(express.json());
app.use(express.static('views')); // pour servir le HTML statique

mongoose.connect('mongodb://127.0.0.1:27017/TP1-MongoSharding', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connecté'))
.catch(err => console.error('❌ Erreur MongoDB :', err));

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/addMessage', addMessageRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
