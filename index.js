const express = require('express');
const mongoose = require('mongoose');

const indexRoutes = require('./routes/index');
const createMessageRoutes = require('./routes/createMessage');
const createAnswerRoutes = require('./routes/createAnswer');
const listMessageRoutes = require('./routes/listMessage');
const addMessageRoutes = require('./routes/addMessage');


const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/TP1-MongoSharding', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connecté à MongoDB'))
.catch(err => console.error('❌ Erreur MongoDB :', err));

app.use('/index', indexRoutes);
app.use('/createMessage', createMessageRoutes);
app.use('/createAnswer', createAnswerRoutes);
app.use('/listMessage', listMessageRoutes);
app.use('/addMessage', addMessageRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
