import { useRef, useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import Alert from "../components/Alert";

function AddNewItemForm(props) {
    const { currentUser } = useContext(AuthContext);
    const nameRef = useRef();
    const priceRef = useRef();
    const imageRef = useRef();
    const descRef = useRef();
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ loading, setLoading ] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)
        setErrorMessage('')
        fetch(`${process.env.REACT_APP_SERVER_URL}/item/add`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: nameRef.current.value,
                price: priceRef.current.value,
                image: imageRef.current.value,
                description: descRef.current.value,
                student_id: currentUser.student_id
            })
        }).then((res) => res.json())
        .then((data) => {
            if (!data.itemAdded) {
                return setErrorMessage(data.status)
            } else {
                setLoading(false)
                window.location.reload(false)
            }
        })
    }

    return (
        <div 
        disabled={loading}
        onClick={props.closeForm}
        className="w-screen h-fit min-h-full fixed top-0 left-0 bg-black bg-opacity-20 flex justify-center items-center z-20">
            <div
            onClick={(e) => {e.stopPropagation()}} 
            className="form-card animate-slideIn my-[16px] max-h-screen overflow-scroll">

                <h1 className="text-center text-[16px] sm:text-[32px] font-extrabold">
                    Add New Item
                </h1>

                {errorMessage &&
                <Alert className="mb-[24px] lg:mb-[42px]">{errorMessage}</Alert>}

                <form onSubmit={handleSubmit} disabled={loading}>
                    <div className="text-[10px] sm:text-[18px] mt-[12px] sm:mt-[20px]">
                        <label className="font-semibold">
                            Item's Name
                        </label>
                        <p className="text-[6px] sm:text-[12px] opacity-40">
                            {'\u24d8'} maximum 45 characters
                        </p>
                        <input required ref={nameRef} type='text' maxLength='45' className="form-input" />
                    </div>

                    <div className="text-[10px] sm:text-[18px] mt-[12px] sm:mt-[20px]">
                        <label className="font-semibold">
                            Price
                        </label>
                        <div className="w-full flex flex-row space-x-[12px] items-center">
                            <label className="txt-body">Rp</label>
                            <input required ref={priceRef} type='number' min='0' className="w-[calc(100%-12px)] form-input" />
                        </div>
                    </div>

                    <div className="text-[10px] sm:text-[18px] mt-[12px] sm:mt-[20px]">
                        <label className="font-semibold">
                            Image URL
                        </label>
                        <p className="text-[6px] sm:text-[12px] opacity-40">
                            {'\u24d8'} image will be cropped to 1:1 ratio
                        </p>
                        <input required ref={imageRef} type='url' className="form-input" />
                    </div>

                    <div className="text-[10px] sm:text-[18px] mt-[12px] sm:mt-[20px]">
                        <label className="font-semibold">
                            Description
                        </label>
                        <p className="text-[6px] sm:text-[12px] opacity-40">
                            {'\u24d8'} maximum 500 characters
                        </p>
                        <textarea required ref={descRef} rows='6' maxLength='500' className="form-input" />
                    </div>
                    <button
                    disabled={loading}
                    type='submit'
                    className="mt-[24px] sm:mt-[42px] btn-primary w-full">
                        Submit
                    </button>
                </form>


            </div>
        </div>
    )
}

export default AddNewItemForm;