import { useState, useEffect, useContext } from "react";
import ReactPagination from "react-paginate";

import ItemCard from "../components/ItemCard";
import ItemModal from "../components/ItemModal";

import AuthContext from "../contexts/AuthContext";

function ItemsDisplay({ url, sortingState }) {
    // contexts
    const { currentUser } = useContext(AuthContext);

    // states
    const [ loading, setLoading ] = useState(false);
    const [ modalState, setModalState ] = useState({"open": false, "item": []});

    // pagination purposes
    const [ items, setItems ] = useState([])
    const [ pageNumber, setPageNumber ] = useState(0)

    const itemsPerPage = 20
    const itemsVisited = pageNumber * itemsPerPage // how many items have we seen

    // DISPLAYING ITEMS
    // fetch items
    useEffect(() => {
        setLoading(true)
        fetch(url, 
        ).catch((error) => {
            setLoading(false)
            return
        }).then((res) => res.json())
        .then(data => {
            if (data.status) {
                return console.log(data.status)
            }
            setItems(data)
          })
        setLoading(false)
      }, [sortingState, currentUser])

    // display items per page
    const displayItems = items
        .slice(itemsVisited, itemsVisited + itemsPerPage)
        .map((item) => {
            return (
                <div key={item.id}>
                    <ItemCard 
                    item={item}
                    onClick={() => setModalState({"open": true, "item": item})}
                    />
                </div>
            )
        })
        
    // handle page change
    function handlePageChange({selected}) {
        setPageNumber(selected)
        window.scroll({ top: 0, left: 0, behavior: 'smooth'})
    }
    
    return (
        <>

            <div className="mt-[80px] mb-[60px] px-[8px] bg-primary h-fit rounded-3xl min-h-[732px]">
                {!loading &&
                items.length !== 0 ?
                <div className="flex flex-wrap justify-center relative top-[-50px]">
                    {displayItems}
                </div>
                : 
                <div className="animate-slideIn flex flex-col justify-center items-center text-center pt-[180px] space-y-8">
                    <h1 className="text-white font-semibold">Oops...It appears there is no item to show.</h1>
                    <img alt='' src='./images/sold_out_image.png' />
                </div>}
            </div>

            {items.length !== 0 && 
            <ReactPagination 
            pageCount={Math.ceil(items.length / itemsPerPage)}
            pageRangeDisplayed={5}
            previousLabel="Prev"
            nextLabel="Next"
            breakLabel="..."
            onPageChange={handlePageChange}
            containerClassName="flex space-x-8 justify-center items-center mb-[60px]"
            disabledClassName="invisible"
            nextClassName="btn-primary"
            previousClassName="btn-secondary"
            activeClassName="text-primary font-extrabold"
            />}

            {modalState.open && <ItemModal modalState={modalState} closeModal={() => {setModalState({"open": false, "item": []})}} />}

        </>
    )
}

export default ItemsDisplay;