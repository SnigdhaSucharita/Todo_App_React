import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import TodoList from './Components/Todos';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from './Store/atoms/authState';
import { useEffect } from 'react';


function App() {
  return (
    <RecoilRoot>
      <Router>
        <InitState />
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/todos' element={<TodoList />} />
        </Routes>
      </Router>
    </RecoilRoot>
  )
}

const InitState = () => {
  const setAuth = useSetRecoilState(authState);
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();

  const init = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/auth/me", {
        headers: { Authorization: `Bearer ${token}`}
      });
      const data = await response.json();
      if(data.username) {
        setAuth({ token: token, username: data.username });
        navigate("/todos");
      } else {
        navigate("/login");
      }
    }
    catch(e) {
      navigate("/login");
    }
  }

  useEffect(() => {
    init();
    console.log("hi");
  }, [auth.token])

  return <></>
}

export default App
