import React, { useEffect } from "react"
import Designer from "../designer/Designer"
import { handleConfirmSignIn } from "../../api/authorize"
import { useAuthorized } from "../../util/store"
import { accountUpdated } from "../../reducers/authReducer"
import { useDispatch } from "react-redux"

export default function Dashboard() {

    // Get the query string part of the URL
    const queryString = window.location.search;

    // Parse the query string using URLSearchParams
    const urlParams = new URLSearchParams(queryString)

    const authorized = useAuthorized()
    const dispatch = useDispatch()
    const email = urlParams.get('email')
    const token: any = urlParams.get('token')

    async function authorize(email, token) {

        if (!authorized) {

            try {

                const challengeResponse = await handleConfirmSignIn(email, token)
                if (challengeResponse) {
                    dispatch(accountUpdated({
                        authorized: true,
                        account: email
                    }))

                }
            } catch (error) {
                switch (error.name) {
                    case 'UserAlreadyAuthenticatedException':
                        dispatch(accountUpdated({
                            authorized: true,
                            account: email
                        }))

                        break
                    default:
                        dispatch(accountUpdated({
                            authorized: false,
                            account: null
                        }))

                }
            }

        } else {
            dispatch(accountUpdated({
                authorized: true,
                account: email
            }))

        }


    }

    useEffect(() => {
        authorize(email, token)
    }, [])

    return <>{authorized && <Designer />}</>
}