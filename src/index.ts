import express from 'express';
import path from 'path';
import qr from 'qrcode';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/pages'));

app.get('/', (_, res) => {
  res.render('main');
});

app.post('/qrcode', (req, res) => {
  const { name, url } = req.body;

  if (!url) {
    res.send('Error: url param is required');
  }

  qr.toDataURL(url, { errorCorrectionLevel: 'H', width: 350, margin: 2 }, (err, src) => {
    if (err) {
      res.send('Error occured');
    }

    res.render('qrcode', { src, name });
  });
});

app.listen(port, () => {
  console.log(`Listening at port ${port}...`);
});
