import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './page/Register'
import Login from './page/Login'
import Dashboard from './page/Dashboard'


const App = () => {
    return (
        <div className=''>
            <Router>
                <Routes>
                    <Route exact path='/register' element={<Register />} />
                    <Route path='/' element={<Login />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Routes>
            </Router>


        </div>
    )
}

export default App