import { createContext, useEffect, useState } from "react";

const BalanceContext = createContext();

export function BalanceContextProvider(props) {
    const [ balance, setBalance ] = useState(0)

    // get balance
    useEffect(() => {
        fetch("/balance")
        .catch((error) => {
            return
        }).then((res) => res.json())
        .then(data => {
            setBalance(data.balance)
          })
      }, [])
      
    // update balance
    function updateBalance(newBalance) {
        let promise = new Promise((resolve, reject) => {
            fetch("/balance",
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        balance: newBalance
                    }
                )
            }).then((res) => res.json())
            .then((data) => {
                if (!data.balance) {
                    reject(data.status)
                } else {
                    setBalance(data.balance)
                    resolve("SUCCESS")
                }
            })
        })

        return promise
    }

    const value = {
        balance,
        setBalance,
        updateBalance
    }


    return (
        <BalanceContext.Provider value={value}>
            {props.children}
        </BalanceContext.Provider>
    )
}

export default BalanceContext;