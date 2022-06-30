import { useRef, useState } from "react";
import Alert from "../components/Alert";

function EditItemForm(props) {
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

        fetch(`${process.env.REACT_APP_SERVER_URL}/item/edit`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: nameRef.current.value ? nameRef.current.value : props.item.name,
                price: priceRef.current.value ? priceRef.current.value : props.item.price,
                image: imageRef.current.value ? imageRef.current.vaue : props.item.image,
                description: descRef.current.value ? descRef.current.value : props.item.description,
                id: props.item.id
            })
        }).then((res) => res.json())
        .then((data) => {
            if (!data.itemUpdated) {
                return setErrorMessage(data.status)
            } else {
                setLoading(false)
                window.location.reload(false)
            }
        })

    }

    return (
        <div>
            <div
            onClick={(e) => {e.stopPropagation()}} 
            className="form-card animate-slideIn my-[16px] max-h-screen overflow-scroll">

                <h1 className="text-center text-[16px] sm:text-[32px] font-extrabold">
                    Edit Item
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
                        <input ref={nameRef} type='text' maxLength='45' className="form-input" placeholder={props.item.name} />
                    </div>

                    <div className="text-[10px] sm:text-[18px] mt-[12px] sm:mt-[20px]">
                        <label className="font-semibold">
                            Price
                        </label>
                        <div className="w-full flex flex-row space-x-[12px] items-center">
                            <label className="txt-body">Rp</label>
                            <input ref={priceRef} type='number' min='0' className="w-[calc(100%-12px)] form-input" placeholder={props.item.price} />
                        </div>
                    </div>

                    <div className="text-[10px] sm:text-[18px] mt-[12px] sm:mt-[20px]">
                        <label className="font-semibold">
                            Image URL
                        </label>
                        <p className="text-[6px] sm:text-[12px] opacity-40">
                            {'\u24d8'} image will be cropped to 1:1 ratio
                        </p>
                        <input ref={imageRef} type='url' className="form-input" />
                    </div>

                    <div className="text-[10px] sm:text-[18px] mt-[12px] sm:mt-[20px]">
                        <label className="font-semibold">
                            Description
                        </label>
                        <p className="text-[6px] sm:text-[12px] opacity-40">
                            {'\u24d8'} maximum 500 characters
                        </p>
                        <textarea ref={descRef} rows='6' maxLength='500' className="form-input" placeholder={props.item.description} />
                    </div>
                    <button
                    disabled={loading}
                    type='submit'
                    className="mt-[24px] sm:mt-[42px] btn-primary w-full">
                        Update
                    </button>
                </form>


            </div>
        </div>
    )
}

export default EditItemForm;