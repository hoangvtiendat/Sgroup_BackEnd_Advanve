import express from 'express';
import router from './apis'
import pool from './database/connection'

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use('/api', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
