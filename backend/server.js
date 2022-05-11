const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
app.use(express.json());

app.post('/api/transaction', (req, res) => {
  const headers = {
    Authorization: process.env.API_KEY,
    'Content-Type': 'application/json',
  };

  const transaction = {
    ...req.body.orderDetails,
    create_vault_record: true,
    payment_method: {
      google_pay_token: req.body.paymentMethodData.tokenizationData.token,
    },
    billing_address: req.body.shippingDetails,
    shipping_address: req.body.shippingDetails,
  };

  axios
    .post('https://sandbox.fluidpay.com/api/transaction', transaction, {
      headers,
    })
    .then(() => res.json('success'))
    .catch((error) => console.log(error));
});

app.listen(5000, () => console.log('app running on 5000 port'));
