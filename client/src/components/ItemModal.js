import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import BalanceContext from "../contexts/BalanceContext";
import Alert from "../components/Alert";
import { FaTimes } from 'react-icons/fa';
import EditItemForm from "./EditItemForm";

function ItemModal(props) {
    const { currentUser } = useContext(AuthContext);
    const { balance, updateBalance } = useContext(BalanceContext)
    const navigate = useNavigate();

    const [ errorMessage, setErrorMessage ] = useState('')
    const [ editForm, setEditForm] = useState(false)

    // formatter
    var timestamp_formatter = new Date(props.modalState.item.created_timestamp)
    let created_timestamp = timestamp_formatter.toLocaleString()

    var price_formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })
    let price = price_formatter.format(props.modalState.item.price)

    // buy item
    function handleBuyItem() {
        setErrorMessage('')

        if (!currentUser.loggedIn) {
            navigate('/login')
            return
        }

        if (props.modalState.item.price > balance) {
            return setErrorMessage("Insufficient balance.")
        } 

        fetch("/item/buy",
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    buyer_id: currentUser.student_id,
                    id: props.modalState.item.id
                }
            )
        }).then((res) => res.json())
        .then((data) => {
            if (!data.itemBought) {
                return setErrorMessage(data.status)
            }

            let newBalance = balance - parseInt(props.modalState.item.price)
            const promise = updateBalance(newBalance)
            promise.then(
            result => { return },
            error => { return setErrorMessage(error) })
            .then(props.closeModal)
            .then(window.location.reload(false))
        })
    }

    function openEditForm() {
        setEditForm(true)
    }

    return (
        <div 
        onClick={props.closeModal}
        className="w-screen min-h-screen fixed top-0 left-0 bg-black bg-opacity-20 flex justify-center lg:items-center z-10">
            {editForm ? <EditItemForm item={props.modalState.item} /> : 
            <div 
            onClick={(e) => {e.stopPropagation()}}
            className="flex flex-col lg:flex-row lg:ml-[40px] animate-slideIn relative my-[16px] max-h-screen overflow-scroll">
                <img alt='' src={props.modalState.item.image ? props.modalState.item.image : './images/image_placeholder'} className="bg-white h-[80vw] w-[80vw] sm:w-[40vw] sm:h-[40vw] lg:w-[600px] lg:h-[600px] object-cover border-[1px] border-black rounded-3xl shadow-xl"/>
                <button onClick={props.closeModal} className="text-[16px] sm:text-[24px] lg:text-[32px] font-semibold bg-white border-[1px] border-black rounded-full px-[4px] py-[4px] lg:px-[8px] lg:py-[8px] top-[16px] right-4 lg:right-14 lg:top-4 absolute shadow-md z-10">
                    <FaTimes />
                </button>
                <div className="h-fit w-[80vw] sm:w-[40vw] lg:w-[600px] lg:h-[600px] px-[36px] py-[24px] lg:px-[54px] lg:py-[42px] bg-white border-[1px] border-black rounded-3xl shadow-xl relative top-[-40px] lg:top-0 left-0 lg:left-[-40px]">
                    {errorMessage==="Insufficient balance." &&
                    <Alert className="mb-[24px] lg:mb-[42px] lg:w-[calc(100%-60px)]">
                        <div className="flex flex-wrap justify-between items-center">
                            {errorMessage}
                            <Link to='/balance-box' className="bg-red-300 px-[24px] py-[4px] rounded-lg mt-[8px] lg:mt-0">Top Up</Link>
                        </div>
                    </Alert>}
                    {errorMessage!=="Insufficient balance." && errorMessage !=="" &&
                    <Alert className="mb-[24px] lg:mb-[42px]">{errorMessage}</Alert>}
                    <h4 className="text-black text-opacity-50 text-[8px] sm:text-[10px] lg:hidden">Created on: {created_timestamp}</h4>
                    <h3 className="text-[10px] sm:text-[14px] lg:text-[18px] text-primary font-semibold">{price}</h3>
                    <div className="flex flex-col lg:flex-row lg:items-center sm:justify-between lg:space-x-4">
                        <h2 className="text-[12px] sm:text-[16px] lg:text-[24px] font-semibold">{props.modalState.item.name}</h2>
                        {!props.modalState.item.sold &&
                            <button onClick={(props.modalState.item.seller_id==currentUser.student_id) ? openEditForm : handleBuyItem} className="bg-primary rounded-lg sm:rounded-xl text-[10px] sm:text-[12px] lg:text-[14px] font-bold text-white px-[20px] lg:px-[45px] py-[8px] sm:py-[12px] mt-[4px] lg:mt-0">
                                {(props.modalState.item.seller_id==currentUser.student_id) ? "Edit" : "Buy" }
                            </button>}
                    </div>
                    <h4 className="text-black text-opacity-50 lg:text-[12px] hidden lg:block">Created on: {created_timestamp}</h4>
                    <p className="text-[10px] sm:text-[12px] lg:text-[14px] mt-[12px] mb-[24px] sm:mb-[42px] sm:mt-[20px]">{props.modalState.item.description}</p>

                </div>
            </div>}
        </div>
    )
}

export default ItemModal;