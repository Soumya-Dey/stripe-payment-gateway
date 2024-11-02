require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5500',
  })
);

const stripe = require('stripe')(
  'sk_test_51NMy2oSFIJsUJuuhCfoWg8BHIk6qJlDOUA1GWpT3cPFy9c89n6UkLwCUFgxBcfX9MEpUepfW4IcN3ikchVFemHou00MZJYDEOe'
);

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      // payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Zervise Premium Plan [Yearly]',
            },
            unit_amount: 10000,
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5500/client/success.html`,
      cancel_url: `http://localhost:5500/client/cancel.html`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000);
