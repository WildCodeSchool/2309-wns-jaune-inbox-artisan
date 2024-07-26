import { gql } from '@apollo/client';

export const REGISTER = gql`
	mutation CreateUser($user: CreateUserInput!) {
		createUser(user: $user) {
			mail
			username
			password
		}
	}
`;

export const PAYMENT_UUID = gql`
	mutation createUuidPayment($id: Float!) {
		createUuidPayment(id: $id) {
			uuid
		}
	}
`;

export const USER_SWITCH_PREMIUM = gql`
	mutation UserSwitchPremium($user: UpdateUserInput!) {
		userSwitchPremium(user: $user) {
			role
		}
	}
`;
