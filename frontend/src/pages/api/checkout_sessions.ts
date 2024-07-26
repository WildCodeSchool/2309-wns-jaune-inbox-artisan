const stripe = require('stripe')(
	'sk_test_51PGzIWE3g1sPCd3VquhlSIdb3FmaxcH3jwpdGomn23DdmXPOg1qPh7R2yyiBUFZahp5O4Nhwfdh8tFz5P62oBbBs00vo8NMqAH'
);

export default async function handler(req: any, res: any) {
	if (req.method === 'POST') {
		try {
			// Create Checkout Sessions from body params.
			const { uuid } = req.body.json();

			console.log('uuid :', uuid);

			const session = await stripe.checkout.sessions.create({
				line_items: [
					{
						// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
						price: 'price_1PH5xLE3g1sPCd3VhLy8qWaq',
						quantity: 1,
					},
				],
				mode: 'payment',
				success_url: `${req.headers.origin}/subscribe/success?uuid=${uuid}`,
				cancel_url: `${req.headers.origin}/dashboard`,
			});
			console.log('session :', session);

			// res.redirect(303, session.url);
			res.status(200).send({ url: session.url });
		} catch (err: any) {
			res.status(err.statusCode || 500).json(err.message);
		} finally {
			console.log('res ?');
			console.log(res);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
