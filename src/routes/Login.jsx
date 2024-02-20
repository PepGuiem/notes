import { doFetchLoginUser } from "../js/fetchUser.js";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleClick = async () => {
      const confirmation = await doFetchLoginUser(username,password, "http://localhost:8080/login");
      if(confirmation == true){
        navigate("/")
      }else{
        setError("Error at registration time");
      } 
  };

    return (
    <div className="container">
      <h1 className="mb-4">Login</h1>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        <br />
        <br />
        {error != "" ? <p>{error}</p> : <p></p>}
    </div>
    );
  }