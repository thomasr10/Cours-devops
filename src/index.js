const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const taskRoutes = require('./routes/tasks');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const errorHandler = require('./middlewares/errorHandler');
const app = express();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;

// Middleware
app.use(helmet());
app.use(cors());

const connectDb = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log('Connecté à MongoDB');
  } catch(e) {
    console.error(`Erreur lors de la connexion : ${e.message}`);
    process.exit(1);
  }
}

connectDb().
  then(() => {
    app.listen(PORT, () => console.log(`Serveur démarré : http://localhost:${PORT}`));
  })
  .catch(e => console.error(e));

app.get('/health', (req, res) => {
res.json({ status: 'ok', timestamp: new Date() });
});

app.get('/', (req, res) => {
  res.json('Salut')
})
// Routes
// app.use('/api/tasks', taskRoutes);
// Error handling
// app.use(errorHandler);
module.exports = app;