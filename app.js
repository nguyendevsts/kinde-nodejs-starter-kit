require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { GrantType, KindeClient } = require('@kinde-oss/kinde-nodejs-sdk');
const { randomString } = require('./utils/randomString');
const { isAuthenticated } = require('./middlewares/isAuthenticated');

const app = express();
const port = 3000;
const options = {
  domain: process.env.KINDE_DOMAIN,
  clientId: process.env.KINDE_CLIENT_ID,
  clientSecret: process.env.KINDE_CLIENT_SECRET,
  redirectUri: process.env.KINDE_REDIRECT_URI,
  logoutRedirectUri: process.env.KINDE_LOGOUT_REDIRECT_URI || '',
  grantType: GrantType.PKCE,
  // scope: 'openid offline profile email'
  // audience: 'https://example.com/api'
};
const client = new KindeClient(options);

app.use(
  session({
    secret: randomString(),
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
  }),
);
app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/login', client.login(), (req, res) => {
  return res.redirect('/admin');
});

app.get('/callback', client.callback(), (req, res) => {
  return res.redirect('/admin');
});

app.get('/register', client.register(), (req, res) => {
  return res.redirect('/admin');
});

app.get('/createOrg', client.createOrg(), (req, res) => {
  return res.redirect('/admin');
});

app.get('/logout', client.logout());

app.get('/test', isAuthenticated(client), (req, res) => {
  if (client.grantType === GrantType.CLIENT_CREDENTIALS) {
    return res.status(400).json("The helper function can't test with Client Credentials grant type. Please change to another grant type (PKCE or AUTHORIZATION_CODE) !!! ")
  }
  
  return res.status(200).json({
    isAuthenticated: client.isAuthenticated(req),
    getUserDetails: client.getUserDetails(req),
    getClaim: client.getClaim(req, 'given_name', 'id_token'),
    getPermissions: client.getPermissions(req),
    getOrganization: client.getOrganization(req),
    getUserOrganizations: client.getUserOrganizations(req),
  });
});

app.get('/', (req, res) => {
    if (req.session && req.session.kindeAccessToken) {
      if ( client.grantType === GrantType.CLIENT_CREDENTIALS ) {
        return res.status(200).json({ kindeAccessToken: req.session.kindeAccessToken });
      } else {
        res.redirect('/admin');
      }      
    } else {
      res.render('index', {
        title: 'Hey',
        message: 'Hello there! what would you like to do?',
      });
    }
});

app.get('/admin', isAuthenticated(client), (req, res) => {
  if (client.grantType === GrantType.CLIENT_CREDENTIALS) {
    return res.redirect('/')
  }

  res.render('admin', {
    title: 'Admin',
    user: req.session.kindeUser,
  });
});

app.listen(port, () => {
  console.log(`Kinde NodeJS Starter Kit listening on port ${port}!`);
});
