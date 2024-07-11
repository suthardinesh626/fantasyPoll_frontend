import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './page/Register'
import Login from './page/Login'
import Dashboard from './page/Dashboard'
import MyPoll from './page/MyPoll'
import Navbar from './Components/Navbar'


const App = () => {
    return (
        <div className=''>
            {/* <MyPoll /> */}
            <Router>
                <Routes>
                    <Route path='/mypoll' element={<MyPoll />} />
                    <Route exact path='/register' element={<Register />} />
                    <Route path='/' element={<Login />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Routes>
            </Router>

            {/* <Navbar /> */}
        </div>
    )
}

export default App