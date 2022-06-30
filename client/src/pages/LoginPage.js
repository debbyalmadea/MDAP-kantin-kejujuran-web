import { useRef, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Alert from "../components/Alert";

function LoginPage() {
    //const now = new Date()
    const { setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const studentIDRef = useRef();
    const passwordRef = useRef();
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ loading, setLoading ] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(false)
        setErrorMessage('')

        setLoading(true);

        fetch(`${process.env.REACT_APP_SERVER_URL}/user/login`,
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
                 /* const item = {
                    token: data.token,
                    expiry: now.getTime() + (7 * 24 * 60 * 60 * 1000)
                }*/
                localStorage.setItem('token', data.token)
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
                    Log In
                </h1>
                {errorMessage && <Alert className="mt-[12px] md:mt-[20px]">{errorMessage}</Alert>}
                <form onSubmit={handleSubmit}>
                    <div className="txt-h3 mt-[12px] md:mt-[20px]">
                        <label className="font-semibold">
                            Student ID
                        </label>
                        <input required ref={studentIDRef} type='number' max='99999' className="form-input" />
                    </div>

                    <div className="txt-h3 mt-[12px] md:mt-[20px]">
                        <label className="font-semibold">
                            Password
                        </label>
                        <input required ref={passwordRef} type='password' className="form-input" />
                    </div>
                    <button
                        disabled={loading}
                        type="submit"
                        className="mt-[24px] md:mt-[42px] btn-primary w-full">
                            Log in
                    </button>
                </form>
                <p className="mt-[12px] md:mt-[20px] txt-body text-center">Don't have an account yet? <Link to='/register' className="text-primary underline">Register</Link></p>
            </div>

            <img alt='' src='/images/register_image.png' className="fixed -bottom-2 -z-10 object-cover h-[60vh]"/>
        </div>
    )
}

export default LoginPage;