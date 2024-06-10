const stripe = require('stripe')('sk_test_51PGzIWE3g1sPCd3VquhlSIdb3FmaxcH3jwpdGomn23DdmXPOg1qPh7R2yyiBUFZahp5O4Nhwfdh8tFz5P62oBbBs00vo8NMqAH');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1PH5xLE3g1sPCd3VhLy8qWaq',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}