import express, { Request, Response } from 'express';
import cors from 'cors';
import getData from '.';

const PORT = 8000;

const app = express();

app.use(cors());
app.get('/getData', (req: Request, res: Response) => {
  console.log('request');
  const data = getData();
  res.status(200).send(data);
});

app.listen(PORT, () => {
  console.log(`App is started on the port ${PORT}`);
});
