function ItemCard(props) {
    var price_formatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" })
    const price = price_formatter.format(props.item.price)

    var timestamp_formatter = new Date(props.item.created_timestamp)
    let created_date = timestamp_formatter.toLocaleDateString()

    return (
        <button onClick={props.onClick} className="max-h-[220px] hover:cursor-pointer hover:animate-wiggle mx-[1vw] text-left relative md:mb-[120px]">
            <div className="animate-slideIn">
                <h3 className="txt-body absolute top-4 right-4 bg-gray-100 w-fit px-[10px] py-[4px] rounded-xl txt-body">{created_date}</h3>
                <img alt='' src={props.item.image ? props.item.image : './images/image_placeholder'} className="bg-white w-[150px] h-[150px] md:w-[250px] md:h-[250px] object-cover border-[1px] border-black rounded-3xl shadow-lg"/>
                <div className="w-[150px] md:w-[250px] px-[16px] py-[12px] md:px-[28px] md:py-[18px] border-[1px] border-black rounded-3xl relative top-[-40px] bg-white shadow-lg font-semibold">
                    <h3 className="txt-body text-primary">{price}</h3>
                    <h2 className="text-[12px] md:text-[16px] h-[32px] md:h-[54px] overflow-hidden">{props.item.name}</h2>
                </div>
            </div>
        </button>
    )
}

export default ItemCard;