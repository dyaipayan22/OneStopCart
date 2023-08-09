import expressAsyncHandler from 'express-async-handler';
import Stripe from 'stripe';

const stripe = Stripe(
  'sk_test_51NalJdSJNBLcWvX2xkjJXQeADaY0u9eWDWepUvlBmDYTDW36UIF2LmGMDzr7MRWa6vHkpJKZYSvVl7GnzdtN4KIs00GGbvr4ux'
);

export const stripePayment = expressAsyncHandler(async (req, res) => {
  try {
    const { cartItems, user } = req.body;

    const customer = await stripe.customers.create({
      metadata: {
        userId: user._id,
        cart: JSON.stringify(cartItems),
      },
    });

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.product.name,
        },
        unit_amount: item.product.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['IN'],
      },
      customer: customer.id,
      client_reference_id: user._id.toString(),
      billing_address_collection: 'required',
      success_url: `${process.env.CLIENT}/paymentSuccess`,
      cancel_url: `${process.env.CLIENT}/cart`,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// let endpointSecret;

// endpointSecret =
//   'whsec_c4b33698bdd0ca8afaea151178f7427feb6a725dd893d7fd47a5109bc2d50f32';

// export const stripeWebhook = (req, res) => {
//   const sig = req.headers['stripe-signature'];

//   let data;
//   let eventType;
//   if (endpointSecret) {
//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//       console.log('Webhook verified');
//     } catch (err) {
//       console.log(`Webhook Error: ${err.message}`);
//       res.status(400).send(`Webhook Error: ${err.message}`);
//       return;
//     }
//     data = event.data.object;
//     eventType = event.type;
//   } else {
//     data = req.body.data.object;
//     eventType = req.body.type;
//   }

//   if (eventType === 'checkout.session.completed') {
//     stripe.customer
//       .retrieve(data.customer)
//       .then((customer) => {
//         console.log(customer);
//         console.log('data: ', data);
//       })
//       .catch((err) => console.log(err.message));
//   }

//   res.send().end();
// };
