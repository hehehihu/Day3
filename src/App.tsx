import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Account from "./pages/Account/Account";
import RequireAuth from './middleware/RequireAuth';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<RequireAuth />}>
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
  );
}

export default App;