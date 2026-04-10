const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// AUTH ROUTES
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

// PASSPORT
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, profile, done)=>{
  return done(null, profile);
}));

passport.serializeUser((user,done)=> done(null,user));
passport.deserializeUser((user,done)=> done(null,user));

// API ROUTES
app.use('/users', require('./routes/users'));
app.use('/customers', require('./routes/customers'));
app.use('/services', require('./routes/services'));
app.use('/employees', require('./routes/employees'));
app.use('/appointments', require('./routes/appointments'));

// BASE
app.get('/', (req,res)=>{
  res.send('Smart Service API Running');
});

// SWAGGER
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const specs = swaggerJsdoc({
  definition:{
    openapi:'3.0.0',
    info:{
      title:'Smart Service Management API',
      version:'1.0.0'
    },
    servers:[{ url: process.env.RENDER_EXTERNAL_URL || 'http://localhost:3000' }]
  },
  apis:['./routes/*.js']
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// DB
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server running`);
  });
})
.catch(err=> console.log(err));