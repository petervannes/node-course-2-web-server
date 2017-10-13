const express = require('express');
const hbs = require('hbs');
//const util = require('util')
const fs = require('fs');

const port = process.env.PORT || 3000;


const maintenance = false;

var app = express();
hbs.registerPartials(`${__dirname}/views/partials`)

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var log = `Request ${new Date().toDateString()} ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('logging error' + err);
    }

  });



  // console.log(
  //   `Request  ${new Date().toDateString()} ` + util.inspect(req, false,
  //     null)
  // );
  //
  // console.log(
  //   `Response ${new Date().toDateString()} ` + util.inspect(res, false,
  //     null)
  // );
  next();
});

if (maintenance) {
  app.use((req, res, next) => {
    res.render('maintenance.hbs');
  })
}

app.use(express.static(`${__dirname}/public`));


// Helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/', (req, res) => {
  // res.send('<h1>hi mum!,</h1>');
  // res.send({
  //   sports: 'running',
  //   articles: ['shoes', 'shirts', 'socks']
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Wecome Peter!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects  Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'boooooh'
  })
})



app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
