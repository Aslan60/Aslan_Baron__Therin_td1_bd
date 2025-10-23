const mongoose = require('mongoose');
const Users = require('./models/Users');
const Post = require('./models/Post');

const seed = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/TP1-MongoSharding', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("✅ Connecté à MongoDB pour le seed");

    await Users.deleteMany();
    await Post.deleteMany();

    const users = await Users.insertMany([
      { user_id: 1, firstname: 'Alice', lastname: 'Dupont', email: 'alice@test.com' },
      { user_id: 2, firstname: 'Bob', lastname: 'Martin', email: 'bob@test.com' },
      { user_id: 3, firstname: 'Charlie', lastname: 'Durand', email: 'charlie@test.com' },
    ]);

    const posts = await Post.insertMany([
      {
        post_id: 1,
        message: "Bonjour à tous !",
        author: "Alice Dupont",
        answers: [{ message: "Salut Alice !", author: "Bob Martin" }]
      },
      {
        post_id: 2,
        message: "Quelqu’un utilise Express ?",
        author: "Bob Martin"
      }
    ]);

    console.log(`👥 ${users.length} utilisateurs insérés.`);
    console.log(`💬 ${posts.length} messages insérés.`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
