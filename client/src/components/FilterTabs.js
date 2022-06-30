import { useState } from "react";

function FilterTabs(props) {
    // style for sorting tabs
    const primary_style = 'btn-primary border-0 bg-transparent transform transition';
    const secondary_style = 'btn-secondary border-0 bg-transparent transform transition';

    // states
    const [ filterTabsState, setFilterTabsState ] = useState({ filter: 'sold', soldTab: primary_style, onSaleTab: secondary_style, boughtTab: secondary_style, transition: ''})

    // FILTER PURPOSES
    // filter sold items
    function handleSoldClick() {
        if (filterTabsState.filter !== 'sold') {
            props.handleFilterChange({ filter: {sold: true} })
            setFilterTabsState({ filter: 'sold', soldTab: primary_style, onSaleTab: secondary_style, boughtTab: secondary_style, transition: 'transform transition ease-in-out duration-300 translate-x-[0px]'})
        }
    }

    // filter on sale items
    function handleOnSaleClick() {
        if (filterTabsState.filter !== 'on_sale') {
            props.handleFilterChange({ filter: {sold: false} })
            setFilterTabsState({ filter: 'on_sale', soldTab: secondary_style, onSaleTab: primary_style, boughtTab: secondary_style, transition: 'transform transition ease-in-out duration-300 translate-x-[60px] sm:translate-x-[70px] md:translate-x-[96px]'})
        }
    }

    // filter bought items
    function handleBoughtClick() {
        if (filterTabsState.filter !== 'bought') {
            props.handleFilterChange({ filter: {sold: null} })
            setFilterTabsState({ filter: 'bought', soldTab: secondary_style, onSaleTab: secondary_style, boughtTab: primary_style, transition: 'transform transition ease-in-out duration-300 translate-x-[137px] sm:translate-x-[145px] md:translate-x-[200px]'})
        }
    }
    return (
        <div className="txt-body items-center border-[1px] border-primary rounded-xl md:text-[16px] relative mt-[8px] sm:mt-0">
            <button onClick={handleSoldClick} className={"rounded-xl px-[18px] sm:px-[24px] md:px-[34px] py-[8px] md:py-[12px] " + filterTabsState.soldTab}>Sold</button>
            <button onClick={handleOnSaleClick} className={"rounded-xl px-[18px] sm:px-[18px] md:px-[24px] py-[8px] md:py-[12px] " + filterTabsState.onSaleTab}>On Sale</button>
            <button onClick={handleBoughtClick} className={"rounded-xl px-[18px] sm:px-[18px] md:px-[24px] py-[8px] md:py-[12px] " + filterTabsState.boughtTab}>Bought</button>
            <div className={"btn-primary absolute left-0 top-0 rounded-lg w-[68px] sm:w-[72px] md:w-[100px] h-[31px] md:h-[45px] -z-[1] " + filterTabsState.transition}></div>
        </div>
    )
}

export default FilterTabs;