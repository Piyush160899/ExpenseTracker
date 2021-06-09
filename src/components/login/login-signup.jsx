import React, {useState} from 'react'
import "./style.css"
import {withRouter} from 'react-router-dom';

const LoginSignUp = ({history, setUser}) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const handleChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setUserDetails({...userDetails, [name]: value})
  }
  const handleSignup = async(e) => {
    e.preventDefault();
    if(userDetails.password === userDetails.confirmPassword){
      const formData = new URLSearchParams();
      formData.append('email', userDetails.email);
      formData.append('password', userDetails.password);
      let user = await fetch("https://expense-trackapi.herokuapp.com/api/v001/user/signup", {
        method: "POST",
        body: formData.toString(),
        headers: {
          // "Content-Type": "application/json; charset=utf-8",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then(res => res.json()).then(jsonRes => {
        console.log(jsonRes)
        return jsonRes
      }).catch(error => console.log(error));
      if(user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      }
      history.push("/");
    }else{
      alert("password doesnt match");
    }
    
  }
  const handleLogin = async(e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append('email', userDetails.email);
    formData.append('password', userDetails.password);
    let user = await fetch("https://expense-trackapi.herokuapp.com/api/v001/user/login", {
      method: "POST",
      body: formData.toString(),
      headers: {
        // "Content-Type": "application/json; charset=utf-8",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then(res => res.json()).then(jsonRes => {
      return jsonRes
    }).catch(error => console.log(error));
    if(user){
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    }
    history.push("/");
    
  }
  return (
    <div class="container">
      <div class="forms-container">
        <div class="signin-signup">
          <form action="#" class="sign-in-form">
            <h2 class="title">Sign in</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" name="email" value={userDetails.email} placeholder="Email" onChange={handleChange}/>
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" name="password" value={userDetails.password} placeholder="Password" onChange={handleChange}/>
            </div>
            <input type="submit" onClick={handleLogin} value="Login" class="btn solid" />
          </form>
          <form action="#" class="sign-up-form">
            <h2 class="title">Sign up</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="email" placeholder="Email" name="email" value={userDetails.email} onChange={handleChange}/>
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Password" name="password" value={userDetails.password} onChange={handleChange}/>
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Confirm Password" name="confirmPassword" value={userDetails.confirmPassword} onChange={handleChange}/>
            </div>
            <input type="submit" class="btn" onClick={handleSignup} value="Sign up" />
          </form>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <p>
            Our expense trackers allow you to build a personal budget 
            & see your cash balance. Getting on top of your finances comes with huge pay offs & peace of mind.
            </p>
            <button class="btn transparent" id="sign-up-btn" onClick={() => {const container = document.querySelector(".container");container.classList.add("sign-up-mode")}}>Sign up</button>
          </div>
          <img src="/public/image/log.svg" class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>One of us ?</h3>
            <p>
             
              Already a user then login/Signup to get back and manage your expenses and income from where you left it.

            </p>
            <button class="btn transparent" id="sign-in-btn" onClick={ () => {const container = document.querySelector(".container"); container.classList.remove("sign-up-mode")}}>Sign in</button>
          </div>
          <img src="/public/image/register.svg" class="image" alt="" />
        </div>
      </div>
    </div>
  )
}
export default withRouter(LoginSignUp);

