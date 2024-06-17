import CreatePoll from "../Components/CreatePoll"
import Navbar from "../Components/Navbar"
import PollList from "../Components/PollList"
import Footer from '../Components/Footer'




const Dashboard = () => {

    return (
        <>
            <div className="bg-gray-800 text-white" >
                <Navbar />
                <CreatePoll />
                <PollList />
                <Footer/>
            </div>
        </>
    )
}

export default Dashboard