import CreatePoll from "../Components/CreatePoll"
import Navbar from "../Components/Navbar"
import PollList from "../Components/PollList"





const Dashboard = () => {

    return (
        <>
            <Navbar />
            <CreatePoll />
            <PollList />
        </>
    )
}

export default Dashboard