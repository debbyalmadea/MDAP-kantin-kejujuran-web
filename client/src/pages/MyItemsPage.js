import { useState, useContext } from "react";

import SortTabs from "../components/SortTabs";
import ItemsDisplay from "../components/ItemsDisplay";
import FilterTabs from "../components/FilterTabs";

import AuthContext from "../contexts/AuthContext";

function MyItemsPage() {
    // states
    const [ sortingState, setSortingState ] = useState({ filter: {sold: true}, sort_by: 'created_timestamp', order: 'desc' }) 
    const { currentUser } = useContext(AuthContext);
    
    return (
        <div className="z-0">
            <img alt='' src='/images/plant_1.png' className="fixed bottom-0 right-0 h-[40vh]"/>
            <img alt='' src='/images/plant_2.png' className="fixed bottom-0 left-0 h-[40vh]"/>
            <h1 className="txt-title text-center">My Items</h1>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-[20px]">
                <SortTabs handleSortChange={(sort) => setSortingState({ filter: sortingState.filter, ...sort})} />
                <FilterTabs handleFilterChange={(filter) => setSortingState({ ...filter, sort_by: sortingState.sort_by, order: sortingState.order})} />
            </div>
            <ItemsDisplay
            sortingState={sortingState}
            url={
            sortingState.filter.sold !== null ?
            `${process.env.REACT_APP_SERVER_URL}/${currentUser.student_id}/my-items/sold/${sortingState.filter.sold}/sorted/${sortingState.sort_by}/${sortingState.order}`
            :
            `${process.env.REACT_APP_SERVER_URL}/${currentUser.student_id}/my-items/bought/sorted/${sortingState.sort_by}/${sortingState.order}`
            } 
            />
        </div>
    )
}

export default MyItemsPage;