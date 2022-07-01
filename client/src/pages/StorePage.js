import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BiWallet } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';

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
    const [searchTerm, setSearchTerm] = useState('');

    // ref
    const searchRef = useRef();

    // format to currency string
    var formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })

    // search item
    function handleSearch(e) {
        e.preventDefault();
        setSearchTerm(searchRef.current.value);
    }

    return (
        <>
            <h1 className="txt-title text-center">Canteen's Store</h1>
            {currentUser.loggedIn &&
            <div className="flex justify-center text-[12px] md:text-[24px] font-bold">
                <div className="flex items-center space-x-2">
                    <BiWallet />
                    <h2 className="font-bold mr-[20px]">{formatter.format(balance)}</h2>
                </div>
            </div>}
            <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center mt-[4vh]">
                <div className="flex flex-row sm:space-x-4 mt-[8px] sm:mt-0">
                    <SortTabs handleSortChange={(sort) => setSortingState(sort)} />
                </div>
                <div className="w-full sm:w-auto">
                    <form onSubmit={handleSearch} className="flex flex-row items-center">
                        <input
                        placeholder="Search item"
                        ref={searchRef}
                        className="focus:outline-primary w-full px-[18px] sm:px-[24px] md:px-[34px] py-[8px] md:py-[12px] txt-body border-[1px] border-primary rounded-xl txt-body"
                        />
                        <button type="submit" className="text-[12px] md:text-[18px] lg:text-[24px] text-primary ml-[1vw]"><FaSearch /></button>
                    </form>
                </div>
            </div>

            <ItemsDisplay
            sortingState={sortingState}
            url={`${process.env.REACT_APP_SERVER_URL}/item/search?name=${searchTerm}&sort=${sortingState.sort_by}&order=${sortingState.order}`} />
            
            <button 
            onClick={() => 
                {currentUser.loggedIn ? setAddFormState(true) : navigate('/login')}}
            className="hover:animate-bounce text-center fixed bottom-8 md:bottom-14 right-2 md:right-16 bg-black rounded-full w-[60px] h-[60px] md:w-[100px] md:h-[100px] text-white text-[24px] md:text-[64px] shadow-2xl">
                +
            </button>
            {addFormState && <AddNewItemForm closeForm={() => setAddFormState(false)} />}
            
            <img alt='' src='/images/plant_1.png' className="-z-10 fixed bottom-0 right-0 h-[40vh]"/>
            <img alt='' src='/images/plant_2.png' className="-z-10 fixed bottom-0 left-0 h-[40vh]"/>
        </>
    )
}

export default StorePage;