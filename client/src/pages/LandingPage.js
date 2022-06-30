import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div className="pt-[calc(6vh+10px)] md:pt-[4vh] 
                        flex flex-col items-center 
                        max-h-[calc(100vh-80px)] 
                        text-center 
                        overflow-hidden">
            <div className="max-w-[283px] md:max-w-[566px] animate-slideIn">
                <h2 className="txt-h1">Welcome to,</h2>
                <h1 className="txt-title">Kantin Kejujuran</h1>
                <p className="txt-body">SD SEA Sentosa special corner. Everyone is free to look around, sell, and buy items. No shopekeeper! Everyone is free to add or withdraw money in the box honestly!</p>
                <button className="btn-primary px-0 hover:animate-wiggle mt-[20px]">
                    <Link to='/store' className="w-full px-[45px] md:px-[90px]">Go To Canteen's Store</Link>
                </button>
            </div>
            <img alt='' src='/images/landing_page_image.png' className="h-[calc(100vh-284px-80px-8vh)] fixed bottom-0 object-cover"/>
        </div>
    )
}

export default LandingPage;