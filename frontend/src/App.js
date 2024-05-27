import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import SignUp from './Sign-up';
import AdminDashboard from './AdminDashboard';
import Profile from './profile';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path='/dashboard' element={<AdminDashboard/>}/>
          <Route exact path='/profile' element={<Profile/>}/>


        </Routes>

      </Router>


    </div>
  );
}

export default App;
