import './App.css';
import Login from './Components/Login-Component/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home-Componnet/Home';
import { LocationDisplay } from './Location';
import Forgot from './Components/Forgot-Component/Forgot';


function App() {
  return (
    <div>
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot-password" element={<Forgot/>}/>
        </Routes>
        <LocationDisplay />
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
