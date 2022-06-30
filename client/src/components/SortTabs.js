import { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

function SortTabs(props) {
    // style for sorting tabs
    const primary_style = 'btn-primary border-0 bg-transparent transform transition';
    const secondary_style = 'btn-secondary border-0 bg-transparent transform transition';

    // states
    const [ sortTabsState, setSortTabsState ] = useState({ sort_by: 'created_timestamp', order: 'desc', dateTab: primary_style, nameTab: secondary_style, transition: ''})
    const [ orderIcon, setOrderIcon ] = useState(<RiArrowDropDownLine />)

    // SORTING PURPOSES
    // sort by date
    function handleDateClick() {
        if (sortTabsState.sort_by !== 'created_timestamp') {
            props.handleSortChange({ sort_by: 'created_timestamp', order: sortTabsState.order })
            setSortTabsState({ sort_by: 'created_timestamp', order: sortTabsState.order, dateTab: primary_style, nameTab: secondary_style, transition: 'transform transition ease-in-out duration-300 translate-x-[0px]'})
        }
    }

    // sort by name
    function handleNameClick() {
        if (sortTabsState.sort_by !== 'name') {
            props.handleSortChange({ sort_by: 'name', order: sortTabsState.order })
            setSortTabsState({ sort_by: 'name', order: sortTabsState.order, dateTab: secondary_style, nameTab: primary_style, transition: 'transform transition ease-in-out duration-300 translate-x-[73px] sm:translate-x-[89px] md:translate-x-[114px]'})
        }
    }

    // change order (desc or asc)
    function handleOrderChange() {
       if (sortTabsState.order === 'desc') {
        props.handleSortChange({ sort_by: sortTabsState.sort_by, order: 'asc' })
        setSortTabsState({ sort_by: sortTabsState.sort_by, order: 'asc', dateTab: sortTabsState.dateTab, nameTab: sortTabsState.nameTab, transition: sortTabsState.transition})
        setOrderIcon(<RiArrowDropUpLine />)
        } else {
        props.handleSortChange({ sort_by: sortTabsState.sort_by, order: 'desc' })
        setSortTabsState({ sort_by: sortTabsState.sort_by, order: 'desc', dateTab: sortTabsState.dateTab, nameTab: sortTabsState.nameTab, transition: sortTabsState.transition})
        setOrderIcon(<RiArrowDropDownLine />)
        }
    }
    return (
        <div className="flex items-center">
                <h2 className="text-[12px] md:text-[18px] lg:text-[24px] font-bold mr-[2vw]">Sort</h2>
                <div className="border-[1px] border-primary rounded-xl txt-body relative">
                    <div className={"btn-primary absolute left-0 top-0 rounded-lg w-[78.3px] sm:w-[94.3px] md:w-[122.41px] h-[31px] md:h-[45px]" + sortTabsState.transition}></div>
                    <button onClick={handleDateClick} className={"rounded-xl px-[24px] sm:px-[32px] md:px-[40px] py-[8px] md:py-[12px] " + sortTabsState.dateTab}>Date</button>
                    <button onClick={handleNameClick} className={"rounded-xl px-[24px] sm:px-[32px] md:px-[40px] py-[8px] md:py-[12px] " + sortTabsState.nameTab}>Name</button>
                </div>
                <button onClick={handleOrderChange} className="text-[36px] ml-[0.5vw] text-primary">{orderIcon}</button>
        </div>
    )
}

export default SortTabs