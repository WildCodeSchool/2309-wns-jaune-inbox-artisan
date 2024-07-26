import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';
import { Button } from 'antd';

import { useUser } from '@/Contexts/UserContext';
import { useUserSwitchPremiumMutation } from '@/types/graphql';
import { USER_SWITCH_PREMIUM } from '@/request/mutations/auth.mutations';
import { useMutation } from '@apollo/client';
import router from 'next/router';

export default function Success() {
	const { logout, user, setUser } = useUser();

	console.log('user before premium', user);

	const [userSwitchPremiumMutation, { data, loading, error }] =
		useUserSwitchPremiumMutation({
			onCompleted: () => {},
			// variables: {
			// 	user: // value for 'user'
			// },
		});

	const userToPremium = () => {
		userSwitchPremiumMutation({
			variables: {
				user: user,
			},
		}).then((r) => router.push('/dashboard'));
	};

	userToPremium();

	return (
		<>
			<div>succès</div>
			<Button href="/dashboard" type="primary">
				Dashboard
			</Button>
		</>
	);
}
