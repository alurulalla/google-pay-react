const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/api/transaction", async (req, res) => {
  const card = {
    entry_type: "keyed",
    number: "4111111111111111",
    expiration_date: "12/22",
    cvc: "999",
  };

  const customer = {
    id: "123456789",
    payment_method_type: "card",
    payment_method_id: "abcd1234",
    billing_address_id: "abcd1234",
    shipping_address_id: "abcd1234",
  };

  const terminal = {
    id: "123456789",
    expiration_date: "12/22",
    cvc: "999",
    print_receipt: "both",
    signature_required: true,
  };

  const ach = {
    routing_number: "123456789",
    account_number: "234567890",
    sec_code: "ccd",
    account_type: "checking",
    check_number: "1234",
    accountholder_authentication: {
      dl_state: "IL",
      dl_number: "r123123123",
    },
  };

  const billingAddress = {
    first_name: "John",
    last_name: "Smith",
    company: "Test Company",
    address_line_1: "123 Some St",
    address_line_2: "",
    city: "Wheaton",
    state: "IL",
    postal_code: "60187",
    country: "US",
    phone: "5555555555",
    fax: "5555555555",
    email: "help@website.com",
  };

  const shippingAddress = {
    first_name: "John",
    last_name: "Smith",
    company: "Test Company",
    address_line_1: "123 Some St",
    address_line_2: "",
    city: "Wheaton",
    state: "IL",
    postal_code: "60187",
    country: "US",
    phone: "5555555555",
    fax: "5555555555",
    email: "help@website.com",
  };

  const apm = {
    type: "googlepay",
    merchant_redirect_url: "https://merchantwebsite.com/",
    locale: "en-US",
    mobile_view: false,
  };
  const headers = {
    Authorization: "",
    "Content-Type": "application/json",
  };

  const transaction = {
    type: "sale",
    amount: 1112,
    tax_amount: 100,
    shipping_amount: 100,
    currency: "USD",
    description: "test transaction",
    order_id: "someOrderID",
    po_number: "somePONumber",
    ip_address: "4.2.2.2",
    email_receipt: false,
    email_address: "user@home.com",
    create_vault_record: true,
    payment_method: {
      card: card,

      token: req.body.paymentMethodData.tokenizationData.token,

      customer,

      terminal,

      ach,

      apm,
    },

    billing_address: billingAddress,
    shipping_address: shippingAddress,
  };

  await axios.post(
    "https://sandbox.fluidpay.com/api/transaction",
    transaction,
    {
      headers,
    }
  );

  res.json("success");
});

app.listen(5000, () => console.log("app running on 5000 port"));
