import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../Store/atoms/token";

const Signup = () => {
    const [ username, setUsername ] = useState<any>("");
    const [ password, setPassword ] = useState("");
    const setToken = useSetRecoilState(tokenState);
    const navigate = useNavigate();

    const handleSignup = async () => {
        const response = await fetch("http://localhost:3000/auth/signup", {
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
            setToken({ token: data.token });
            navigate("/todos");
        } else {
            alert("Error while signing up");
        }
    }
    return(

        <div style={{ display: "flex", justifyContent: "center"}}>
            <div style={{ width: "400" }}>
                <h2 style={{textAlign: "center"}}>Signup</h2>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" onChange={(e) => {setUsername(e.target.value)}}/>
                <br/><br/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e) => {setPassword(e.target.value)}}/>
                <br/><br/>
                <div style={{display: "flex", justifyContent: "center"}}>
                 <button type="button" onClick={handleSignup}>Signup</button>
                </div>
                <br/><br/>
                Already signed up? <Link to="/login">Login</Link>
            </div>
        </div>
    );
}

export default Signup;