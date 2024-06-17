import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/UserSlice";
import { useDispatch } from "react-redux";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser())
            .then(() => navigate('/login'));
    };

    return (
        <button
            className="px-4 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
};

export default Logout;
