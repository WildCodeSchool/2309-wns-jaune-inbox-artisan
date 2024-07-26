import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';
import { Button } from 'antd';

import { useUser } from '@/Contexts/UserContext';
import {
	UpdateUserInput,
	// UpdateUserMutation,
	// UpdateUserMutationVariables,
	UserSwitchPremiumMutation,
	UserSwitchPremiumMutationVariables,
	useUserSwitchPremiumMutation,
} from '@/types/graphql';
import {
	// UPDATE_USER,
	USER_SWITCH_PREMIUM,
} from '@/request/mutations/auth.mutations';
import { useMutation } from '@apollo/client';

export default function Success() {
	// React.useEffect(() => {
	//   // Check to see if this is a redirect back from Checkout
	//   const query = new URLSearchParams(window.location.search);
	//   if (query.get('success')) {
	//     console.log('Order placed! You will receive an email confirmation.');
	//   }

	//   if (query.get('canceled')) {
	//     console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
	//   }
	// }, []);

	const { logout, user, setUser } = useUser();

	console.log('user before premium', user);

	const [userSwitchPremium] = useMutation<
		UserSwitchPremiumMutation,
		UserSwitchPremiumMutationVariables
	>(USER_SWITCH_PREMIUM, {
		fetchPolicy: 'no-cache',
		// onCompleted(data) {
		// 	// if (data.login.success) {
		// 	router.push('/settings');
		// 	// }
		// },
	});

	// const onFinishVariables = (values: { variables: CreateVariableInput[] }) => {
	// 	// console.log("values avant insert :");
	// 	// console.log(values);
	// 	insertVariables({ variables: values });
	// };

	// const usertoPremium: UpdateUserInput

	// const usertoPremium = user;
	// usertoPremium.role = "Premium";

	// console.log("new user", usertoPremium);

	// const userToPremium = user as UpdateUserInput;

	// userSwitchPremium(user as any);
	// userSwitchPremium(userToPremium);

	useUserSwitchPremiumMutation(user as any);

	setUser(user);

	return (
		<>
			<div>succès</div>
			<Button href="/dashboard" type="primary">
				Dashboard
			</Button>
		</>
	);
}
