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
    const { loading, error, isAuthenticated } = useSelector((state) => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        let userCredentials = {
            email, username, password
        }
        try {
            await dispatch(loginUser(userCredentials)).unwrap();
            if (isAuthenticated) {
                navigate('/dashboard');
            }
        } catch (err) {
            // console.error("Login failed: ", err);
        }
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">
                    {loading ? "Loading.." : "Login"}
                </button>
                {error && (<p>Invalid credentials: {error}</p>)}
                <Link to='/'>Don't have an account? Register</Link>
            </form>
        </>
    )
}

export default Login
