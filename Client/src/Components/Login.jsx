import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../Store/atoms/authState";

function Login() {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const setAuth = useSetRecoilState(authState);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            body: JSON.stringify({
                username, password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        if(data.token) {
            localStorage.setItem("token", data.token);
            setAuth({ token: data.token, username: null});
            navigate("/todos");
        } else {
            alert("invalid credentials");
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center"}}>
            <div style={{ width: "400" }}>
                <h2 style={{textAlign: "center"}}>Login</h2>
                <label for="username">Username</label>
                <input type="text" id="username" onChange={(e) => {setUsername(e.target.value)}}/>
                <br/><br/>
                <label for="password">Password</label>
                <input type="password" id="password" onChange={(e) => {setPassword(e.target.value)}}/>
                <br/><br/>
                <div style={{display: "flex", justifyContent: "center"}}>
                 <button type="button" onClick={handleLogin}>Signin</button>
                </div>
                <br/><br/>
                New here? <Link to="/signup">Signup</Link>
            </div>
        </div>
    );            
}

export default Login;