import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const setAuth = useSetRecoilState(authState);
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
            setAuth({ token: data.token, username: null});
            navigate("/todos");
        } else {
            alert("Error while signing up");
        }
    }
    return(

        <div style={{ display: "flex", justifyContent: "center"}}>
            <div style={{ width: "400" }}>
                <h2 style={{textAlign: "center"}}>Signup</h2>
                <label for="username">Username</label>
                <input type="text" id="username" onChange={(e) => {setUsername(e.target.value)}}/>
                <br/><br/>
                <label for="password">Password</label>
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