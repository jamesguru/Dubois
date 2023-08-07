
import { publicRequest } from "../../requestMethods";
import "./newUser.css";
import {useState} from 'react'

export default function NewUser() {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {

    setInputs(prev => {
  
  
      return {...prev, [e.target.name] : e.target.value}
    })
  }
  
  const handleUpload= async (e)=>{
    e.preventDefault()

    try {

      inputs && publicRequest.post('/auth/register',inputs)
      
    } catch (error) {
      
    }
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input name="username" type="text" placeholder="john" onChange={handleChange}/>
        </div>
       
        <div className="newUserItem">
          <label>Email</label>
          <input name="email" type="email" placeholder="john@gmail.com" onChange={handleChange}/>
        </div>

        <div className="newUserItem">
          <label>Password</label>
          <input name="password" placeholder="password" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input name="phone" type="text" placeholder="+1 123 456 78" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>location</label>
          <input name="location" type="text" placeholder="New York | USA" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input name="address" type="text" placeholder="New York | USA" onChange={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Seller</label>
          <input name="seller" type="text" placeholder="Credence" onChange={handleChange}/>
        </div>
    

        <div className="newUserItem">
          <label>Admin</label>
          <select className="newUserSelect" name="isAdmin" id="active" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="newUserButton" onClick={handleUpload}>Create</button>
      </form>
    </div>
  );
}
