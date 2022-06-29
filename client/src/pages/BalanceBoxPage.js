import { useContext, useState, useRef } from "react";
import BalanceContext from "../contexts/BalanceContext";
import Alert from "../components/Alert";

function BalanceBoxPage() {
    const { balance, updateBalance } = useContext(BalanceContext)
    const amountRef = useRef();
    const [ errorMessage, setErrorMessage ] = useState('')

    // format to currency string
    var formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })

    function handleTopUp() {
        setErrorMessage('')

        let amount = parseInt(amountRef.current.value)
        let newBalance = balance + amount
        const promise = updateBalance(newBalance)
        promise.then(
            result => { return },
            error => {return setErrorMessage(error)}
        )
    }

    function handleWithdraw() {

        let amount = parseInt(amountRef.current.value)
        if (amount > balance) {
            return setErrorMessage("Insufficient balance.")
        }

        let newBalance = balance - amount
        const promise = updateBalance(newBalance)
        promise.then(
            result => { return },
            error => { return setErrorMessage(error) }
        )
    }

    return (
        <div className="mt-[8vh] md:mt-0">
            <h1 className="txt-title text-center">Balance Box</h1>
            <div className="flex justify-center md:mt-[20px] animate-slideIn">
                <img alt='' src='./images/balance_box_image.png' className="w-[80px] md:w-[200px]" />
            </div>
            <h1 className="text-[24px] md:text-[48px] font-extrabold text-black text-center animate-slideIn">{formatter.format(balance)}</h1>
            <div className="flex justify-center mt-[12px] md:mt-[20px] animate-slideIn z-10">
                <div className="form-card">
                    {errorMessage && <Alert className="mb-[42px]">{errorMessage}</Alert>}
                    <div className="txt-h3 w-full flex flex-row space-x-[12px] items-center">
                        <label>Rp</label>
                        <input required ref={amountRef} type='number' min='0' className="w-[calc(100%-12px)] form-input" />
                    </div>
                    <div className="flex flex-col-reverse md:flex-row justify-between mt-[24px] md:mt-[42px]">
                        <button onClick={handleWithdraw} className="btn-primary md:w-[220px] mt-[12px] md:mt-0">Withdraw</button>
                        <button onClick={handleTopUp} className="btn-primary md:w-[220px]">Top Up</button>
                    </div>
                </div>
            </div>

            <img alt='' src='./images/plant_1.png' className="-z-10 fixed bottom-0 right-0 h-[40vh]"/>
            <img alt='' src='./images/plant_2.png' className="-z-10 fixed bottom-0 left-0 h-[40vh]"/>
        </div>
    )
}

export default BalanceBoxPage;