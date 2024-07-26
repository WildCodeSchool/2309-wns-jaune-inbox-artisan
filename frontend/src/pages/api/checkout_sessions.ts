// import {
// 	CreateVariableInput,
// 	InsertVariablesMutation,
// 	InsertVariablesMutationVariables,
// 	useVariablesByUserIdLazyQuery,
// 	VariablesQuery,
// 	VariablesQueryVariables,
// } from '@/types/graphql';
// import { useMutation, useQuery } from '@apollo/client';
// import { INSERT_VARIABLES } from '@/request/mutations/settings.mutations';

// import { useUser } from '@/Contexts/UserContext';
// const { logout, user } = useUser();

// const [insertVariables] = useMutation<
// 		InsertVariablesMutation,
// 		InsertVariablesMutationVariables
// 	>(INSERT_VARIABLES, {
// 		fetchPolicy: 'no-cache',
// 		onCompleted(data) {
// 			// if (data.login.success) {
// 			router.push('/settings');
// 			// }
// 		},
// 	});

// 	const onFinishVariables = (values: { variables: CreateVariableInput[] }) => {
// 		// console.log("values avant insert :");
// 		// console.log(values);
// 		insertVariables({ variables: values });
// 	};

const stripe = require('stripe')('sk_test_51PGzIWE3g1sPCd3VquhlSIdb3FmaxcH3jwpdGomn23DdmXPOg1qPh7R2yyiBUFZahp5O4Nhwfdh8tFz5P62oBbBs00vo8NMqAH');

// const session = await stripe.checkout.sessions.retrieve(
//   'cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u'
// );

export default async function handler(req: any, res: any) {
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
        success_url: `${req.headers.origin}/subscribe/success`,
        cancel_url: `${req.headers.origin}/dashboard`,
      });
      // console.log(session.url);
      
      res.redirect(303, session.url);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    } finally {
      console.log("res ?");
      console.log(res);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}