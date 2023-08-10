import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import TodoList from './Components/Todos';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { userState } from './Store/atoms/user';
import { tokenState } from './Store/atoms/token';


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
  const tokenAtom = useRecoilValue(tokenState);
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const init = async () => {
    const token = localStorage.getItem("token");
    if(token !== null) {
      try {
        const response = await fetch("http://localhost:3000/auth/me", {
          headers: { Authorization: `Bearer ${token}`}
        });
        const data = await response.json();
        if(data.username) {
          setUser({ username: data.username });
          navigate("/todos");
        } else {
          navigate("/login");
        }
      }
      catch(e) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    
  }

  useEffect(() => {
    init();
  }, [tokenAtom])

  return <></>
}

export default App

