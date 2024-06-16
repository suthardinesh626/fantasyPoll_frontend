import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from "../store/UserSlice"


const Login = () => {

    // state
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    // redux state
    const { loading, error } = useSelector((state) => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault();
        let userCrendetail = {
            email, username, password
        }
        dispatch(loginUser(userCrendetail))
            .then(
                navigate('/dashboard')
            )
            .catch(
                new Error("user not exist", Error)
            )


    }


    return (
        <>
            <form onSubmit={handleLogin}  >
                <label htmlFor="">Email</label>
                <input type="text" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="">Username</label>
                <input type="text" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="">Password</label>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit"   >
                    {loading ? "Lading.." : "Login"}
                </button>
                {error && (<p>invalid credentials {error} </p>)}
                <Link to='/' >Don't have account, Regsiter</Link>
            </form>
        </>
    )
}

export default Login