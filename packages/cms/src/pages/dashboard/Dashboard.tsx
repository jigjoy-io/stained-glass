import React, { useEffect } from "react"
import Designer from "../designer/Designer"
import { handleConfirmSignIn } from "../../api/authorize"

export default function Dashboard() {

    // Get the query string part of the URL
    const queryString = window.location.search;

    // Parse the query string using URLSearchParams
    const urlParams = new URLSearchParams(queryString)

    const email = urlParams.get('email')
    const token: any = urlParams.get('token')

    useEffect(() => {
        
        const challengeResponse = handleConfirmSignIn(email, token)
        console.log(challengeResponse)
    }, [])
    return <><Designer /></>
}