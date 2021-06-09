import React, {useEffect } from 'react';
import './navbar.css'

const NavBar = ({user ,setUser}) =>{
    
    useEffect(() => {}, [user]);
    const handleLogout = (e) => {
        e.preventDefault();
        if(localStorage.user)
            localStorage.removeItem("user");
        setUser(undefined);
    }
    return(
        <div>
            <nav className="Nav">
                <div className="NavMenu">
                    <a className="NavLink" href="/">
                        Expense Tracker
                    </a>
                    {
                        user ? 
                            <span className="NavLink">
                                <i class="fas fa-user-circle fa-2x"></i>
                                {user.body.email}
                            </span>
                        : null
                    }
                    
                </div>
                <nav className="NavBtn">
                    {
                        !user ? <a className="NavBtnLink" href='/login'>Login</a>
                        :<button onClick={handleLogout} className="NavBtnLink">Logout</button>
                    }
                    
                </nav>
            </nav>
        </div>
    )
}

export default NavBar;