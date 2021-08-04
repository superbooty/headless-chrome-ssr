import express from 'express';
import {ssr} from './src/ssr.mjs';
import fetch from 'node-fetch';
import cors from 'cors';
import {productQuery} from "./src/gql/productQuery.mjs";

let setCache = (req, res, next) => {
  // here you can define period in second, this one is 5 minutes
  const period = 60 * 15; 

  // you only want to cache for GET requests
  if (req.method == 'GET') {
    res.set('Cache-control', `public, max-age=${period}`)
  } else {
    // for the other requests set strict no caching parameters
    res.set('Cache-control', `no-store`)
  }

  // remember to call next() to pass on the request
  next()
}

const app = express();

app.use(setCache).use(cors({
  origin: '*'
}));

app.get('/', async(req, res, next) => {
  const html = '<div class="test">help...<div>';
  return res.status(200).send(html);
});

app.get('/product/:code', async(req, res, next) => {
  const origin = `${req.protocol}://localhost:8080`;
  console.log("ORIGIN :: ", origin);
  const html = await ssr(`${origin}/product/${req.params.code}`);
  return res.status(200).send(html);
});

/**
 * Example on how to do a REST service proxy into a gql service. This will
 * let the client cache it at the browser level
 */
app.get('/api/product/:country/:language/:code', async(req, res, next) => {

  const fetchPromises = [];
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  const locale = `${req.params.country}-${req.params.language}`
  console.log("LOCALE :: ", locale);
  const productPromise = fetch(`https://www.levi.com/nextgen-webhooks/?operationName=product&locale=${locale}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
      body: JSON.stringify({
          operationName: "product",
          variables: {
              code: req.params.code
          },
          query: productQuery
      }),
  });
  fetchPromises.push(productPromise);
  Promise.all(fetchPromises).then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(responses.map(function (response) {
          return response.json();
      })).then(function (data) {
        res.status(200).json(data[0]);;
      }).catch(function (error) {
          console.log(error);
      });
  })
  
});

app.listen(8000, () => {
  console.log("Server Started...");
})

export default app
