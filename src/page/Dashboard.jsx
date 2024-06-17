import CreatePoll from "../Components/CreatePoll"
import Navbar from "../Components/Navbar"
import PollList from "../Components/PollList"





const Dashboard = () => {

    return (
        <>
            <div className="bg-gray-800 text-white" >
                <Navbar />
                <CreatePoll />
                <PollList />
            </div>
        </>
    )
}

export default Dashboard