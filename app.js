const express = require('express');
const app = express();
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
const ejs = require('ejs');

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

const { User } = require('./db').models;

module.exports = app;

app.get('/', (req, res, next)=> {
  res.redirect('/users');
});

app.get('/users', (req, res, next)=> {
  User.findAll()
    .then( users => res.render('index', { users, user: {} })) 
    .catch(next);
});

app.put('/users/:id', (req, res, next)=> {
  User.findByPk(req.params.id)
    .then( user => user.update(req.body))
    .then(()=> res.redirect('/users'))
    .catch(next);
});

app.delete('/users/:id', (req, res, next)=> {
  User.findByPk(req.params.id)
    .then( user => user.destroy())
    .then(()=> res.redirect('/users'))
    .catch(next);
});

app.post('/users', (req, res, next)=> {
  User.create(req.body)
    .then(()=> res.redirect('/users'))
    .catch(next);
});

app.get('/users/:id', (req, res, next)=> {
  Promise.all([
    User.findAll(),
    User.findByPk(req.params.id)
  ])
    .then(([users, user])=> res.render('index', { users, user })) 
    .catch(next);
});

app.use((err, req, res, next)=> {
  res.render('error', { error: err.message });
});
