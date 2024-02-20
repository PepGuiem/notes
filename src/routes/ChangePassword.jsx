import { doFetchChangePassword } from "../js/fetchUser.js";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const handleClick = async () => {
      const confirmation = await doFetchChangePassword(oldPassword,newPassword, "http://localhost:8080/changepassword");
      if(confirmation == true){
        setConfirmation("The password changed successfully");
      }else{
        setError("Error at registration time");
      } 
  };

    return (
    <div className="container">
      <h1 className="mb-4">Change Password</h1>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Old password</label>
          <input type="text" className="form-control" id="username" placeholder="Enter your old password" onChange={(e) => setOldPassword(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">New password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter your new password" onChange={(e) => setNewPassword(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        <br />
        <br />
        {error != "" ? <p>{error}</p> : <p></p>}
        {confirmation != "" ? <p>{confirmation}</p> : <p></p>}
    </div>
    );
  }