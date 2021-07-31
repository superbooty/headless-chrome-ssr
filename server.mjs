import express from 'express';
import {ssr} from './src/ssr.mjs';

const app = express();

app.get('/product/:code', async(req, res, next) => {
  const origin = `${req.protocol}://localhost:8080`;
  console.log("ORIGIN :: ", origin);
  const html = await ssr(`${origin}/product/${req.params.code}`);
  return res.status(200).send(html);
});

app.listen(8000, () => {
  console.log("Server Started...");
})

export default app
