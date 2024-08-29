export const API_HOST = process.env.REACT_APP_API
import { signIn, confirmSignIn } from 'aws-amplify/auth'

export async function createSingInChallenge(auth: any) {

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(auth),
	}

	const res: any = await fetch(`${API_HOST}/send-magic-link/`, options)
	return (await res.json())
}



export const handleConfirmSignIn = async (email, challengeResponse) => {

	await signIn({
		username: email,
		options: {
			authFlowType: 'CUSTOM_WITHOUT_SRP',
		},
	})

	const output = await confirmSignIn({ challengeResponse })
	return output.isSignedIn
}