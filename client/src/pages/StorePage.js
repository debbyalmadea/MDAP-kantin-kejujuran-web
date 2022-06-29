import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiWallet } from 'react-icons/bi';

import AddNewItemForm from "../components/AddNewItemForm";
import SortTabs from "../components/SortTabs";
import ItemsDisplay from "../components/ItemsDisplay";

import AuthContext from "../contexts/AuthContext";
import BalanceContext from "../contexts/BalanceContext";

function StorePage() {
    // contexts
    const { currentUser } = useContext(AuthContext);
    const { balance } = useContext(BalanceContext);

    // navigate
    const navigate = useNavigate();

    // states
    const [ sortingState, setSortingState ] = useState({ sort_by: 'created_timestamp', order: 'desc' }) 
    const [ addFormState, setAddFormState ] = useState(false);

    // format to currency string
    var formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })

    return (
        <>
            <h1 className="txt-title text-center">Canteen's Store</h1>
            <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center mt-[4vh]">
                <SortTabs handleSortChange={(sort) => setSortingState(sort)} />

                {currentUser.loggedIn &&
                <div className="flex items-center text-[12px] md:text-[18px] lg:text-[24px] font-bold space-x-[2vw] mb-[20px] sm:mb-0">
                    <div className="flex items-center space-x-2">
                        <BiWallet />
                        <h2 className="font-bold mr-[20px]">{formatter.format(balance)}</h2>
                    </div>
                    <Link to='/balance-box' className="btn-primary">Top Up</Link>
                </div>}
            </div>

            <ItemsDisplay
            sortingState={sortingState}
            url={`/item/sorted/${sortingState.sort_by}/${sortingState.order}`} />
            
            <button 
            onClick={() => 
                {currentUser.loggedIn ? setAddFormState(true) : navigate('/login')}}
            className="hover:animate-bounce text-center fixed bottom-8 md:bottom-14 right-2 md:right-16 bg-black rounded-full w-[60px] h-[60px] md:w-[100px] md:h-[100px] text-white text-[24px] md:text-[64px] shadow-2xl">
                +
            </button>
            {addFormState && <AddNewItemForm closeForm={() => setAddFormState(false)} />}
            
            <img alt='' src='./images/plant_1.png' className="-z-10 fixed bottom-0 right-0 h-[40vh]"/>
            <img alt='' src='./images/plant_2.png' className="-z-10 fixed bottom-0 left-0 h-[40vh]"/>
        </>
    )
}

export default StorePage;