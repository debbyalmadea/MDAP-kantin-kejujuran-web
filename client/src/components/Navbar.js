import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";

// import icons
import { BiStore, BiWallet } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg'; 

function Navbar() {
    const navigate = useNavigate();

    // initialize states
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [ dropdownDisplay, setDropdownDisplay ] = useState(false)

    // log out function
    function handleLogOut() {
        setCurrentUser({ loggedIn: false })
        localStorage.removeItem('token')
        navigate('/', {replace: true})
    }

    // link component
    const LinkTo = ({href, text, icon}) => {
        return (
            <Link to={href} className="hover:text-primary hover:underline hover:font-bold px-[2vw] flex items-center space-x-2">
                <div className="md:hidden text-[18px]">
                    {icon}
                </div>
                <p className="hidden md:block">{text}</p>
            </Link >
        )
    }

    return (
        <div className="h-[80px] flex justify-between items-center">
            <Link to='/' className="txt-h2 font-extrabold">Kantin Kejujuran</Link>
            <div className="flex items-center txt-body">
                <LinkTo href="/store" text="Store" icon={<BiStore />} />

                { currentUser.loggedIn ? 
                <>
                    <LinkTo href="/balance-box" text="Balance" icon={<BiWallet />} />
                    <button onClick={() => setDropdownDisplay(!dropdownDisplay)} className="px-[2vw] text-[18px] md:text-[20px]">
                        <CgProfile />
                    </button>

                    { dropdownDisplay && 
                    <div className="flex flex-col divide-y divide-gray-100 py-[2px] shadow-md absolute top-[80px] right-0 rounded-sm bg-white">
                        <Link to='/my-items' className="txt-body text-left px-[42px] py-[8px] hover:bg-gray-100">My Items</Link>
                        <button onClick={handleLogOut} className="txt-body text-red-400 hover:bg-red-100 px-[42px] py-[8px]">Log Out</button>
                    </div>}

                </> : <Link to='/login' className="px-[2vw] text-[18px] md:text-[20px]"><CgProfile /></Link >}
            </div>
        </div>
    )
}

export default Navbar;