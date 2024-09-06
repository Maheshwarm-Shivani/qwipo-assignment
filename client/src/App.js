
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import UpdateUser from './components/UpdateUser';
import CreateUser from './components/CreateUser';
import Users from './components/Users';


function App() {
  

  return (
    <div style={{ backgroundColor: 'black', height: '100vh' }}>
         <BrowserRouter>
            <Routes>
              <Route path="/" element={<Users />}></Route>
              <Route path="/create" element={<CreateUser />}></Route>
              <Route path="/update/:id" element={<UpdateUser />}></Route>
            </Routes>
         </BrowserRouter>
    </div>
  );
}

export default App;
