import { createContext, useEffect, useState } from "react"
const AuthContext = createContext();

export function AuthContextProvider(props) {
    const [ currentUser, setCurrentUser ] = useState( {loggedIn: null} )
    const [ isLoading, setIsLoading ] = useState(false)

    // user authorization
    useEffect(() => {
        setIsLoading(true)
        // const token = JSON.parse(localStorage.getItem('token')).token
        fetch("/user/auth", 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    token: localStorage.getItem('token')
                }
            )
        }).catch((error) => {
            setIsLoading(false)
            return setCurrentUser({ loggedIn: false })
        }).then(res => {
            if (!res || !res.ok || res.status >= 400) {
                setIsLoading(false)
                return setCurrentUser({ loggedIn: false })
            }
            return res.json();
        }).then(data => {
            if (!data.loggedIn) {
              setIsLoading(false)
              return setCurrentUser({ loggedIn: false })
            }
            setCurrentUser({ ...data })
          })
          setIsLoading(false)
      }, [])

    const value = {
        currentUser,
        setCurrentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;