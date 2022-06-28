const express = require('express');
const { engine } = require('express-handlebars');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../public'));
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

const products = [
  {
    title: 'GeForce RTX™ 3090 24G',
    price: 3650,
    thumbnail:
      'https://www.gigabyte.com/FileUpload/Global/WebPage/686/img/3.png',
  },
];

const PORT = 8081;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`)
);
server.on('error', (err) => console.log(err));

app.get('/', (req, res) => {
  res.render('main', {
    products,
    upload: true,
  });
});

app.get('/products', (req, res) => {
  res.render('main', {
    products,
    upload: false,
  });
});

app.post('/products', (req, res) => {
  const { body } = req;
  products.push(body);
  res.render('main', {
    products,
    upload: false,
  });
});
