import './App.css';
import Login from './Components/Login-Component/Login';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home-Componnet/Home';
import Forgot from './Components/Forgot-Component/Forgot';
import Reset from './Components/Reset-Component/Reset';


function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot_password" element={<Forgot/>}/>
          <Route path="/reset"  element={<Reset/>}/>
          <Route path="/apple"  element={<Home/>}/>
          <Route path="/linked-in"  element={<Home/>}/>
          <Route path="/google"  element={<Home/>}/>
          <Route path="/sign-up"  element={<Home/>}/>
        </Routes>
    </div>
  );
}

export default App;
