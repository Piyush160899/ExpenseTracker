
import React, {useState} from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import HomePage from './components/homepage/index';
import LoginSignup from './components/login/login-signup';

const App = () => {
    const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : undefined)
    return (
        <div>
            <Switch>
                <Route exact path="/"> 
                    {user ? <HomePage user={user} setUser={setUser}/> : <Redirect to="/login"/>}
                </Route>
                <Route exact path="/login" component={()  => <LoginSignup setUser={setUser}/>}/>
            </Switch>
        </div>
    )
}

export default App
