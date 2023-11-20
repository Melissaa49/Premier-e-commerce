const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userModel = require('./models/userModel');
const checkUserRole = require('./middleware/checkUserRole');
const dashboardRoutes = require('./routes/dashboardRoutes');
const contactRoutes = require('./routes/contactRoutes');
const profileController = require('./controllers/profileController');
const policyController = require('./controllers/policyController');
const { body, validationResult } = require('express-validator');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');





const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configuration de EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "script-src 'self';");
  next();
});
app.use(methodOverride('_method'));

// Configuration de la session avec MongoDB
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGODB_URI 
  }),
  cookie: {
    secure: false, // à true si vous êtes derrière un proxy et utilisez HTTPS
    httpOnly: true,
    maxAge: 3600000 // 1 heure
  }
}));

// Routes
app.use('/dashboard', dashboardRoutes);
app.use('/contact', contactRoutes);




// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connecté à la base de données MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB :', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log('Connecté à la base de données MongoDB');
});

app.get('/', (req, res) => {
  const userId = req.session.userId;
  res.render('index', { userId });
});

app.get('/dashboard', checkUserRole.isAdmin, (req, res) => {
  res.render('dashboard');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/abonnement', (req, res) => {
  res.render('abonnement');
});

app.get('/panier', (req, res) => {
  res.render('panier'); 
});

app.get('/politique-confidentialite', (req, res) => {
  res.render('politique-de-confidentialite'); 
});

app.get('/profile', profileController.renderProfilePage);
app.get('/profile/deconnexion', profileController.logoutUser);

app.post('/signup', 
  body('email').isEmail().withMessage('Entrez une adresse e-mail valide.'),
  body('password').isLength({ min: 5 }).withMessage('Le mot de passe doit contenir au moins 5 caractères.'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Les mots de passe ne correspondent pas.');
    }
    return true;
  }),
  async (req, res) => {
    // Vérification des erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

   try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); // Hashage du mot de passe

      const newUser = new userModel({
        email: email,
        password: hashedPassword, 
      });

      await newUser.save();

      console.log('Utilisateur inscrit avec succès.');
      res.redirect('/login');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de l\'inscription');
    }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(401).send('Adresse e-mail incorrecte');
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).send('Mot de passe incorrect');
    }

    req.session.userId = user._id;
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la connexion');
  }
});


app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
