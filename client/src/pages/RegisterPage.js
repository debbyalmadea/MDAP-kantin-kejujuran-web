import { useRef, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Alert from "../components/Alert";

function RegisterPage() {
    const now = new Date()
    const { setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const studentIDRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ loading, setLoading ] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        setErrorMessage('')
        let sum = 0;
        for (let i = 0; i < 3; i++){
            sum += Math.floor(studentIDRef.current.value / (100 * Math.pow(10, i)) % 10)
        }
        
        if (studentIDRef.current.value % 100 !== sum || studentIDRef.current.value % 10000 < 1 || Math.floor(studentIDRef.current.value / 10000 > 9)) {
            return setErrorMessage('Student ID is invalid.')
        }
        
        if (passwordRef.current.value.length < 8) {
            return setErrorMessage('Password must consist of 8 characters or more.')
        }
        
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setErrorMessage('Password do not match.')
        }
        
        setLoading(true)
   
        fetch("/user/register",
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    student_id: studentIDRef.current.value,
                    password: passwordRef.current.value
                }
            )
        }).catch(error => console.log(error))
        .then((res) => res.json())
        .then((data) => {
            if (data.loggedIn) {
                const item = {
                    token: data.token,
                    expiry: now.getTime() + (7 * 24 * 60 * 60 * 1000)
                }
                localStorage.setItem('token', JSON.stringify(item))
                setCurrentUser({...data})
                navigate('/store', {replace: true})
            } else {
                setCurrentUser({ loggedIn: false })
                setErrorMessage(data.status)
            }
        })

        setLoading(false)

    }

    return (
        <div className="flex justify-center items-center">
            <div className="form-card animate-slideIn">
                <h1 className="text-center txt-h1 font-extrabold">
                    Register
                </h1>
                {errorMessage && <Alert className="mt-[12px] md:mt-[20px]">{errorMessage}</Alert>}
                <form onSubmit={handleSubmit}>
                    <div className="txt-h3 mt-[12px] md:mt-[20px]">
                        <label className="font-semibold">
                            Student ID
                        </label>
                        <input required ref={studentIDRef} type='number' className="form-input" />
                    </div>

                    <div className="txt-h3 mt-[12px] md:mt-[20px]">
                        <label className="font-semibold">
                            Password
                        </label>
                        <p className="text-[6px] md:text-[12px] opacity-40">
                            {'\u24d8'} password must consist of 8 characters or more
                        </p>
                        <input required ref={passwordRef} type='password' className="form-input" />
                    </div>

                    <div className="txt-h3 mt-[12px] md:mt-[20px]">
                        <label className="font-semibold">
                            Password Confirmation
                        </label>
                        <input required ref={passwordConfirmRef} type='password' className="form-input" />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-[24px] md:mt-[42px] btn-primary w-full">
                            Register
                    </button>
                </form>
                <p className="txt-body mt-[12px] md:mt-[20px] txt-body text-center">Already have an account? <Link to='/login' className="text-primary underline">Log in</Link></p>
            </div>

            <img alt='' src='%PUBLIC_URL%/images/register_image.png' className="fixed -bottom-2 -z-10 object-cover h-[60vh]"/>
        </div>
    )
}

export default RegisterPage;