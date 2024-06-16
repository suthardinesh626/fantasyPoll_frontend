import { useNavigate } from "react-router-dom"
import { logoutUser } from "../store/UserSlice"
import { useDispatch } from "react-redux"

const Logout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handlelogout = () => {
        dispatch(logoutUser())
            .then(
                navigate('/login')
            )
    }

    return (
        <>
            <button className=" font-bold" onClick={handlelogout} >logout</button>
        </>
    )
}

export default Logout