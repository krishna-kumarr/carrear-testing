import logo from './logo.svg';
import './App.css';
import Login from './Components/Login-Component/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home-Componnet/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
