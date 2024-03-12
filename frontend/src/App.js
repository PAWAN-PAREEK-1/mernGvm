// import logo from './logo.svg';
import './App.css';
import Signup from './component/signup';
import Login from './component/login';
import { Route,Routes} from 'react-router-dom';


function App() {
  return (
  <>
  <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/' element={<Signup/>}/>
  </Routes>
  </>
  );
}

export default App;
