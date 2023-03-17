import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { userRegister } from "../features/auth/authSlice"

export const useCheckAuthentication = () => {
    const dispatch = useDispatch()
    const [checkedAuth, setCheckedAuth] = useState(false)
    useEffect(() => {
        const localAuth = localStorage.getItem('auth')
        if (localAuth) {
            const auth = JSON.parse(localAuth)
            if (auth?.accessToken && auth?.user) {
                dispatch(userRegister({ accessToken: auth.accessToken, user: auth?.user }))
            }
        }

        setCheckedAuth(true)
    }, [dispatch])
    return checkedAuth
}