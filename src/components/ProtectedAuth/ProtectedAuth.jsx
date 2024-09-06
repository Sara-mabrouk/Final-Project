import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Navigate } from 'react-router-dom'


export default function ProtectedAuth({ children }) {
    const { userToken } = useContext(UserContext)
    return (
        <>

            {
                !userToken ? children : <Navigate to={"/"} />
            }
        </>
    )
}
