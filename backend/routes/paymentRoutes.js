import express from 'express';
import { stripePayment } from '../controllers/paymentController.js';
import Stripe from 'stripe';
import bodyParser from 'body-parser';

const stripe = Stripe(
  'sk_test_51NalJdSJNBLcWvX2xkjJXQeADaY0u9eWDWepUvlBmDYTDW36UIF2LmGMDzr7MRWa6vHkpJKZYSvVl7GnzdtN4KIs00GGbvr4ux'
);

const router = express.Router();

router.post('/create-checkout-session', stripePayment);

let endpointSecret;

endpointSecret =
  'whsec_c4b33698bdd0ca8afaea151178f7427feb6a725dd893d7fd47a5109bc2d50f32';

router.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  (req, res) => {
    const sig = req.headers['stripe-signature'];
    const rawBody = req.body;
    let data;
    let eventType;

    if (endpointSecret) {
      let event;

      try {
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
        console.log('Webhook verified');
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    if (eventType === 'checkout.session.completed') {
      stripe.customer
        .retrieve(data.customer)
        .then((customer) => {
          console.log(customer);
          console.log('data: ', data);
        })
        .catch((err) => console.log(err.message));
    }

    res.send().end();
  }
);

export default router;
